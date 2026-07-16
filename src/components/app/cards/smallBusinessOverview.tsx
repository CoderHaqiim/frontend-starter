"use client"

import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import Link from "next/link"
import { useParams } from "next/navigation"

type SmallBusinessOverviewProps = {
    business: Business
}

export default function SmallBusinessOverview({business}: SmallBusinessOverviewProps) {
    const {businessId} = useParams();

    const hoverStyles = 
    `after:left-[-9px] after:top-[-9px]
    after:absolute after:pointer-events-none 
    after:w-[calc(100%+18px)] after:h-[calc(100%+18px)] 
    after:rounded-[inherit] hover:after:bg-[var(--color-background2)]
    focus:after:border-[var(--color-accent1)] 
    focus:after:border-[2px] ${businessId === business.id? "after:bg-[var(--color-background2)]" : ""}`

    
  return (
    <div className={`w-[160px] rounded-[var(--radius-md)] flex justify-center items-center relative shrink-0 h-[160px] ${hoverStyles}`}>
        <Link href={`/dashboard/businesses/${business.id}`} className={`w-full realtive z-[2] border-[1px] border-[var(--color-outline)] isolate z-0 shrink-0 flex justify-start p-[10px] align-start h-full rounded-[var(--radius-sm)] bg-[var(--color-white)] cursor-pointer`}>
            <span className="text-[12px] text-left text-[color:var(--color-textColor1)] font-[700]">{shortenText(business?.name, 18)}</span>
        </Link>
    </div>
  )
}

