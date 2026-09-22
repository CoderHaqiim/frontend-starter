import { shadow3 } from "@/src/app/design/shadows"
import Button from "../primitives/button"
import Card from "./card"

type ShareDialogueProps = {
  shareToApps: () => void | Promise<void>
  shareByEmail: () => void | Promise<void>
  appsLabel?: string
  emailLabel?: string
}

export default function ShareDialogue({
  shareToApps,
  shareByEmail,
  appsLabel = "Other apps",
  emailLabel = "Email",
}: ShareDialogueProps) {
  return (
    <Card
      padding="md"
      width="max-content"
      height="max-content"
      className={`gap-[var(--space-sm)] ${shadow3}`}
    >
      <Button
        width="150px"
        func={shareToApps}
        size="sm"
        variant="outline"
        iconName="icon-share"
        specificStyles={{
          borderRadius: "var(--radius-sm)",
        }}
      >
        {appsLabel}
      </Button>

      <Button
        width="150px"
        func={shareByEmail}
        size="sm"
        variant="fill"
        iconName="icon-mail"
        specificStyles={{
          borderRadius: "var(--radius-sm)",
        }}
      >
        {emailLabel}
      </Button>
    </Card>
  )
}
