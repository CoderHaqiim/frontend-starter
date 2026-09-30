"use client"

import { getProfile, profileQueryKey, resetPassword } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes } from "@/src/types/types"
import { useQuery } from "@tanstack/react-query"
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

// The modal the password row on the settings page opens. It asks for the account
// email next to the password the account is signed in with, and the pair travels to
// the reset password route, which answers with the message it sent to the address.
export default function ResetPassword() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const [isSending, setIsSending] = useState(false)

  // The settings page fetches this on the same query key, so the form opens with
  // the account email already filled in.
  const { data: profile, isLoading } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const requestPasswordReset = async (values: FormObjectTypes) => {
    const email = String(values.email ?? "").trim()
    const currentPassword = String(values.currentPassword ?? "")

    if (!email || !currentPassword) return

    setIsSending(true)

    try {
      // The route words the confirmation, so the toast carries the message it
      // answered with rather than one built here.
      const { message } = await resetPassword({ email, currentPassword })

      showToast({
        variant: "success",
        title: "Password reset requested",
        message,
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Reset failed",
        message: "Your password reset could not be requested. Please try again.",
      })
    } finally {
      setIsSending(false)
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
          Reset password
        </Heading>
      </Frame>

      {!profile ? (
        <Frame className="w-full h-[150px] justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Paragraph size="sm">
              Open this form from the settings page to reset your password.
            </Paragraph>
          )}
        </Frame>
      ) : (
        <Form onSubmit={requestPasswordReset}>
          <Frame className="w-full flex-col gap-[var(--space-lg)]">

            {/* Email address */}
            <Frame className="w-full flex-col">
              <Label required text="Email address" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" defaultValue={profile.email} />
            </Frame>

            {/* The password the account is signed in with. It travels next to the
                address, so the reset can be tied to the account it belongs to. */}
            <Frame className="w-full flex-col">
              <Label required text="Current password" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Current password" outline border type="text" name="currentPassword" variant="password" />
            </Frame>

            {/* Submit */}
            <Frame className="w-full justify-end">
              <Button variant="fill" role="submit" size="md" propagate disabled={isSending}>
                {isSending ? "Requesting..." : "Reset password"}
              </Button>
            </Frame>

          </Frame>
        </Form>
      )}
    </Card>
  )
}
