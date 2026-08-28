"use client"

import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import Link from "next/link"
import { useParams } from "next/navigation"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import Card from "../../ui/composites/card"
import Frame from "../../ui/primitives/frame"
import { useTheme } from "../../providers/themeProvider"

type SmallBusinessOverviewProps = {
  business: Business
}

export default function SmallBusinessOverview({
  business
}: SmallBusinessOverviewProps) {
  const { businessId } = useParams()
  const { colors } = useTheme()

  const hoverStyles = `
    after:left-[-8px] after:top-[-8px]
    after:absolute after:pointer-events-none
    after:w-[187px] after:h-[187px]
    after:rounded-[var(--radius-md)]
    hover:after:bg-[var(--color-background2)]
    ${
      businessId === business.id
        ? "after:bg-[var(--color-background3)] after:border-[1.5px] after:border-[var(--color-accent2)]"
        : ""
    }
  `

  return (
    <Link
      href={`/dashboard/businesses/${business.id}/overview`}
      className={`
        relative w-max rounded-[var(--radius-sm)]
        shrink-0 h-[170px] w-[170px]
        ${hoverStyles}
      `}
    >
      <Card
        width="170px"
        padding="lg"
        height="170px"
        rounded="sm"
        justify="space-between"
        specificStyles={{
          position: "relative",
          flexShrink: 0,
          border: `solid 1px ${colors["outline2"]}`,
          background: colors["white"],
        }}
        className="z-[10] cursor-pointer"
      >
        <Frame className="w-full flex justify-center items-center h-max">
          <Heading type="h3" size="xxs">
            {shortenText(business?.name, 18)}
          </Heading>
        </Frame>

        <Frame
          className="
            w-full
            flex
            flex-col
            items-center
            gap-[var(--space-sm)]
            flex-1
            justify-center
          "
        >
          <Paragraph weight="semiBold" color="textColor1" size="md">
            {business.customers}
          </Paragraph>
          <Paragraph weight="light" color="textColor2" size="xs">
            customers
          </Paragraph>
        </Frame>
      </Card>
    </Link>
  )
}
