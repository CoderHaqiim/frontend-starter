import Frame from "../ui/primitives/frame"
import Icon from "../ui/primitives/icon"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import Paragraph from "../ui/primitives/paragraph"
import { fontWeight } from "@/src/app/design/typograhy"

export default function Transaction() {
    const date = new Date().toDateString()
  return (
    <Frame width="stretch" height="hug" gap="lg" align="center" padding="md" className="bg-[var(--color-white)]">
        <Icon name="icon-circle-arrow-up" size="xxl" fill={colors["success2"]} color={colors["success"]}/>
        <Frame direction="column" width="stretch" height="hug">
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph weight={fontWeight["medium"]} color={colors["textColor1"]} size="sm">Got drunk and fell in a ditch</Paragraph>
                <Paragraph weight={fontWeight["medium"]} color={colors["success"]} size="md">+$4000</Paragraph>
            </Frame>
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph size="xs">Business1</Paragraph>
                <Paragraph size="xs" >{date}</Paragraph>
            </Frame>
        </Frame>
    </Frame>
  )
}
