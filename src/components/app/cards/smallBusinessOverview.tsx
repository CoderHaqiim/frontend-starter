"use client"
import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import Link from "next/link"
import { useParams } from "next/navigation"
import Paragraph from "../../ui/primitives/paragraph"
import Card from "../../ui/composites/card"

type SmallBusinessOverviewProps = {
    business: Business
}

export default function SmallBusinessOverview({business}: SmallBusinessOverviewProps) {
    const {businessId} = useParams();

    const hoverStyles = 
    `after:left-[-8px] after:top-[-8px]
    after:absolute after:pointer-events-none 
    after:w-[calc(100%+16px)] after:h-[calc(100%+16px)] 
    after:rounded-[var(--radius-md)] hover:after:bg-[var(--color-background2)]
    ${businessId === business.id? "after:bg-[var(--color-background3)] after:border-[1.5px]  after:border-[var(--color-accent2)]" : ""}`

    
  return (
<Link href={`/dashboard/businesses/${business.id}`} className={`relative rounded-[var(--radius-md)] shrink-0 h-[160px] w-[160px] ${hoverStyles}`}>
  <Card width="160px" padding="md" height="160px" rounded="md" className={`bg-[var(--color-white)] z-[10] cursor-pointer`}>
    <Paragraph size="xs" weight="medium">
      {shortenText(business?.name, 18)}
    </Paragraph>
  </Card>
</Link>
  )
}

