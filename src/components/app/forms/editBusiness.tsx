"use client"

import { useBackdropState } from "@/src/store/backdropState"
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

export default function EditBusinessForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const closeEditBusinessForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Edit Business
        </Heading>
        <Frame>
          <CloseButton func={closeEditBusinessForm} />
        </Frame>
      </Frame>

      <Form url="/edit-business">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Business Name" size="xs" />
            <Input size="sm" rounded="sm" placeholder="What is your business name?" outline border type="text" name="businessName" variant="default" />
          </Frame>

          <CountryStateFields size="sm" />

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
                  { label: "Nigerian Naira", value: "NGN" },
                  { label: "US Dollar", value: "USD" },
                  { label: "British Pound", value: "GBP" },
                  { label: "Euro", value: "EUR" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="w-full flex-col">
            <Label text="Description" size="xs" />
            <textarea
              className="w-full placeholder-[var(--color-outline1)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="What does this business do?"
              name="description"
              rows={4}
            />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Save Changes
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
