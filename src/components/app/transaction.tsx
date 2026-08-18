"use Client"

import Frame from "../ui/primitives/frame"
import Icon from "../ui/primitives/icon"
import Paragraph from "../ui/primitives/paragraph"
import { useTheme } from "./themeProvider"

export default function Transaction() {
    const { colors } = useTheme()
    const date = new Date().toDateString()

    return (
        <Frame
            className="
                flex
                w-full
                h-max
                items-center
                gap-[var(--space-lg)]
                p-[var(--space-md)]
            "
        >
            <Icon
                name="icon-circle-arrow-up"
                size="xxl"
                fill={colors["success2"]}
                color="success"
            />

            <Frame
                className="
                    flex
                    w-full
                    h-max
                    flex-col
                "
            >
                <Frame
                    className="
                        flex
                        w-full
                        h-max
                        items-center
                        justify-between
                    "
                >
                    <Paragraph
                        weight="normal"
                        color="textColor1"
                        size="sm"
                    >
                        Got drunk and fell in a ditch
                    </Paragraph>

                    <Paragraph
                        weight="normal"
                        color="success"
                        size="md"
                    >
                        +$4000
                    </Paragraph>
                </Frame>

                <Frame
                    className="
                        flex
                        w-full
                        h-max
                        items-center
                        justify-between
                    "
                >
                    <Paragraph size="xxs">
                        Business1
                    </Paragraph>

                    <Paragraph size="xxs">
                        {date}
                    </Paragraph>
                </Frame>
            </Frame>
        </Frame>
    )
}