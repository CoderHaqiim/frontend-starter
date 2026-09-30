"use client"

import { IntegrationProblem } from "@/src/types/integrations"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Icon from "../../base/ui/primitives/icon"
import Paragraph from "../../base/ui/primitives/paragraph"

/*
 * A failure, where it happened: what it is, what it means, and what to do about it. Every
 * failure travels with that copy, so a notice is never a dead end and never invents its own
 * wording.
 *
 * The notice is announced politely, so a state that arrives after a click is read out loud
 * rather than happening silently.
 */
type IntegrationProblemNoticeProps = {
  problem: IntegrationProblem
  onAction?: () => void
  isBusy?: boolean
  // Set when the notice's button says something more exact than "Try again".
  actionLabel?: string
  className?: string
}

export default function IntegrationProblemNotice({
  problem,
  onAction,
  isBusy = false,
  actionLabel,
  className,
}: IntegrationProblemNoticeProps) {
  return (
    <div role="status" aria-live="polite" className={`w-full ${className ?? ""}`}>
      <Frame
        className="w-full flex-col gap-[var(--space-xs)] border rounded-[var(--radius-sm)] p-[var(--space-md)]"
        specificStyles={{
          borderColor: "var(--color-error)",
          backgroundColor: "var(--color-error2)",
        }}
      >
        <Frame className="w-full items-center gap-[var(--space-xs)]">
          <Icon name="icon-badge-x" size="md" color="error" stroke="1.5" />
          <Paragraph size="xs" weight="medium" color="error">
            {problem.title}
          </Paragraph>
        </Frame>

        <Paragraph size="xxs">{problem.message}</Paragraph>
        <Paragraph size="xxs">{problem.nextStep}</Paragraph>

        {onAction && (
          <Frame className="w-full justify-end">
            <Button
              variant="outline"
              size="xs"
              disabled={isBusy}
              func={onAction}
              specificStyles={{
                color: "var(--color-error)",
                borderColor: "var(--color-error)",
              }}
            >
              {isBusy ? "Working..." : actionLabel ?? "Try again"}
            </Button>
          </Frame>
        )}
      </Frame>
    </div>
  )
}
