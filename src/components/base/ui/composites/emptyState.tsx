import Frame from "../primitives/frame"
import Paragraph from "../primitives/paragraph"
import { listSurfaceClass } from "./list"

type EmptyStateProps = {
  message: string
  // The surface of the container this placeholder stands in for, so the box does
  // not change shape when the list is empty. Pass an empty string when something
  // around it already draws the surface.
  surface?: string
}

// The placeholder a list shows when it has nothing to display yet. It lives here
// so every list answers with the same centred message.
export default function EmptyState({ message, surface = listSurfaceClass }: EmptyStateProps) {
  return (
    <Frame className={`w-full h-full items-center justify-center ${surface}`}>
      <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex items-center justify-center">
        {message}
      </Paragraph>
    </Frame>
  )
}
