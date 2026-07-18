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
import RightAside from "@/src/components/app/rightAside"

export default function Home() {
  const {userState} = useUserState()
  const reportDuration = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  const businessMetrics = ["profit","revenue","expenses"]
  const {businessesState, setBusinessesState} = useBusinessesState()

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
          <Card width="stretch" height="stretch" padding="lg" rounded="md" className="bg-[var(--color-white)]">
            <Paragraph size="xs" color="textColor2" weight="normal">Active Businesses</Paragraph>
            <Paragraph size="xxl" color="textColor1" weight="medium">3</Paragraph>
          </Card>
          <Card width="stretch" height="stretch" padding="lg" rounded="md" className="bg-[var(--color-white)]">
            <Paragraph size="xs" color="textColor2" weight="normal">Total Income</Paragraph>
            <Paragraph size="xxl" color="textColor1" weight="medium">$4000</Paragraph>
          </Card>
          <Card width="stretch" height="stretch" padding="lg" rounded="md" className="bg-[var(--color-white)]">
            <Paragraph size="xs" color="textColor2" weight="normal">Total Expenses</Paragraph>
            <Paragraph size="xxl" color="textColor1" weight="medium">$500</Paragraph>
          </Card>
          <Card width="stretch" height="stretch" padding="lg" rounded="md" className="bg-[var(--color-white)]">
            <Paragraph size="xs" color="textColor2" weight="normal">Net Profit</Paragraph>
            <Paragraph size="xxl" color="textColor1" weight="medium">$3500</Paragraph>
          </Card>
        </Frame>
        <Frame width="stretch" height="hug" className="bg-[var(--color-white)] gap-[var(--space-md)]">
          <Card width="stretch" height="stretch" padding="lg" rounded="md">
            <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
              <Heading size="md" type="h2">Performance Overview</Heading>
              <Frame width="hug" height="hug" className="gap-[var(--space-sm)]">
                <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
                <Dropdown name="report" size="sm" options={reportDuration}/>
              </Frame>
            </Frame>
            <Chart1 variant={selectedChart}/>
          </Card>
        </Frame>
        <Frame width="stretch" height="hug" className="bg-[var(--color-white)] gap-[var(--space-md)]">
          <Card width="stretch" height="hug" padding="lg" rounded="md">
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
          </Card>
        </Frame>
        <Frame width="stretch" height="hug" gap="md">
          <Card width="stretch" height="hug" padding="lg" rounded="md">
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
          </Card>
        </Frame>
        <Frame width="stretch" height="hug" className="gap-[var(--space-md)]">
          <Card width="stretch" height="hug" padding="lg" rounded="md">
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
          </Card>
        </Frame>
      </Frame>
    
  )
}
