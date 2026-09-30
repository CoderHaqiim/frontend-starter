"use client"

import { useAccountCurrencySymbol } from "@/src/hooks/accountCurrency"
import {
  Business,
  BusinessHealth,
  BusinessKpiResponse,
} from "@/src/types/types"
import { formatAbridgedAmount } from "@/src/utils/formatAmount"
import { generateHealthBackground } from "@/src/utils/healthBackground"
import { healthMap } from "@/src/utils/healthMap"
import { shortenText } from "@/src/utils/shortenText"
import Link from "next/link"
import Card from "../../base/ui/composites/card"
import RadialProgress from "../../base/ui/composites/radialProgress"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"
import { useTheme } from "../../providers/themeProvider"

type BusinessOverviewProps = {
  data: Business
  health?: BusinessHealth
  kpis?: BusinessKpiResponse
  index: number
}

const avatarColors = [ "#97bdfd", "#6ce175", "#df28ec", "#efb98d", "#a28cc2", "#1b707b", "#afd65a", "#d67179"]

const getBusinessInitial = (name: string) => { return name?.trim()?.charAt(0)?.toUpperCase() || "?" }

const getBusinessColor = (index: number) => {
  return avatarColors[index % avatarColors.length]
}

export default function BusinessOverview({ data, health, kpis, index,}: BusinessOverviewProps) {
  const { colors } = useTheme()
  const businessHealth = {
    health: health?.healthStatus ?? data.health ?? "healthy",
    healthScore: health?.healthScore ?? data.healthScore ?? 0,
  }
  const healthBackground = generateHealthBackground( businessHealth.health)
  const businessInitial = getBusinessInitial(data.businessName)
  const businessColor = getBusinessColor(index)
  // The card reports money in the account currency, shortened so a large figure
  // still fits on the card.
  const currencySymbol = useAccountCurrencySymbol()
  const financials = kpis?.financials

  return (
    <Link
      href={`/dashboard/businesses/${data.id}/overview`}
      className="transform cursor-pointer pointer-events-auto transition-transform duration-300 hover:z-20 hover:scale-[0.96]"
    >
      <Card
        width="320px"
        height="max-content"
        justify="space-between"
        padding="xl"
        gap="lg"
        specificStyles={{
          position: "relative",
          border: `solid 1px ${colors["outline1"]}`,
          flexShrink: 0,
          background: colors["white"],
        }}
      >
        {/* Business name */}
        <Frame className="w-full h-max items-center gap-[var(--space-md)]">
          <Frame
            className="w-[var(--elementSize-md)] h-[var(--elementSize-md)] overflow-hidden items-center justify-center rounded-[var(--radius-sm)]"
            specificStyles={{
              backgroundColor: businessColor,
            }}
          >
            {data.logo ? (
              <img
                src={data.logo}
                alt={`${data.businessName} logo`}
                className="h-full w-full rounded-[var(--radius-sm)] object-cover"
              />
            ) : (
              <Paragraph
                size="sm"
                weight="semiBold"
                color="textColor1"
              >
                {businessInitial}
              </Paragraph>
            )}
          </Frame>

          <Frame className="flex-col gap-[var(--space-xs)]">
            <Heading type="h3" size="sm">
              {shortenText(data?.businessName, 22)}
            </Heading>

            <Paragraph size="xs">
              {data?.industry}
            </Paragraph>
          </Frame>
        </Frame>

        {/* Health score */}
        <Frame
          className="w-full items-center gap-[var(--space-lg)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-md)]"
          specificStyles={{
            backgroundColor: colors[healthBackground],
          }}
        >
          <RadialProgress
            color={healthMap[businessHealth.health]}
            score={businessHealth.healthScore}
            size={55}
            textSize="xs"
            strokeWidth={2}
          />

          <Frame className="flex-col gap-[var(--space-xxs)]">
            <Paragraph size="xs" className="leading-[1]">
              Health score
            </Paragraph>

            <Paragraph
              weight="medium"
              color={healthMap[businessHealth.health]}
              size="md"
              className="leading-[1]"
            >
              {businessHealth.health}
            </Paragraph>
          </Frame>
        </Frame>

        {/* Financial summary */}
        <Frame className="grid w-full grid-cols-2 gap-[var(--space-sm)]">
          <Frame className="flex-col rounded-[var(--radius-sm)] bg-[var(--color-background1)] p-[var(--space-sm)]">
            <Paragraph size="xs">
              Revenue
            </Paragraph>

            <Paragraph
              color="textColor1"
              weight="medium"
              size="sm"
            >
              {formatAbridgedAmount(currencySymbol, financials?.revenue.value ?? 0)}
            </Paragraph>
          </Frame>

          <Frame className="flex-col rounded-[var(--radius-sm)] bg-[var(--color-background1)] p-[var(--space-sm)]">
            <Paragraph size="xs">
              Customers
            </Paragraph>

            <Paragraph
              color="textColor1"
              weight="medium"
              size="sm"
            >
              {data.customers}
            </Paragraph>
          </Frame>

          <Frame className="flex-col rounded-[var(--radius-sm)] bg-[var(--color-background1)] p-[var(--space-sm)]">
            <Paragraph size="xs">
              Expenses
            </Paragraph>

            <Paragraph
              color="textColor1"
              weight="medium"
              size="sm"
            >
              {formatAbridgedAmount(currencySymbol, financials?.expenses.value ?? 0)}
            </Paragraph>
          </Frame>

          <Frame className="flex-col rounded-[var(--radius-sm)] bg-[var(--color-background1)] p-[var(--space-sm)]">
            <Paragraph size="xs">
              Profit
            </Paragraph>

            <Paragraph color="textColor1" weight="medium" size="sm">
              {formatAbridgedAmount(currencySymbol, financials?.profit.value ?? 0)}
            </Paragraph>
          </Frame>
        </Frame>
      </Card>
    </Link>
  )
}