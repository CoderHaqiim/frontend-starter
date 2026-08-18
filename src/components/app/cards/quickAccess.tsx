import { useMemo } from "react"
import Card from "../../ui/composites/card"
import Frame from "../../ui/primitives/frame"
import Paragraph from "../../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import { ObjectRecordType } from "@/src/types/types"
import Icon from "../../ui/primitives/icon"

type QuickAccessProps = {
    entry?: ObjectRecordType
}

export default function QuickAccessCard({ entry }: QuickAccessProps) {
    const name = entry?.Name || entry?.name || "Unknown"
    const email = entry?.Email || entry?.email || ""
    const company = entry?.Company || entry?.companyName || ""

    const { avatarBg, avatarColor } = useMemo(() => {
        // pick H, S, L with lightness kept moderate (30-45%) to avoid too-light backgrounds
        const h = Math.floor(Math.random() * 360)
        const s = Math.floor(Math.random() * 31) + 50 // 50-80%
        const l = Math.floor(Math.random() * 16) + 30 // 30-45%
        const bg = `hsl(${h}, ${s}%, ${l}%)`
        const color = l < 50 ? "#ffffff" : "#000000"
        return { avatarBg: bg, avatarColor: color }
    }, [])

    const initial = name?.toString().trim().charAt(0).toUpperCase() || "U"

    return (
        <Card
            width="250px"
            height="80px"
            gap="md"
            padding="lg"
            rounded="md"
            className="shrink-0 border-[1px] border-[var(--color-outline2)]"
        >
            <Frame className="flex items-start gap-[var(--space-md)]">
                <Frame
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-[50%]"
                    specificStyles={{
                        background: avatarBg,
                    }}
                >
                    <Paragraph
                        size="xs"
                        weight="semiBold"
                        specificStyle={{
                            color: avatarColor,
                            lineHeight: 1,
                        }}
                    >
                        {initial}
                    </Paragraph>
                </Frame>

                <Frame className="flex flex-col gap-[var(--space-md)]">
                    <Frame className="flex flex-col gap-[var(--space-xxs)]">
                        <Paragraph
                            size="sm"
                            weight="normal"
                            color="textColor1"
                            specificStyle={{ lineHeight: "1" }}
                        >
                            {shortenText(name, 25)}
                        </Paragraph>

                        <Paragraph
                            size="xs"
                            specificStyle={{ lineHeight: "1" }}
                        >
                            {email}
                        </Paragraph>
                    </Frame>

                    <Frame className="flex items-center gap-[var(--space-sm)]">
                        <Paragraph
                            size="xxs"
                            weight="normal"
                            color="textColor1"
                            specificStyle={{ lineHeight: "1" }}
                        >
                            {company}
                        </Paragraph>
                    </Frame>
                </Frame>
            </Frame>
        </Card>
    )
}