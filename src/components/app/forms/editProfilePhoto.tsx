"use client"

import { getProfile, profileQueryKey, updateProfile } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { Profile } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Avatar from "../../base/ui/composites/avatar"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"

// The modal the profile photo row on the settings page opens. The picked file is
// read as a data url and saved through the profile route, the way the edit logo
// form saves the business logo.
export default function EditProfilePhoto() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const [photo, setPhoto] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // The settings page fetches this on the same query key, so the photo that is
  // saved shows until a new one is picked.
  const { data: profile } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : null)
    reader.readAsDataURL(file)
  }

  const savePhoto = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!photo) return

    setIsSaving(true)

    try {
      const { data: updatedProfile } = await updateProfile({ profilePicture: photo })

      // The profile button, the profile card and the settings page read the same
      // cache, so the saved photo is written back before the modal closes.
      queryClient.setQueryData<Profile>(profileQueryKey, updatedProfile)

      showToast({
        variant: "success",
        title: "Profile photo updated",
        message: "Your profile photo was updated successfully.",
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "Your profile photo could not be updated. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card width="400px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Profile photo
        </Heading>
      </Frame>

      <form onSubmit={savePhoto} className="flex w-full flex-col gap-[var(--space-lg)]">
        <Frame className="w-full flex-col">
          <Label text="Profile photo" size="xs" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)] text-[length:var(--bodySize-xs)]"
          />
        </Frame>

        {/* The saved photo shows until a new one is picked. */}
        <Frame className="w-full items-center">
          <Avatar size="xxl" src={photo ?? profile?.profilePicture} />
        </Frame>

        <Frame className="w-full justify-end">
          <Button variant="fill" role="submit" size="sm" propagate={!isSaving} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save photo"}
          </Button>
        </Frame>
      </form>
    </Card>
  )
}
