"use client"

import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Invoice1 from "./templates/invoice/invoice1"
import Invoice2 from "./templates/invoice/invoice2"

export const invoiceTemplates = [
  { id: "invoice-1", label: "template-1", component: Invoice1 },
  { id: "invoice-2", label: "template-2", component: Invoice2 },
] as const

export type InvoiceTemplateId = (typeof invoiceTemplates)[number]["id"]

export type InvoiceTemplateComponent = (typeof invoiceTemplates)[number]["component"]

// Lets consumers render the template that was picked, by its id.
export const invoiceTemplateComponents = Object.fromEntries(
  invoiceTemplates.map(({ id, component }) => [id, component]),
) as Record<InvoiceTemplateId, InvoiceTemplateComponent>

type SmallBusinessCardListProps = {
  selectedTemplate: InvoiceTemplateId
  onSelectTemplate: (id: InvoiceTemplateId) => void
}

export default function TemplateList({ selectedTemplate, onSelectTemplate }: SmallBusinessCardListProps) {
  return (
    <Frame scroll="hidden" className="relative gap-[var(--space-md)] w-[180px] h-full flex-col">
      <Frame className="w-full bg-[var(--color-white)]  z-[100] sticky top-0 pb-[var(--space-md)]">
        <Heading type="h3" size="xxs">Templates</Heading>
      </Frame>

      <Frame className="w-max px-[var(--space-sm)] flex-col gap-[var(--space-sm)]">
        {invoiceTemplates.map((template) => {
          const isSelected = template.id === selectedTemplate
          const Preview = template.component

          return (
            <div key={template.id} className="flex w-[141.44px] flex-col items-center gap-[var(--space-xs)]">
              <button
                type="button"
                onClick={() => onSelectTemplate(template.id)}
                className={`relative p-[2px] h-[200px] w-full overflow-hidden rounded-[var(--radius-sm)] border bg-[var(--color-white)] text-left transition-all duration-150 ${
                  isSelected
                    ? "border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]"
                    : "border-[var(--color-outline1)] hover:border-[var(--color-accent)]"
                }`}
              >
                <div className="pointer-events-none origin-top-left scale-[0.17]">
                  <Preview />
                </div>
              </button>
              <span className="text-[length:var(--bodySize-xs)] font-[500] text-[var(--color-textColor2)]">
                {template.label}
              </span>
            </div>
          )
        })}
      </Frame>
    </Frame>
  )
}
