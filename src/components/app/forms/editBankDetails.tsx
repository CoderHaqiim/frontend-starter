"use client"

import { businessQueryKey, businessesQueryKey, getBusiness, updateBusinessAccount } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { Business, FormObjectTypes } from "@/src/types/types"
import { accountNumberLength, isAccountNumber } from "@/src/utils/bankInformation"
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

type EditBankDetailsProps = {
  businessId: string
}

// The modal the edit button beside the bank information heading opens. The bank
// information is saved as one set through the business route, the way the rest of
// the record is saved.
export default function EditBankDetails({ businessId }: EditBankDetailsProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // The business page fetches this on the same query key, so the form opens with
  // the bank information already filled in from the cache.
  const { data: business, isLoading } = useQuery({
    queryKey: businessQueryKey(businessId),
    queryFn: () => getBusiness(businessId),
    enabled: Boolean(businessId),
  })

  // The form opens with the saved account name, or empty while the business has
  // no bank details yet — nothing is filled in from the business name.
  const accountName = business?.account?.accountName ?? ""

  const closeEditBankDetails = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveBankDetails = async (values: FormObjectTypes) => {
    if (!business) return

    // The account name is typed into the form, so it is read straight from the
    // values. A business with no saved bank details never has one filled in for
    // it, and the three details are only sent together once they are all valid.
    const accountName = String(values.accountName ?? "").trim()

    if (!accountName) {
      showToast({
        variant: "error",
        title: "Account name is required",
        message: "Enter the name on the account.",
      })
      return
    }

    // The account number is stored as ten digits, so anything else that was typed
    // is dropped before the bank information is sent.
    const accountNumber = String(values.accountNumber ?? "").replace(/\D/g, "")
    const bankName = String(values.bankName ?? "").trim()

    if (!isAccountNumber(accountNumber)) {
      showToast({
        variant: "error",
        title: "Invalid account number",
        message: `The account number has to be ${accountNumberLength} digits.`,
      })
      return
    }

    setIsSaving(true)

    try {
      const { data: updatedBusiness } = await updateBusinessAccount(businessId, {
        accountName,
        accountNumber,
        bankName,
      })

      // The business page and the invoice payment details read the same cache, so
      // the saved account is written back before the modal closes.
      queryClient.setQueryData<Business>(
        businessQueryKey(businessId),
        (currentBusiness) => ({ ...currentBusiness, ...updatedBusiness }),
      )
      queryClient.invalidateQueries({ queryKey: businessesQueryKey })

      showToast({
        variant: "success",
        title: "Bank information updated",
        message: `${updatedBusiness.businessName} bank information was updated successfully.`,
      })

      closeEditBankDetails()
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "The bank information could not be updated. Please try again.",
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
          <CloseButton size="sm" func={closeEditBankDetails} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Edit bank information
        </Heading>
      </Frame>

      {!business ? (
        <Frame className="w-full h-[150px] justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Paragraph size="sm">
              Open this form from a business page to edit its bank information.
            </Paragraph>
          )}
        </Frame>
      ) : (
        <Form onSubmit={saveBankDetails}>
          <Frame className="w-full flex-col gap-[var(--space-lg)]">

            {/* Account name */}
            <Frame className="w-full flex-col">
              <Label required text="Account name" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Name on the account" outline border type="text" name="accountName" variant="default" defaultValue={accountName} />
            </Frame>

            {/* Account number */}
            <Frame className="w-full flex-col">
              <Label required text="Account number" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="0123456789" outline border type="text" name="accountNumber" variant="default" defaultValue={business.account?.accountNumber} />
            </Frame>

            {/* Bank name */}
            <Frame className="w-full flex-col">
              <Label required text="Bank name" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="e.g. First Bank" outline border type="text" name="bankName" variant="default" defaultValue={business.account?.bankName} />
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
