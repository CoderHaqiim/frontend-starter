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

export default function Home() {
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
          <Heading size="xl" type="h1">{`Welcome back, ${userState.username}`}</Heading>
          <Paragraph weight="light" size="sm">
            Here's what's happening today.
          </Paragraph>
        </Frame>
        <Frame width="stretch" height="100px" gap="md">
          {
            dashboardKpis.map((item, index) => <KpiCard key={index} title={item.title} value={item.value}/>)
          }
        </Frame>

        {/* Performance Overview */}
        <Section>
          <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
              <Heading size="md" type="h2">Performance Overview</Heading>
              <Frame width="hug" height="hug" className="gap-[var(--space-sm)]">
                <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
                <Dropdown name="report" size="sm" options={reportDuration}/>
              </Frame>
            </Frame>
            <Chart1 variant={selectedChart}/>
        </Section>

        {/* Business Overview */}
        <Section>
          <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
            <Heading size="sm" type="h2">Businesses Overview</Heading>
            <Frame width="hug" height="hug" gap="sm">
              <Dropdown name="ranking" size="sm" options={reportDuration}/>
            </Frame>
          </Frame>
          <Frame width="stretch" height="hug" scroll="hidden" className="gap-[var(--space-lg)]">
            {
              businessesState.map(buisness => <BusinessOverviewCard data={buisness} key={buisness.id}/>)
            }
          </Frame>
        </Section>

        {/* Performance Ranking */}
        <Section>
            <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
              <Heading size="sm" type="h2">Performance Ranking</Heading>
              <Frame width="hug" height="hug" gap="sm">
                <Dropdown name="ranking" size="sm" options={businessMetrics}/>
                <Dropdown name="ranking" size="sm" options={reportDuration}/>
              </Frame>
            </Frame>
            <List specificStyles={{overflow: "hidden"}}>
              <MetricsRow data={{name:"Business1"}}/>
              <MetricsRow data={{name:"Business2"}}/>
              <MetricsRow data={{name:"Business3"}}/>
              <MetricsRow data={{name:"Business4"}}/>
            </List>
        </Section>

        {/* Latest Transactions */}
        <Section>
          <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
            <Heading size="sm" type="h2">Latest Transactions</Heading>
            <Frame width="hug" height="hug" gap="sm">
              <Dropdown name="ranking" size="sm" options={["Business1", "Business2", "Business3"]}/>
            </Frame>
          </Frame>
          <List height="200px" scroll="hidden">
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
          </List>
        </Section>
      </Frame>
    
  )
}
