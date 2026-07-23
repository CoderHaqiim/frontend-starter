import Frame from "../ui/primitives/frame"
import Icon from "../ui/primitives/icon"
import { colors } from "@/src/app/design/colors"
import Paragraph from "../ui/primitives/paragraph"

export default function Transaction() {
    const date = new Date().toDateString()
  return (
    <Frame width="stretch" height="hug" gap="lg" align="center" padding="md">
        <Icon name="icon-circle-arrow-up" size="xxl" fill={colors["success2"]} color="success"/>
        <Frame direction="column" width="stretch" height="hug">
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph weight="medium" color="textColor1" size="sm">Got drunk and fell in a ditch</Paragraph>
                <Paragraph weight="medium" color="success" size="md">+$4000</Paragraph>
            </Frame>
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph size="xs">Business1</Paragraph>
                <Paragraph size="xs" >{date}</Paragraph>
            </Frame>
        </Frame>
    </Frame>
  )
}
