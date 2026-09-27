import { shadow5 } from "@/src/app/design/shadows"
import { NotificationType } from "@/src/services/notificationService"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Paragraph from "../base/ui/primitives/paragraph"

type NotificationReadProps = {
    notification: NotificationType | undefined
}

export default function NotificationRead({notification}: NotificationReadProps) {
  return (
    <Frame className={`${shadow5} left-[-520px] flex-col p-[var(--space-lg)] h-full w-[500px] top-[0] rounded-[var(--radius-md)] bg-[var(--color-white)]`}
        specificStyles={{
            position: "absolute",
            display: notification? "flex" : "none"
        }}>
        <Frame className="mb-[var(--space-lg)]">
            <Heading size="md" type="h2">{notification?.title ?? "Title"}</Heading>
        </Frame>
        <Frame scroll="hidden">
            <Paragraph size="sm"> { notification?.message ?? "message"}</Paragraph>
        </Frame>
    </Frame>
  )
}
