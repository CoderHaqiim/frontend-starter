"use client"

import { businessQueryKey, businessesQueryKey, deleteBusiness } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"

type DeleteBusinessModalProps = {
  businessId: string
  businessName: string
}

// The confirmation the delete business button opens. It follows the other modals:
// a card in the backdrop, a close button beside the title and a toast on the way
// out, but the confirming button carries the destructive colours.
export default function DeleteBusinessModal({ businessId, businessName }: DeleteBusinessModalProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const closeDeleteBusinessModal = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const confirmDeleteBusiness = async () => {
    setIsDeleting(true)

    try {
      await deleteBusiness(businessId)

      // The record of the deleted business is dropped and the rest of the cache is
      // invalidated, so the dashboard totals and the business switcher stop
      // counting it. The page it was shown on no longer exists, so the dashboard
      // takes over.
      queryClient.removeQueries({ queryKey: businessQueryKey(businessId) })
      queryClient.invalidateQueries({ queryKey: businessesQueryKey })
      queryClient.invalidateQueries()

      showToast({
        variant: "success",
        title: "Business deleted",
        message: `${businessName} was deleted successfully.`,
      })

      closeDeleteBusinessModal()
      router.push("/dashboard")
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The business could not be deleted. Please try again.",
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
          <CloseButton size="sm" func={closeDeleteBusinessModal} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Delete business
        </Heading>
      </Frame>

      <Frame className="w-full flex-col gap-[var(--space-lg)]">
        <Paragraph size="sm" specificStyle={{
          display: "inline"
        }}>
          <span className=" font-[var(--fontWeight-semiBold)] text-[var(--color-textColor1)]">Are you sure you want to delete {businessName}? </span>
          The business and everything
          recorded against it will be removed for good, and this cannot be undone.
        </Paragraph>

        <Frame className="w-full justify-end gap-[var(--space-sm)]">
          <Button variant="ghost" size="md" disabled={isDeleting} func={confirmDeleteBusiness}
            specificStyles={{
              backgroundColor: "var(--color-error2)",
              color: "var(--color-error)",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete business"}
          </Button>
        </Frame>
      </Frame>
    </Card>
  )
}
