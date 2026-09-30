"use client"

import { getProfile, profileQueryKey, updateProfile } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, Profile } from "@/src/types/types"
import { getCurrencyOptions, getCurrencySymbol } from "@/src/utils/currencySymbol"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Spinner from "../../base/ui/composites/spinner"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"

// The modal the currency row on the settings page opens. The account currency is
// saved through the profile route, and the picker lists the codes and symbols the
// currency helper owns, so the money fields read the same set.
export default function ChangeCurrency() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // The settings page fetches this on the same query key, so the form opens with
  // the currency the account holds already selected.
  const { data: profile, isLoading } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveCurrency = async (values: FormObjectTypes) => {
    if (!profile) return

    // The picker submits the code the currency helper owns, so it is only trimmed
    // and upper cased before it travels.
    const currency = String(values.currency ?? "").trim().toUpperCase()

    if (!currency) return

    setIsSaving(true)

    try {
      const { data: updatedProfile } = await updateProfile({ currency })

      // The settings page, the profile button and the profile card read the same
      // cache, so the saved currency is written back before the modal closes.
      queryClient.setQueryData<Profile>(profileQueryKey, updatedProfile)

      // Every figure the app reports is read in the account currency, so the cached
      // reports are refreshed to follow the currency that was saved.
      queryClient.invalidateQueries()

      showToast({
        variant: "success",
        title: "Currency updated",
        message: `Your account currency is now ${getCurrencySymbol(currency)} ${currency}.`,
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "Your account currency could not be updated. Please try again.",
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
          Currency
        </Heading>
      </Frame>

      {!profile ? (
        <Frame className="w-full h-[150px] justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Paragraph size="sm">
              Open this form from the settings page to change your currency.
            </Paragraph>
          )}
        </Frame>
      ) : (
        <Form onSubmit={saveCurrency}>
          <Frame className="w-full flex-col gap-[var(--space-lg)]">

            {/* Currency. The picker opens on the currency the account holds, and the
                one picked is what the form submits: a dropdown that is handed a value
                is held at that value and never moves, so the saved currency is handed
                over as the value it starts on. */}
            <Frame className="w-full flex-col">
              <Label required text="Account currency" size="xs" />
              <Dropdown
                name="currency"
                size="xs"
                width="100%"
                defaultValue={profile.currency}
                options={getCurrencyOptions()}
              />
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
