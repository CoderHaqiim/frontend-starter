"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/userState"
import Card from "@/src/components/ui/composites/card"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Dropdown from "@/src/components/ui/composites/dropdown"
import Chart1 from "@/src/components/ui/charts/chart1" 
import BusinessOverviewCard from "@/src/components/app/cards/businessOverviewCard"
import MetricsRow from "@/src/components/app/metricsRow"
import Transaction from "@/src/components/app/transaction"
import { useState, useEffect } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import List from "@/src/components/ui/composites/list"
import Section from "@/src/components/layout/section"
import KpiCard from "@/src/components/app/cards/kpiCard"
import RightAside from "@/src/components/app/rightAside"

export default function page() {
  const {userState} = useUserState()
  const reportDuration = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  const businessMetrics = ["profit","revenue","expenses"]
  const {businessesState, setBusinessesState} = useBusinessesState()

  const dashboardKpis = [
    {
      title: "Active businesses",
      value: "3"
    },
    {
      title: "Total Income",
      value: "$4000"
    },
    {
      title: "Total Expenses",
      value: "$500"
    },
    {
      title: "Net Profit",
      value: "$3500"
    }
  ]

  useEffect(()=>{
    const fetchBusinesses = async() => {
      const businesses = await http<Businesses>("/api/businesses", undefined, {method: "GET"})
      setBusinessesState(businesses)
    }
    
    fetchBusinesses()
  },[])

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

  return (
      <Frame width="stretch" direction="column" height="hug" gap="lg"> 
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Task manager</Heading>
        </Frame>
      </Frame>
  )
}
