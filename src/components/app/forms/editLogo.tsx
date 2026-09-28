"use client"

import { updateBusinessLogo } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { Business } from "@/src/types/types"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"

type EditLogoProps = {
  businessId: string
  onSaved: (business: Business) => void
}

export default function EditLogo({ businessId, onSaved }: EditLogoProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [logo, setLogo] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setLogo(typeof reader.result === "string" ? reader.result : null)
    reader.readAsDataURL(file)
  }

  const saveLogo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!logo) return

    setIsSaving(true)
    try {
      const { data: business } = await updateBusinessLogo(businessId, logo)
      onSaved(business)
      closeForm()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card width="400px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">Edit Logo</Heading>
      </Frame>

      <form onSubmit={saveLogo} className="flex w-full flex-col gap-[var(--space-lg)]">
        <Frame className="w-full flex-col gap-[var(--space-xs)]">
          <Label text="Business logo" size="xs" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)] text-[length:var(--bodySize-xs)]"
          />
        </Frame>

        {logo && (
          <img src={logo} alt="Logo preview" className="h-[80px] w-[80px] rounded-[var(--radius-sm)] object-cover" />
        )}

        <Frame className="w-full justify-end">
          <Button variant="fill" role="submit" size="sm" propagate={!isSaving}>
            {isSaving ? "Saving..." : "Save Logo"}
          </Button>
        </Frame>
      </form>
    </Card>
  )
}
