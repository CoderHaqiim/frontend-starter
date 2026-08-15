import Frame from "../primitives/frame"
import KpiCard from "../../app/cards/kpiCard"
import { type } from "os"

type kpiObjectProps = {
    id?: string | number,
    title: string,
    value: string,
    meaning?: string,
    trend?: "up" | "down" | string
}

type KpiRowProps = {
    kpis: kpiObjectProps[]
}

export default function KpiRow({kpis}: KpiRowProps) {
  return (
    <Frame width="stretch" height="100px" gap="md">
        {
            kpis.map((item, index) => <KpiCard key={ item?.id ?? index} meaning={item?.meaning} title={item?.title} trend={item?.trend} value={item.value}/>)
        }
    </Frame>
  )
}
