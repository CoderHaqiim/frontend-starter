 "use client"

import { createBusiness } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { FormObjectTypes, ToastType } from "@/src/types/types"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"
import CountryStateFields from "./countryStateFields"

export default function CreateBusinessForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  const closeCreateBusinessForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const saveBusiness = async (values: FormObjectTypes) => {
    setIsSaving(true)

    try {
      const { data: createdBusiness } = await createBusiness({
        ...values,
        establishedYear: Number(values.establishedYear) || new Date().getFullYear(),
      })

      // A new business changes the business list, the dashboard totals and the
      // ranking, so every cached query is refreshed.
      queryClient.invalidateQueries()

      showToast({
        variant: "success",
        title: "Business created",
        message: `${createdBusiness.businessName} was created successfully.`,
      })

      closeCreateBusinessForm()
    } catch {
      showToast({
        variant: "error",
        title: "Create failed",
        message: "The business could not be created. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Create Business
        </Heading>

        <Frame>
          <CloseButton func={closeCreateBusinessForm} />
        </Frame>
      </Frame>

      <Form onSubmit={saveBusiness}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Business Name */}
          <Frame className="w-full flex-col">
            <Label required text="Business Name" size="xs" />
            <Input size="xs" required rounded="sm" placeholder="What is your business name?" outline border type="text" name="businessName" variant="default"/>
          </Frame>

          {/* Business Name */}
          <Frame className="w-full flex-col">
            <Label text="Tagline" size="xs" />
            <Input size="xs" rounded="sm" placeholder="Business Tagline?" outline border type="text" name="tagLine" variant="default"/>
          </Frame>

          {/* Phone & Email */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Phone" size="xs" />
              <Input size="xs" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default"/>
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Email" size="xs" />
              <Input size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default"/>
            </Frame>
          </Frame>

          {/* Country & State */}
          <CountryStateFields size="xs" />

          {/* Industry & Currency */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Industry" size="xs" />
              <Dropdown
                name="industry" size="xs" width="100%"
                options={[
                  { label: "Technology", value: "technology" },
                  { label: "Agriculture", value: "agriculture" },
                  { label: "Agency", value: "agency" },
                  { label: "Freelance", value: "freelance" },
                  { label: "E-commerce", value: "ecommerce" },
                  { label: "Food & Restaurant", value: "food" },
                  { label: "Other", value: "other" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label required text="Established in" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="2026" outline border type="number" name="establishedYear" variant="default"/>
            </Frame>
          </Frame>

          {/* Address*/}
          <Frame className="w-full flex-col">
            <Label text="Address" size="xs" />
            <textarea
              className="w-full placeholder-[var(--color-outline1)] text-[length:var(--bodySize-xs)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="city, street and building number"
              name="address"
              rows={1}
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
            />
          </Frame>

          {/* Submit */}
          <Frame className="w-full justify-end">
            <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
              {isSaving ? "Creating..." : "Create Business"}
            </Button>
          </Frame>

        </Frame>
      </Form>
    </Card>
  )
}
