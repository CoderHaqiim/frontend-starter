"use Client"
import Frame from "../ui/primitives/frame"
import Icon from "../ui/primitives/icon"
import Paragraph from "../ui/primitives/paragraph"
import { useTheme } from "./themeProvider"

export default function Transaction() {
    const {colors} = useTheme()
    const date = new Date().toDateString()
  return (
    <Frame width="stretch" height="hug" gap="lg" align="center" padding="md">
        <Icon name="icon-circle-arrow-up" size="xxl" fill={colors["success2"]} color="success"/>
        <Frame direction="column" width="stretch" height="hug">
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph weight="normal" color="textColor1" size="sm">Got drunk and fell in a ditch</Paragraph>
                <Paragraph weight="normal" color="success" size="md">+$4000</Paragraph>
            </Frame>
            <Frame width="stretch" height="hug" justify="space-between" align="center">
                <Paragraph size="xxs">Business1</Paragraph>
                <Paragraph size="xxs" >{date}</Paragraph>
            </Frame>
        </Frame>
    </Frame>
  )
}
