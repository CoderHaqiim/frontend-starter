import { shadow3 } from "@/src/app/design/shadows"
import Button from "../primitives/button"
import Card from "./card"

type DownloadDialogueProps = {
  downloadPDF: () => void | Promise<void>
  downloadPNG: () => void | Promise<void>
  pngLabel?: string
  pdfLabel?: string
}

export default function DownloadDialogue({
  downloadPDF,
  downloadPNG,
  pngLabel = "Download JPG",
  pdfLabel = "Download PDF",
}: DownloadDialogueProps) {
  return (
    <Card
      padding="md"
      width="max-content"
      height="max-content"
      className={`gap-[var(--space-sm)] ${shadow3}`}
    >
      <Button
        width="150px"
        func={downloadPNG}
        size="sm"
        variant="outline"
        iconName="icon-download"
        specificStyles={{
          borderRadius: "var(--radius-sm)",
        }}
      >
        {pngLabel}
      </Button>

      <Button
        width="150px"
        func={downloadPDF}
        size="sm"
        variant="fill"
        iconName="icon-download"
        specificStyles={{
          borderRadius: "var(--radius-sm)",
        }}
      >
        {pdfLabel}
      </Button>
    </Card>
  )
}
