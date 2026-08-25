"use client"

import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import { scoreHealthMap } from "@/src/utils/scoreHealthMap"
import Link from "next/link"
import RadialProgress from "../../ui/composites/radialProgress"
import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import { healthMap } from "@/src/utils/healthMap"
import { generateHealthBackground } from "@/src/utils/healthBackground"
import { useTheme } from "../themeProvider"

type BusinessOverviewProps = {
  data: Business
}

const avatarColors = [
  "#97bdfd",
  "#6ce175",
  "#df28ec",
  "#efb98d",
  "#a28cc2",
  "#1b707b",
  "#afd65a",
  "#d67179",
]

const getBusinessInitial = (name: string) => {
  return name?.trim()?.charAt(0)?.toUpperCase() || "?"
}

const getBusinessColor = () => {
  const index = Math.floor(Math.random() * avatarColors.length)

  return avatarColors[index]
}

export default function BusinessOverview({ data }: BusinessOverviewProps) {
  const { colors } = useTheme()
  const healthBackground = generateHealthBackground(data.health)

  const businessInitial = getBusinessInitial(data.name)
  const businessColor = getBusinessColor()

  return (
    <Link
      href={`/dashboard/businesses/${data.id}/overview`}
      className="transform transition-transform duration-300 cursor-pointer pointer-events-auto hover:z-20 hover:scale-[0.96]"
    >
      <Card width="289px" height="max-content" justify="space-between" padding="lg" gap="md"
        specificStyles={{
          position: "relative",
          border: `solid 1px ${colors["outline1"]}`,
          flexShrink: 0,
          background: colors["white"],
        }}
      >
        {/* Business name */}
        <Frame className="w-full gap-[var(--space-md)] h-max items-center">
          <Frame
            className="w-[var(--elementSize-md)] h-[var(--elementSize-md)] rounded-[var(--radius-sm)] items-center justify-center"
            specificStyles={{
              backgroundColor: businessColor,
            }}
          >
            <Paragraph size="sm" weight="semiBold" color="textColor1">
              {businessInitial}
            </Paragraph>
          </Frame>

          <Frame className="flex-col gap-[var(--space-xxs)]">
            <Heading type="h3" size="sm">
              {shortenText(data?.name, 22)}
            </Heading>

            <Paragraph size="xs">
              {data?.industry}
            </Paragraph>
          </Frame>
        </Frame>

        {/* Health score */}
        <Frame
          className="w-full border border-[var(--color-outline1)] rounded-[var(--radius-sm)] p-[var(--space-md)] gap-[var(--space-lg)] items-center"
          specificStyles={{
            backgroundColor: colors[healthBackground],
          }}
        >
          <RadialProgress color={healthMap[data.health]} score={data.healthScore} size={50} textSize="xs" strokeWidth={2}/>

          <Frame className="flex-col gap-[var(--space-xxs)]">
            <Paragraph size="xs" className="leading-[1]">
              Health score
            </Paragraph>

            <Paragraph weight="medium" color={healthMap[data.health]} size="md" className="leading-[1]">
              {data.health}
            </Paragraph>
          </Frame>
        </Frame>

        {/* Financial summary */}
        <Frame className="w-full grid grid-cols-2 gap-[var(--space-sm)]">
          <Frame className="flex-col bg-[var(--color-background1)] p-[var(--space-sm)] rounded-[var(--radius-sm)]">
            <Paragraph size="xs">Income</Paragraph>

            <Paragraph color="textColor1" weight="semiBold" size="md">
              { "$" + data.income}
            </Paragraph>
          </Frame>

          <Frame className="flex-col bg-[var(--color-background1)] p-[var(--space-sm)] rounded-[var(--radius-sm)]">
            <Paragraph size="xs">Customers</Paragraph>

            <Paragraph color="textColor1" weight="semiBold" size="md">
              {data.customers}
            </Paragraph>
          </Frame>

          <Frame className="flex-col bg-[var(--color-background1)] p-[var(--space-sm)] rounded-[var(--radius-sm)]">
            <Paragraph size="xs">Expenses</Paragraph>

            <Paragraph color="textColor1" weight="semiBold" size="md">
              { "$" + data.expenses}
            </Paragraph>
          </Frame>

          <Frame className="flex-col bg-[var(--color-background1)] p-[var(--space-sm)] rounded-[var(--radius-sm)]">
            <Paragraph size="xs">Net Profit</Paragraph>

            <Paragraph color="textColor1" weight="semiBold" size="md" >
              { "$" + data.netProfit}
            </Paragraph>
          </Frame>
        </Frame>
      </Card>
    </Link>
  )
}