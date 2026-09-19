"use client"

import { useInvoiceDraft } from "@/src/store/invoiceDraftState"
import { ChangeEvent, useState } from "react"
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
}

export default function CreateInvoiceItemForm({ onClose }: CreateInvoiceItemFormProps) {
  const addItem = useInvoiceDraft((state) => state.addItem)
  const [form, setForm] = useState<ItemForm>(initialForm)

  const closeForm = () => {
    onClose()
  }

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

    addItem({
      name: title,
      description: form.description.trim(),
      quantity,
      price: unitPrice,
    })

    setForm(initialForm)
  }

  return (
    <Card width="550px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-lg)] items-center justify-between">
        <Heading size="md" type="h2">Add Invoice Item</Heading>
        <CloseButton func={closeForm} />
      </Frame>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[var(--space-lg)]">
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

        <Frame className="w-full justify-end">
          <Button variant="fill" role="submit" size="md" propagate>Add Item</Button>
        </Frame>
      </form>
    </Card>
  )
}