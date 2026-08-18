"use client"
import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import Link from "next/link"
import { useParams } from "next/navigation"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import Card from "../../ui/composites/card"
import Frame from "../../ui/primitives/frame"
import RadialProgress from "../../ui/composites/radialProgress"
import { useTheme } from "../themeProvider"
import { healthMap } from "@/src/utils/healthMap"
import { generateHealthBackground } from "@/src/utils/healthBackground"
import { shadow3 } from "@/src/app/design/shadows"

type SmallBusinessOverviewProps = {
    business: Business
}

export default function SmallBusinessOverview({business}: SmallBusinessOverviewProps) {
    const {businessId} = useParams();
    const {colors} = useTheme()
    const healthBackground = generateHealthBackground(business.health)

    const hoverStyles = 
    `after:left-[-8px] after:top-[-8px]
    after:absolute after:pointer-events-none 
    after:w-[200px] after:h-[200px]
    after:rounded-[var(--radius-md)] hover:after:bg-[var(--color-background2)]
    ${businessId === business.id? "after:bg-[var(--color-background3)] after:border-[1.5px]  after:border-[var(--color-accent2)]" : ""}`

  return (
    <Link href={`/dashboard/performance/businesses/${business.id}`} className={`relative w-max rounded-[var(--radius-sm)] shrink-0 h-[180px] w-[180px] ${hoverStyles}`}>
      <Card
        width="185px"
        padding="lg"
        height="185px"
        rounded="sm"
        justify="space-between"
        specificStyles={{
          position: "relative",
          flexShrink: 0,
          border: `solid 1px ${colors["outline2"]}`,
          background: `linear-gradient(${colors["white"]} 0%, ${colors["white"]} 70%, ${colors[healthBackground]} 90%)`,
        }}
        className={`z-[10] cursor-pointer`}
      >
        <Frame width="stretch" justify="center" height="hug" align="center">
          <Heading type="h3" size="xxs">
            {shortenText(business?.name, 18)}
          </Heading>
        </Frame>

        <Frame width="stretch" gap="sm" direction="column" align="center" className="flex-1 justify-center">
          <RadialProgress color={healthMap[business.health]} score={business.healthScore} size={82} textSize="sm" strokeWidth={2} />
          <Paragraph weight="semiBold" color={healthMap[business.health]} size="xs">
            {business.health}
          </Paragraph>
        </Frame>
      </Card>
    </Link>
  )
}

