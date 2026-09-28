"use client"

import { InvoiceItem, useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

type ItemForm = {
  title: string
  description: string
  quantity: string
  unitPrice: string
}

const initialForm: ItemForm = {
  title: "",
  description: "",
  quantity: "1",
  unitPrice: "",
}

type CreateInvoiceItemFormProps = {
  onClose: () => void
  itemToEdit?: InvoiceItem
}

export default function CreateInvoiceItemForm({ onClose, itemToEdit }: CreateInvoiceItemFormProps) {
  const addItem = useInvoiceDraft((state) => state.addItem)
  const updateItem = useInvoiceDraft((state) => state.updateItem)
  const [form, setForm] = useState<ItemForm>(() => itemToEdit ? {
    title: itemToEdit.name,
    description: itemToEdit.description,
    quantity: String(itemToEdit.quantity),
    unitPrice: String(itemToEdit.price),
  } : initialForm)

  const closeForm = () => {
    onClose()
  }

  const cardRef = useRef<HTMLDivElement>(null)

  // The form stays open while the pointer moves over the page. It closes when a
  // click lands outside the card, the way the dropdowns close, or through the
  // close button.
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node) || cardRef.current?.contains(target)) return

      onClose()
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [onClose])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setForm((previousForm) => ({ ...previousForm, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = form.title.trim()
    const quantity = Number(form.quantity) || 0
    const unitPrice = Number(form.unitPrice) || 0

    if (!title || quantity <= 0 || unitPrice <= 0) {
      return
    }

    const itemPayload = {
      name: title,
      description: form.description.trim(),
      quantity,
      price: unitPrice,
    }

    if (itemToEdit) {
      updateItem(itemToEdit.id, itemPayload)
      onClose()
    } else {
      addItem(itemPayload)
      setForm(initialForm)
      return
    }

    setForm(initialForm)
  }

  return (
    <Frame ref={cardRef} className="w-max h-max">
      <Card width="550px" padding="xl" height="max-content">
        <Frame specificStyles={{
            position: "absolute",
            top:"15px",
            right:"15px"
          }}>
            <CloseButton size="sm" func={closeForm} />
        </Frame>
        <Frame className="mb-[var(--space-xl)] items-center justify-between">
          <Heading size="md" type="h2">{itemToEdit ? "Edit Invoice Item" : "Add Invoice Item"}</Heading>
        </Frame>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[var(--space-xl)]">
          <Frame className="w-full flex-col">
            <Label required text="Title" size="xs" />
            <Input required size="xs" rounded="sm" placeholder="Item title" outline border type="text" name="title" variant="default" value={form.title} formFunc={handleChange} />
          </Frame>

          <Frame className="w-full flex-col">
            <Label  text="Description" size="xs" />
            <Input  size="xs" rounded="sm" placeholder="Item description" outline border type="text" name="description" variant="default" value={form.description} formFunc={handleChange} />
          </Frame>

          <Frame className="w-full gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Quantity" size="xs" />
              <Input required size="xs" rounded="sm" outline border type="number" name="quantity" variant="default" value={form.quantity} formFunc={handleChange} />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label required text="Unit Price" size="xs" />
              <Input required size="xs" rounded="sm" outline border type="number" name="unitPrice" variant="default" value={form.unitPrice} formFunc={handleChange} />
            </Frame>
          </Frame>

          <Frame className="w-full justify-end pt-[var(--space-md)]">
            <Button
              variant="fill"
              role="submit"
              size="md"
              propagate
              className="text-sm px-[var(--space-lg)]"
              specificStyles={{ paddingInline: "var(--space-lg)" }}
            >
              {itemToEdit ? "Save Changes" : "Add Item"}
            </Button>
          </Frame>
        </form>
      </Card>
    </Frame>
  )
}