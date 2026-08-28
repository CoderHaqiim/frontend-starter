"use client"

import Frame from "../primitives/frame"
import KpiCard from "../../app/cards/kpiCard"
import KpiLoader from "../../app/cards/kpiLoader"
import { kpiObjectProps } from "@/src/types/types"

type KpiRowProps = {
    kpis: kpiObjectProps[] | null
    itemsCount?: number,
    isLoading?: boolean
}

export default function KpiRow({kpis, isLoading = false, itemsCount = 4}: KpiRowProps) {
  return (
    <Frame className="w-full h-[100px] gap-[var(--space-md)]">
        {
            isLoading?
            Array.from({length: itemsCount}).map((item, index) => <KpiLoader key={index}/>): 
            kpis?.map((item, index) => <KpiCard key={ item?.id ?? index} kpi={item}/>)
        }
    </Frame>
  )
}
