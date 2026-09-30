"use client"

import { getProfile, profileQueryKey, updateProfile } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, Profile } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Form from "../../base/ui/composites/form"
import Spinner from "../../base/ui/composites/spinner"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"

// The modal the personal information rows on the settings page open. The details
// it owns are saved through the profile route in one request, the way the edit
// business form saves its fields.
export default function EditProfile() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // The settings page fetches this on the same query key, so the form opens with
  // every detail already filled in from the cache.
  const { data: profile, isLoading } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveProfile = async (values: FormObjectTypes) => {
    if (!profile) return

    setIsSaving(true)

    try {
      const { data: updatedProfile } = await updateProfile({
        userName: String(values.userName ?? "").trim(),
        firstName: String(values.firstName ?? "").trim(),
        lastName: String(values.lastName ?? "").trim(),
        email: String(values.email ?? "").trim(),
        phone: String(values.phone ?? "").trim(),
      })

      // The profile button, the profile card and the settings page read the same
      // cache, so the saved profile is written back before the modal closes.
      queryClient.setQueryData<Profile>(profileQueryKey, updatedProfile)

      showToast({
        variant: "success",
        title: "Profile updated",
        message: "Your personal information was updated successfully.",
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "Your personal information could not be updated. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Personal information
        </Heading>
      </Frame>

      {!profile ? (
        <Frame className="w-full h-[150px] justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Paragraph size="sm">
              Open this form from the settings page to edit your details.
            </Paragraph>
          )}
        </Frame>
      ) : (
        <Form onSubmit={saveProfile}>
          <Frame className="w-full flex-col gap-[var(--space-lg)]">

            {/* Username */}
            <Frame className="w-full flex-col">
              <Label required text="Username" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Username" outline border type="text" name="userName" variant="default" defaultValue={profile.userName} />
            </Frame>

            {/* First & last name */}
            <Frame className="gap-[var(--space-md)]">
              <Frame className="w-1/2 flex-col">
                <Label required text="First name" size="xs" />
                <Input required size="xs" rounded="sm" placeholder="First name" outline border type="text" name="firstName" variant="default" defaultValue={profile.firstName} />
              </Frame>
              <Frame className="w-1/2 flex-col">
                <Label required text="Last name" size="xs" />
                <Input required size="xs" rounded="sm" placeholder="Last name" outline border type="text" name="lastName" variant="default" defaultValue={profile.lastName} />
              </Frame>
            </Frame>

            {/* Email & phone */}
            <Frame className="gap-[var(--space-md)]">
              <Frame className="w-1/2 flex-col">
                <Label required text="Email address" size="xs" />
                <Input required size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" defaultValue={profile.email} />
              </Frame>
              <Frame className="w-1/2 flex-col">
                <Label required text="Phone number" size="xs" />
                <Input required size="xs" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default" defaultValue={profile.phone} />
              </Frame>
            </Frame>

            {/* Submit */}
            <Frame className="w-full justify-end">
              <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Frame>

          </Frame>
        </Form>
      )}
    </Card>
  )
}
