"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

export default function CreateInventoryItemForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

  const closeCreateInventoryItemForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          Add Inventory Item
        </Heading>
        <Frame>
          <CloseButton func={closeCreateInventoryItemForm} />
        </Frame>
      </Frame>

      <Form url="/api/post">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Item Name" size="xs" />
            <Input required size="sm" rounded="sm" placeholder="Item name" outline border type="text" name="itemName" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="SKU" size="xs" />
              <Input required size="sm" rounded="sm" placeholder="SKU" outline border type="text" name="sku" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Category" size="xs" />
              <Dropdown
                name="category"
                size="sm"
                width="100%"
                options={[
                  { label: "Beverages", value: "beverages" },
                  { label: "Accessories", value: "accessories" },
                  { label: "Packaging", value: "packaging" },
                  { label: "Ingredients", value: "ingredients" },
                  { label: "Other", value: "other" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Stock" size="xs" />
              <Input required size="sm" rounded="sm" outline border type="number" name="stock" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown
                name="businessId"
                size="sm"
                width="100%"
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate>
              Add Item
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
