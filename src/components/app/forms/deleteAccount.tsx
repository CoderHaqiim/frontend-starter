"use client"

import { deleteProfile, profileQueryKey } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { ToastType } from "@/src/types/types"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"

type DeleteAccountModalProps = {
  accountName: string
}

// The confirmation the delete account row on the settings page opens. It follows
// the delete business modal: a card in the backdrop, a close button beside the
// title and a toast on the way out, but the confirming button carries the
// destructive colours.
export default function DeleteAccountModal({ accountName }: DeleteAccountModalProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const closeDeleteAccountModal = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const confirmDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      await deleteProfile()

      // The profile the settings page, the profile button and the profile card read
      // is dropped, the way the record of a deleted business is. The page it was
      // shown on no longer belongs to anybody, so the login page takes over.
      queryClient.removeQueries({ queryKey: profileQueryKey })

      showToast({
        variant: "success",
        title: "Account deleted",
        message: `${accountName} was deleted successfully.`,
      })

      closeDeleteAccountModal()
      router.push("/login")
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The account could not be deleted. Please try again.",
      })

      setIsDeleting(false)
    }
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeDeleteAccountModal} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Delete account
        </Heading>
      </Frame>

      <Frame className="w-full flex-col gap-[var(--space-lg)]">
        <Paragraph size="sm" specificStyle={{
          display: "inline"
        }}>
          <span className=" font-[var(--fontWeight-semiBold)] text-[var(--color-textColor1)]">Are you sure you want to delete {accountName}? </span>
          Your account and everything
          recorded against it will be removed for good, and this cannot be undone.
        </Paragraph>

        <Frame className="w-full justify-end gap-[var(--space-sm)]">
          <Button variant="ghost" size="md" disabled={isDeleting} func={confirmDeleteAccount}
            specificStyles={{
              backgroundColor: "var(--color-error2)",
              color: "var(--color-error)",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete account"}
          </Button>
        </Frame>
      </Frame>
    </Card>
  )
}
