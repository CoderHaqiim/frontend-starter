"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  createInventoryItem,
  inventoryQueryKey,
  updateInventoryItem,
} from "@/src/services/inventoryService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, ObjectRecordType } from "@/src/types/types"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
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

type CreateInventoryItemFormProps = {
  // The item being changed. The form opens blank when it is not given, and the
  // values it holds are saved back through the inventory route when it is.
  itemToEdit?: ObjectRecordType
}

export default function CreateInventoryItemForm({ itemToEdit }: CreateInventoryItemFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)
  // A form opened from a business page always targets that business and the
  // business field is read only there. On the home dashboard there is no
  // business context, so the field stays changeable.
  const contextBusinessId = getBusinessIdFromPathname(pathname)
  const isBusinessContext = Boolean(contextBusinessId)
  const isEditing = Boolean(itemToEdit)

  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

  const saveInventoryItem = async (values: FormObjectTypes) => {
    const targetBusinessId = String(values.businessId ?? "") || contextBusinessId || ""

    setIsSaving(true)

    try {
      if (itemToEdit) {
        // An edit travels through the same route as the create, keyed by the SKU the
        // item was listed under, and the saved item replaces the row it came from.
        const { data: savedItem } = await updateInventoryItem(
          targetBusinessId,
          String(itemToEdit.SKU),
          values,
        )

        queryClient.setQueryData<ObjectRecordType[]>(
          inventoryQueryKey(targetBusinessId),
          (currentItems = []) =>
            currentItems.map((item) => item.SKU === itemToEdit.SKU ? savedItem : item)
        )
        queryClient.invalidateQueries({ queryKey: inventoryQueryKey(targetBusinessId) })

        showToast({
          variant: "success",
          title: "Item updated",
          message: `${savedItem.Item} was updated successfully.`,
        })

        closeCreateInventoryItemForm()
        return
      }

      const { data: createdItem } = await createInventoryItem(targetBusinessId, values)

      // The new item is put straight into the table, and the table and the KPI
      // cards refetch.
      queryClient.setQueryData<ObjectRecordType[]>(
        inventoryQueryKey(targetBusinessId),
        (currentItems = []) => [
          ...currentItems.filter((item) => item.SKU !== createdItem.SKU),
          createdItem,
        ]
      )
      queryClient.invalidateQueries({ queryKey: inventoryQueryKey(targetBusinessId) })

      showToast({
        variant: "success",
        title: "Item added",
        message: `${createdItem.Item} was added to inventory successfully.`,
      })

      closeCreateInventoryItemForm()
    } catch {
      showToast({
        variant: "error",
        title: isEditing ? "Update failed" : "Create failed",
        message: isEditing
          ? "The item could not be updated. Please try again."
          : "The item could not be added. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const closeCreateInventoryItemForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeCreateInventoryItemForm} />
      </Frame>
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          {isEditing ? "Edit Inventory Item" : "Add Inventory Item"}
        </Heading>
      </Frame>

      <Form onSubmit={saveInventoryItem}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Item Name" size="xs" />
            <Input required size="sm" rounded="sm" placeholder="Item name" outline border type="text" name="itemName" variant="default" defaultValue={itemToEdit?.Item} />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="SKU" size="xs" />
              <Input required size="sm" rounded="sm" placeholder="SKU" outline border type="text" name="sku" variant="default" defaultValue={itemToEdit?.SKU} />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Category" size="xs" />
              <Dropdown
                name="category"
                size="sm"
                width="100%"
                defaultValue={itemToEdit?.Category}
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
              <Input required size="sm" rounded="sm" outline border type="number" name="stock" variant="default" defaultValue={itemToEdit?.Stock} />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown
                name="businessId"
                size="sm"
                width="100%"
                value={
                  isBusinessContext
                    ? contextBusinessId
                    : undefined
                }
                disabled={isBusinessContext}
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Item"}
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}
