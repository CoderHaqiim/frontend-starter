"use client"

import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Receipt1 from "@/src/components/app/templates/receipt/receipt1"
import Receipt2 from "@/src/components/app/templates/receipt/receipt2"

/*
 * The receipt templates are A5 (148mm x 210mm), while the selector below was
 * built around A4. A4 is 1.4143:1 and A5 is 1.4189:1, so the box shape carries
 * over, but the A4 scale (0.17) only filled 69% of it with a smaller page.
 *
 * The scale is therefore derived from the A5 page instead: the receipt is scaled
 * by exactly the amount that makes its 148mm width fill the thumbnail, so the
 * selector shows the template at its true size and proportions.
 */
const A5_WIDTH_MM = 148
const MM_TO_PX = 96 / 25.4
const THUMBNAIL_WIDTH_PX = 141.44
const THUMBNAIL_PADDING_PX = 2
const THUMBNAIL_CONTENT_WIDTH_PX = THUMBNAIL_WIDTH_PX - THUMBNAIL_PADDING_PX * 2
const A5_THUMBNAIL_SCALE = THUMBNAIL_CONTENT_WIDTH_PX / (A5_WIDTH_MM * MM_TO_PX)


export const receiptTemplates = [
  { id: "receipt-1", label: "template-1", component: Receipt1 },
  { id: "receipt-2", label: "template-2", component: Receipt2 },
] as const

export type ReceiptTemplateId = (typeof receiptTemplates)[number]["id"]

export type ReceiptTemplateComponent = (typeof receiptTemplates)[number]["component"]

// Lets consumers render the template that was picked, by its id.
export const receiptTemplateComponents = Object.fromEntries(
  receiptTemplates.map(({ id, component }) => [id, component]),
) as Record<ReceiptTemplateId, ReceiptTemplateComponent>

type ReceiptTemplateListProps = {
  selectedTemplate: ReceiptTemplateId
  onSelectTemplate: (id: ReceiptTemplateId) => void
}

export default function ReceiptTemplateList({
  selectedTemplate,
  onSelectTemplate,
}: ReceiptTemplateListProps) {
  return (
    <Frame
      scroll="hidden"
      className="relative gap-[var(--space-md)] w-[180px] h-full flex-col"
    >
      <Frame className="w-full bg-[var(--color-white)] z-[100] sticky top-0 pb-[var(--space-md)]">
        <Heading type="h3" size="xxs">
          Templates
        </Heading>
      </Frame>

      <Frame className="w-max px-[var(--space-sm)] flex-col gap-[var(--space-sm)]">
        {receiptTemplates.map((template) => {
          const isSelected = template.id === selectedTemplate
          const Preview = template.component

          return (
            <div
              key={template.id}
              className="flex w-[141.44px] flex-col items-center gap-[var(--space-xs)]"
            >
              <button
                type="button"
                onClick={() => onSelectTemplate(template.id)}
                className={`relative p-[2px] h-[200px] w-full overflow-hidden rounded-[var(--radius-sm)] border bg-[var(--color-white)] text-left transition-all duration-150 ${
                  isSelected
                    ? "border-[var(--color-accent)] shadow-[0_0_0_1px_var(--color-accent)]"
                    : "border-[var(--color-outline1)] hover:border-[var(--color-accent)]"
                }`}
              >
                <div
                  className="pointer-events-none origin-top-left"
                  style={{ transform: `scale(${A5_THUMBNAIL_SCALE})` }}
                >
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
