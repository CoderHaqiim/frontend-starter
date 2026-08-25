"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/userState"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Dropdown from "@/src/components/ui/composites/dropdown"
import Chart1 from "@/src/components/ui/charts/chart1" 
import BusinessOverviewCard from "@/src/components/app/cards/businessOverviewCard"
import MetricsRow from "@/src/components/app/metricsRow"
import { useState, useEffect, useRef, useCallback } from "react"
import { Businesses, kpiObjectProps } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import List from "@/src/components/ui/composites/list"
import Section from "@/src/components/layout/section"
import Button from "@/src/components/ui/primitives/button"
import KpiRow from "@/src/components/ui/composites/kpiRow"
import Badge from "@/src/components/ui/composites/badge"
import { useBackdropState } from "@/src/store/backdropState"
import BusinessOverviewLoader from "@/src/components/app/cards/businessOverviewLoader"

export default function Home() {
  const {userState} = useUserState()
  const reportDuration = ["weekly", "monthly", "annual"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  const businessMetrics = ["profit","revenue","expenses"]
  const {businessesState, setBusinessesState} = useBusinessesState()
  const [businessFilter, setBusinessFilter] = useState<Businesses>([])
  const [dashboardKpis, setDashboardKpis] = useState<kpiObjectProps[] | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const {backdropOpen, setBackdropContent, setBackdropOpen} = useBackdropState()
  const businessFilterArray = ["all", "active", "inactive"]

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [businesses, kpis] = await Promise.all([
          http<Businesses>("/api/businesses", undefined, {method: "GET"}),
          http<kpiObjectProps[]>("/api/dashboard/financialMetrics", undefined, { method: "GET"}),
        ])

        setBusinessesState(businesses)
        setBusinessFilter(businesses)
        setDashboardKpis(kpis)

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }

    fetchDashboardData()
  }, [])

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

  const filterBusinesses = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "all" | "active" | "inactive"
    if(selectedValue !== "all"){
      setBusinessFilter(businessesState.filter(item => item.status === selectedValue))
    }else{
      setBusinessFilter(businessesState)
    }
  }

  const scrollLeftHandler = () => {
    sliderRef.current?.scrollBy({
      left: -298,
      behavior: "smooth",
    });
  };

  const scrollRightHandler = () => {
    sliderRef.current?.scrollBy({
      left: 298,
      behavior: "smooth",
    });
  };

  const createBusiness = () => {
    setBackdropOpen(true)
    setBackdropContent("create-business-form")
  }

  return (
      <Frame className="w-full flex-col h-max gap-[var(--space-lg)]"> 
        <Frame className="w-full flex justify-between items-start">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">{`Welcome back, ${userState.username}`}</Heading>
            <Paragraph weight="light" size="sm">
              Here's what's happening today.
            </Paragraph>
          </Frame>
          <Frame>
            <Button variant="outline" func={createBusiness} size="sm" iconName="icon-plus">Create Business</Button>
          </Frame>
        </Frame>

        {/* Insights */}

        <Frame className="w-full h-max gap-[var(--space-md)] flex-col">
          <Frame className="w-full justify-end">
            <Dropdown name="dashboardDuration" width="max-content" size="xs" options={reportDuration}/>
          </Frame>
          {
            dashboardKpis?
            <KpiRow kpis={dashboardKpis} isLoading={false} itemsCount={4}/>:
            <KpiRow kpis={dashboardKpis} isLoading={true} itemsCount={4}/>
          }
          </Frame>

        {/* Business Overview */}
        <Section>
          <Frame className="w-full items-center h-max justify-between">
            <Frame className="gap-[var(--space-sm)]">
              <Heading size="md" type="h2">My Businesses</Heading>
              <Badge color="accent" size="xs" text={String(businessFilter.length)}/>
            </Frame>
            <Frame className="w-auto h-max gap-[var(--space-sm)]">
              <Dropdown  formFunc={filterBusinesses} name="active filter" width="120px" size="sm" options={businessFilterArray}/>
            </Frame>
          </Frame>

          <Frame ref={sliderRef} className="w-full h-max overflow-hidden flex gap-[var(--space-md)]">
            {
              businessesState.length > 0?
              businessFilter.map(buisness => <BusinessOverviewCard data={buisness} key={buisness.id}/>):
              Array.from({length:3}).map( (item, index) => <BusinessOverviewLoader key={index}/>)
            }
          </Frame>
          <Frame className="justify-end gap-[var(--space-md)]">
            <Button func={scrollLeftHandler} variant="outline" size="xs" isIcon iconName="icon-left"/>
            <Button func={scrollRightHandler} variant="outline" size="xs" isIcon iconName="icon-right"/>
          </Frame>
        </Section>

        {/* Performance Overview */}
        <Section>
          <Frame className="w-full items-center h-max justify-between mb-[var(--space-md)]">
            <Frame className="flex-col">
              <Heading size="md" type="h2">Financial Perfromance</Heading>
            </Frame>
            <Frame className="w-auto h-max gap-[var(--space-sm)]">
              <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
              <Dropdown name="report" size="sm" options={reportDuration}/>
            </Frame>
          </Frame>
          <Chart1 variant={selectedChart}/>
        </Section>


        {/* Performance Ranking */}
        <Section>
          <Frame className="w-full h-max justify-between mb-[var(--space-md)]">
            <Heading size="md" type="h2">Performance Ranking</Heading>
            <Frame className="w-auto h-max gap-[var(--space-sm)]">
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
      </Frame>
    
  )
}