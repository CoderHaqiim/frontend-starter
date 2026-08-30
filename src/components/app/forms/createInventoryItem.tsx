"use client"

import Form from "../../ui/composites/form"
import Label from "../../ui/primitives/label"
import Card from "../../ui/composites/card"
import Input from "../../ui/primitives/input"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Dropdown from "../../ui/composites/dropdown"
import CloseButton from "../../ui/primitives/closeButton"
import { useBackdropState } from "@/src/store/backdropState"

export default function CreateInventoryItemForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

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

      <Form url="/add-inventory-item">
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label text="Item Name" size="xs" />
            <Input size="sm" rounded="sm" placeholder="Item name" outline border type="text" name="itemName" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="SKU" size="xs" />
              <Input size="sm" rounded="sm" placeholder="SKU" outline border type="text" name="sku" variant="default" />
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
              <Label text="Stock" size="xs" />
              <Input size="sm" rounded="sm" outline border type="number" name="stock" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Reorder Level" size="xs" />
              <Input size="sm" rounded="sm" outline border type="number" name="reorderLevel" variant="default" />
            </Frame>
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="sm" propagate>
              Add Item
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
