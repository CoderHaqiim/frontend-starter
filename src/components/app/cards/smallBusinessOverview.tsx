"use client"

import { shadow4 } from "@/src/app/design/shadows"
import { Business } from "@/src/types/types"
import { useParams } from "next/navigation"
import Card from "../../base/ui/composites/card"
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
    <Card width="130px" padding="lg" height="auto" rounded="sm" justify="space-between" 
      specificStyles={{
          borderRadius: 0,
          aspectRatio: "1/1.414",
          position: "relative",
          flexShrink: 0,
          border: `solid 1px ${colors["outline2"]}`,
          background: colors["white"],
        }}
        className={`z-[10] ${shadow4} cursor-pointer`}
      >
       //content here
      </Card>
  )
}
