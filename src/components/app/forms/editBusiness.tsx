"use client"

import Form from "../../ui/composites/form"
import Label from "../../ui/primitives/label"
import Card from "../../ui/composites/card"
import Input from "../../ui/primitives/input"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import Dropdown from "../../ui/composites/dropdown"
import { useBackdropState } from "@/src/store/backdropState"

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
          <Button size="sm" variant="outline" func={closeEditBusinessForm} isIcon iconName="icon-x"/>
        </Frame>
      </Frame>

      <Form url="/edit-business">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Business Name" size="sm" />
            <Input rounded="sm" placeholder="What is your business name?" outline border type="text" name="businessName" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Country" size="sm" />
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
              <Label text="State / Province" size="sm" />
              <Input rounded="sm" placeholder="State / Province" outline border type="text" name="state" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Industry" size="sm" />
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
              <Label text="Currency" size="sm" />
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
            <Label text="Description" size="sm" />
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
