"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useEffect } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import KpiRow from "@/src/components/app/cards/kpiCard"
import Section from "@/src/components/layout/section"
import { quickContactTableData } from "@/src/components/app/customers/customerData"
import Table from "@/src/components/ui/composites/table"
import { kpiObjectProps } from "@/src/types/types"
import Button from "@/src/components/ui/primitives/button"
import { useBackdropState } from "@/src/store/backdropState"

export default function Home() {
  const { businessesState, setBusinessesState } = useBusinessesState()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const dashboardKpis:kpiObjectProps[] = [
    {
      id:0,
      title: "Customers",
      value: "30",
      meaning: "Total number of customers",
    },
    {
      id:1,
      title: "New Customers",
      value: "5",
      meaning: "Customers gained during this period",
    },
    {
      id:2,
      title: "Watchlist",
      value: "4",
      meaning: "Customers flagged for attention",
    },
    {
      id:3,
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

  const createCustomer = () => {
    setBackdropOpen(true)
    setBackdropContent("create-customer-form")
  }

  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      <Frame className="w-full gap-[var(--space-xs)] justify-between h-max">
        <Frame>
          <Heading size="xl" type="h1">Customers</Heading>
        </Frame>
        <Frame>
            <Button variant="outline" iconName="icon-plus" size="sm" func={createCustomer}> Add Customer </Button>
        </Frame>
      </Frame>
      <Frame className="w-full h-[100px] gap-[var(--space-md)]">
        {dashboardKpis.map((item, index) => 
          <KpiRow key={item?.id} kpi={item}/>)}
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
