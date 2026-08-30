"use client"

import Form from "../../ui/composites/form"
import Label from "../../ui/primitives/label"
import Card from "../../ui/composites/card"
import Input from "../../ui/primitives/input"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import CloseButton from "../../ui/primitives/closeButton"
import Dropdown from "../../ui/composites/dropdown"
import { useBackdropState } from "@/src/store/backdropState"

export default function CreateBusinessForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeCreateBusinessForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Create Business
        </Heading>

        <Frame>
          <CloseButton func={closeCreateBusinessForm} />
        </Frame>
      </Frame>

      <Form url="/api/post">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Business Name */}
          <Frame className="w-full flex-col">
            <Label text="Business Name" size="xs" />

            <Input
              size="sm"
              rounded="sm"
              placeholder="What is your business name?"
              outline
              border
              type="text"
              name="businessName"
              variant="default"
            />
          </Frame>

          {/* Country & State */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Country" size="xs" />

              <Dropdown
                name="country"
                size="sm"
                width="100%"
                options={[
                  { label: "Nigeria", value: "Nigeria" },
                  { label: "Ghana", value: "Ghana" },
                  { label: "Togo", value: "Togo" },
                  { label: "France", value: "France" },
                  { label: "United Kingdom", value: "United Kingdom" },
                  { label: "United States", value: "United States" },
                  { label: "Other", value: "other" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="State / Province" size="xs" />

              <Dropdown
                name="state"
                size="sm"
                width="100%"
                options={[
                  { label: "Lagos", value: "Lagos" },
                  { label: "Abuja", value: "Abuja" },
                  { label: "Oyo", value: "Oyo" },
                  { label: "Rivers", value: "Rivers" },
                  { label: "Kano", value: "Kano" },
                  { label: "Other", value: "other" },
                ]}
              />
            </Frame>
          </Frame>

          {/* Industry & Currency */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Industry" size="xs" />

              <Dropdown
                name="industry"
                size="sm"
                width="100%"
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
              <Label text="Currency" size="xs" />

              <Dropdown
                name="currency"
                size="sm"
                width="100%"
                options={[
                  { label: "Nigerian Naira (₦)", value: "NGN" },
                  { label: "US Dollar ($)", value: "USD" },
                  { label: "British Pound (£)", value: "GBP" },
                  { label: "Euro (€)", value: "EUR" },
                ]}
              />
            </Frame>
          </Frame>

          {/* Description */}
          <Frame className="w-full flex-col">
            <Label text="Description" size="xs" />

            <textarea
              className="w-full placeholder-[var(--color-outline1)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="What does this business do?"
              name="description"
              rows={4}
            />
          </Frame>

          {/* Submit */}
          <Frame className="w-full justify-end">
            <Button variant="fill" role="submit" size="sm" propagate>
              Create Business
            </Button>
          </Frame>

        </Frame>
      </Form>
    </Card>
  )
}
