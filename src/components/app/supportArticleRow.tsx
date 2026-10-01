"use client"

import Frame from "../base/ui/primitives/frame"
import Icon from "../base/ui/primitives/icon"
import Paragraph from "../base/ui/primitives/paragraph"

type SupportArticleRowProps = {
  // The row carries its own id so the page can bring it into view when it is chosen from
  // somewhere else on the page, like the popular articles list.
  id?: string
  title: string
  isSelected?: boolean
  onSelect: () => void
}

/*
 * One help article. It is a real button, so it is reachable and answerable by keyboard, and
 * the row it draws is the same one wherever an article is listed: the popular articles list
 * uses it.
 */
export default function SupportArticleRow({
  id,
  title,
  isSelected = false,
  onSelect,
}: SupportArticleRowProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={onSelect}
      aria-current={isSelected ? "true" : undefined}
      className={`
        flex w-full cursor-pointer items-center gap-[var(--space-sm)]
        border px-[var(--space-md)] py-[var(--space-sm)] text-left
        transition-colors duration-150 ease-out
        ${
          isSelected
            ? "border-[var(--color-accent)] bg-[var(--color-accent2)]"
            : "border-transparent hover:border-[var(--color-outline1)] hover:bg-[var(--color-background2)]"
        }
      `}
    >
      <Icon
        name="icon-file-text"
        size="sm"
        stroke="1.5"
        color={isSelected ? "accent" : "textColor2"}
      />

      <Frame className="w-full flex-col">
        <Paragraph size="xs" color="textColor1" weight={isSelected ? "medium" : "normal"}>
          {title}
        </Paragraph>
      </Frame>

      <Icon name="icon-right" size="sm" color={isSelected ? "accent" : "muted"} />
    </button>
  )
}
