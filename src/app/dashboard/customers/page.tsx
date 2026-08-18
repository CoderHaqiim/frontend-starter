"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useEffect } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import KpiCard from "@/src/components/app/cards/kpiCard"
import Section from "@/src/components/layout/section"
import { quickContactTableData } from "@/src/components/app/customers/customerData"
import Table from "@/src/components/ui/composites/table"

export default function Home() {
  const { businessesState, setBusinessesState } = useBusinessesState()

  const dashboardKpis = [
    {
      title: "Customers",
      value: "30",
      meaning: "Total number of customers",
    },
    {
      title: "New Customers",
      value: "5",
      meaning: "Customers gained during this period",
    },
    {
      title: "Watchlist",
      value: "4",
      meaning: "Customers flagged for attention",
    },
    {
      title: "Receivables",
      value: "$6500",
      meaning: "Total amount owed to your business",
    },
  ]

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await http<Businesses>("/api/businesses", undefined, { method: "GET" })
      setBusinessesState(businesses)
    }

    fetchBusinesses()
  }, [setBusinessesState])

  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      <Frame className="w-full gap-[var(--space-xs)] h-max flex-col">
        <Heading size="xl" type="h1">Customers</Heading>
      </Frame>
      <Frame className="w-full h-[100px] gap-[var(--space-md)]">
        {dashboardKpis.map((item, index) => (
          <KpiCard meaning={item.meaning} key={index} title={item.title} value={item.value} />
        ))}
      </Frame>
      <Section width="stretch">
        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Frame className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Quick Contact</Heading>
          </Frame>
          <Frame className="w-full h-full" scroll="hidden">
            <Table width="stretch" cellWidth="180px" height="300px" size="sm" data={quickContactTableData}/>
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}