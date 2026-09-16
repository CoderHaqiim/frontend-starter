"use client"

import { ObjectRecordType } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import { useMemo } from "react"
import Card from "../../base/ui/composites/card"
import Frame from "../../base/ui/primitives/frame"
import Paragraph from "../../base/ui/primitives/paragraph"

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
            width="200px"
            height="max-content"
            gap="sm"
            padding="lg"
            rounded="md"
            className="shrink-0 min-h-[80px] border-[1px] border-[var(--color-outline1)]"
        >
            <Frame className="flex items-start gap-[var(--space-md)]">
                <Frame
                    className="flex shrink-0 h-[30px] w-[30px] items-center justify-center rounded-[50%]"
                    specificStyles={{
                        background: avatarBg,
                    }}
                >
                    <Paragraph
                        size="sm"
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
                    <Frame className="flex flex-col gap-[var(--space-xs)]">
                        <Paragraph size="sm" weight="medium" color="textColor1" specificStyle={{ lineHeight: "1" }}>
                            {shortenText(name, 25)}
                        </Paragraph>
                        <Paragraph size="xxs" specificStyle={{ lineHeight: "1" }}>
                            {email}
                        </Paragraph>
                    </Frame>

                    <Frame className="flex items-center gap-[var(--space-sm)]">
                        <Paragraph
                            size="xs"
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