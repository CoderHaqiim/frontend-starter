"use client"

import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Invoice1 from "./templates/invoice/invoice1"
import Invoice2 from "./templates/invoice/invoice2"

const templates = [
  { id: "invoice-1", label: "Template 1", component: Invoice1 },
  { id: "invoice-2", label: "Template 2", component: Invoice2 },
] as const

type SmallBusinessCardListProps = {
  selectedTemplate: (typeof templates)[number]["id"]
  onSelectTemplate: (id: (typeof templates)[number]["id"]) => void
}

export default function SmallBusinessCardList({ selectedTemplate, onSelectTemplate }: SmallBusinessCardListProps) {

  return (
    <Frame scroll="hidden" className="relative gap-[var(--space-md)] w-[180px] h-full flex-col">
      <Frame className="w-full z-[100] sticky top-0 pb-[var(--space-md)]">
        <Heading type="h3" size="xxs">Templates</Heading>
      </Frame>

      <Frame className="w-max px-[var(--space-sm)] flex-col gap-[var(--space-sm)]">
        {templates.map((template) => {
          const isSelected = template.id === selectedTemplate
          const Preview = template.component

          return (
            <button key={template.id} type="button"
              onClick={() => onSelectTemplate(template.id)}
              className={`relative p-[2px] h-[200px] w-[141.44px] overflow-hidden rounded-[var(--radius-sm)] border bg-[var(--color-white)] text-left transition-all duration-150 ${
                isSelected
                  ? "border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]"
                  : "border-[var(--color-outline1)] hover:border-[var(--color-accent)]"
              }`}
            >
              <div className="pointer-events-none origin-top-left scale-[0.17]">
                <Preview />
              </div>
            </button>
          )
        })}
      </Frame>
    </Frame>
  )
}
