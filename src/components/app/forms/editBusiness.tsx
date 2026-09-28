"use client"

import { businessQueryKey, businessesQueryKey, getBusiness, updateBusiness } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { Business, FormObjectTypes, ToastType } from "@/src/types/types"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Spinner from "../../base/ui/composites/spinner"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"
import CountryStateFields from "./countryStateFields"

type EditBusinessFormProps = {
  businessId?: string
}

// The stored industry values are lowercase, so the create and edit forms both send
// lowercase values while showing the readable label.
const industries = [
  { label: "Technology", value: "technology" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Agency", value: "agency" },
  { label: "Freelance", value: "freelance" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Food & Restaurant", value: "food" },
  { label: "Other", value: "other" },
]

export default function EditBusinessForm({ businessId }: EditBusinessFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // The form is opened from a business page, so the business being edited is
  // the one whose page is open unless an id is passed in.
  const currentBusinessId = businessId ?? getBusinessIdFromPathname(pathname)

  // The business page fetches this on the same query key, so the form opens
  // with every field already filled in from the cache.
  const { data: business, isLoading } = useQuery({
    queryKey: businessQueryKey(currentBusinessId ?? ""),
    queryFn: () => getBusiness(currentBusinessId as string),
    enabled: Boolean(currentBusinessId),
  })

  // A saved industry can be missing from the list the create form offers, so it
  // is kept as an option to keep the field prefilled.
  const industryOptions = [...industries]

  if (business?.industry && !industryOptions.some((option) => option.value === business.industry)) {
    industryOptions.unshift({ label: business.industry, value: business.industry })
  }

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const closeEditBusinessForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveBusiness = async (values: FormObjectTypes) => {
    if (!business || !currentBusinessId) return

    setIsSaving(true)

    try {
      const { data: updatedBusiness } = await updateBusiness(currentBusinessId, {
        ...values,
        establishedYear: Number(values.establishedYear) || business.establishedYear,
      })

      // The business page and the dashboard read the same caches, so the saved
      // business is written back before the form closes.
      queryClient.setQueryData<Business>(
        businessQueryKey(currentBusinessId),
        (currentBusiness) => ({ ...currentBusiness, ...updatedBusiness }),
      )
      queryClient.invalidateQueries({ queryKey: businessesQueryKey })

      showToast({
        variant: "success",
        title: "Business updated",
        message: `${updatedBusiness.businessName} was updated successfully.`,
      })

      closeEditBusinessForm()
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "The business could not be updated. Please try again.",
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
          <CloseButton size="sm" func={closeEditBusinessForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Edit Business
        </Heading>
      </Frame>

      {!business ? (
        <Frame className="w-full h-[150px] justify-center items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <Paragraph size="sm">
              Open this form from a business page to edit its details.
            </Paragraph>
          )}
        </Frame>
      ) : (
        <Form onSubmit={saveBusiness}>
          <Frame className="w-full flex-col gap-[var(--space-lg)]">

            {/* Business Name */}
            <Frame className="w-full flex-col">
              <Label required text="Business Name" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="What is your business name?" outline border type="text" name="businessName" variant="default" defaultValue={business.businessName} />
            </Frame>

            {/* Tagline */}
            <Frame className="w-full flex-col">
              <Label text="Tagline" size="xs" />
              <Input size="xs" rounded="sm" placeholder="Business Tagline?" outline border type="text" name="tagLine" variant="default" defaultValue={business.tagLine} />
            </Frame>

            {/* Phone & Email */}
            <Frame className="gap-[var(--space-md)]">
              <Frame className="w-1/2 flex-col">
                <Label text="Phone" size="xs" />
                <Input size="xs" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default" defaultValue={business.phone} />
              </Frame>
              <Frame className="w-1/2 flex-col">
                <Label text="Email" size="xs" />
                <Input size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" defaultValue={business.email} />
              </Frame>
            </Frame>

            {/* Website */}
            <Frame className="w-full flex-col">
              <Label text="Website" size="xs" />
              <Input size="xs" rounded="sm" placeholder="www.example.com" outline border type="text" name="website" variant="default" defaultValue={business.website} />
            </Frame>

            {/* Country & State */}
            <CountryStateFields size="xs" defaultCountry={business.country} defaultState={business.state} />

            {/* Industry & Established in */}
            <Frame className="gap-[var(--space-md)]">
              <Frame className="w-1/2 flex-col">
                <Label text="Industry" size="xs" />
                <Dropdown name="industry" size="xs" width="100%" defaultValue={business.industry} options={industryOptions} />
              </Frame>

              <Frame className="w-1/2 flex-col">
                <Label required text="Established in" size="xs" />
                <Input required size="xs" rounded="sm" placeholder="2026" outline border type="number" name="establishedYear" variant="default" defaultValue={String(business.establishedYear)} />
              </Frame>
            </Frame>

            {/* Address */}
            <Frame className="w-full flex-col">
              <Label text="Address" size="xs" />
              <textarea
                className="w-full placeholder-[var(--color-outline1)] text-[length:var(--bodySize-xs)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
                placeholder="city, street and building number"
                name="address"
                rows={1}
                defaultValue={business.address}
              />
            </Frame>

            {/* Description */}
            <Frame className="w-full flex-col">
              <Label text="Description" size="xs" />
              <textarea
                className="w-full text-[length:var(--bodySize-xs)] placeholder-[var(--color-outline1)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
                placeholder="What does this business do?"
                name="description"
                rows={1}
                defaultValue={business.description}
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
