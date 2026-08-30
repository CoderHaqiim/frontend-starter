"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/userState"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Dropdown from "@/src/components/ui/composites/dropdown"
import BusinessOverviewCard from "@/src/components/app/cards/businessOverviewCard"
import MetricsRow from "@/src/components/app/metricsRow"
import { useState, useEffect, useRef, useMemo } from "react"
import { Businesses, BusinessHealth, BusinessKpiResponse, kpiObjectProps, RankingMetric } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import List from "@/src/components/ui/composites/list"
import Section from "@/src/components/layout/section"
import Button from "@/src/components/ui/primitives/button"
import KpiRow from "@/src/components/ui/composites/kpiRow"
import Badge from "@/src/components/ui/composites/badge"
import { useBackdropState } from "@/src/store/backdropState"
import BusinessOverviewLoader from "@/src/components/app/cards/businessOverviewLoader"
import { kpiResponseToCards } from "@/src/utils/kpiResponseToCards"
import ChartSection from "@/src/components/app/chartSection"
import { Duration } from "@/src/types/types"
import CreateBusinessForm from "@/src/components/app/forms/createBusiness"

export default function Home() {
  const { userState } = useUserState()
  const reportDuration = ["weekly", "monthly", "annual"]
  const rankingMetrics: RankingMetric[] = ["profit",  "revenue"]
  const businessFilterArray = ["all", "healthy", "moderate", "critical"]
  const [rankSelector, setRankSelector] = useState<RankingMetric>("profit")
  const { businessesState, setBusinessesState } = useBusinessesState()
  const [businessFilter, setBusinessFilter] = useState("all")
  const [dashboardKpis, setDashboardKpis] = useState<kpiObjectProps[] | null>(null)
  const [businessHealth, setBusinessHealth] = useState<Record<string, BusinessHealth>>({})
  const [businessSummaryKpis, setBusinessSummaryKpis] = useState<Record<string, BusinessKpiResponse>>({})
  const [businessRankingKpis, setBusinessRankingKpis] = useState<Record<string, BusinessKpiResponse>>({})
  const [summaryPeriod, setSummaryPeriod] = useState<Duration>("weekly")
  const [rankingPeriod, setRankingPeriod] = useState<Duration>("weekly")
  const sliderRef = useRef<HTMLDivElement>(null)
  const { setBackdropContent,setBackdropOpen } = useBackdropState()


  //Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [businesses, kpis, health] = await Promise.all(
          [
            http<Businesses>( "/api/businesses", undefined,{method: "GET"}),
            http<BusinessKpiResponse>(`/api/kpis?period=${summaryPeriod}`, undefined, {method: "GET"}),
            http<BusinessHealth[]>(`/api/businesses/health?period=${summaryPeriod}`, undefined, {method: "GET"})
          ]
        )

        const businessSummaryKpiList = await Promise.all( 
          businesses.map(business =>
            http<BusinessKpiResponse>(`/api/businesses/${business.id}/kpis?period=${summaryPeriod}`, undefined, { method: "GET" })
          )
        )

        setBusinessesState(businesses)
        setDashboardKpis(kpiResponseToCards(kpis, "NGN"))
        setBusinessHealth(
          Object.fromEntries(
            health.map(item => [item.businessId, item])
          )
        )

        setBusinessSummaryKpis(
          Object.fromEntries(
            businessSummaryKpiList.map(kpi => [kpi.businessId, kpi])
          )
        )
      } catch (error) {
        console.error(
          "Failed to fetch dashboard data:", error
        )
      }
    }

    fetchDashboardData()
  }, [setBusinessesState, summaryPeriod])

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const businesses = businessesState.length > 0
          ? businessesState
          : await http<Businesses>( "/api/businesses", undefined,{method: "GET"})

        if (businessesState.length === 0) {
          setBusinessesState(businesses)
        }

        const businessRankingKpiList = await Promise.all( 
          businesses.map(business =>
            http<BusinessKpiResponse>(`/api/businesses/${business.id}/kpis?period=${rankingPeriod}`, undefined, { method: "GET" })
          )
        )

        setBusinessRankingKpis(
          Object.fromEntries(
            businessRankingKpiList.map(kpi => [kpi.businessId, kpi])
          )
        )
      } catch (error) {
        console.error(
          "Failed to fetch ranking data:", error
        )
      }
    }

    fetchRankingData()
  }, [businessesState, rankingPeriod, setBusinessesState])

  const filteredBusinesses = useMemo(() => {
    if (businessFilter === "all") {
      return businessesState
    }

    return businessesState.filter(item => businessHealth[item.id]?.health === businessFilter)
  }, [businessesState, businessFilter, businessHealth])

   //rank business
  const rankedBusinesses = useMemo(() => {
    return [...businessesState]
      .sort((a, b) => {
        const aFinancials = businessRankingKpis[a.id]?.financials
        const bFinancials = businessRankingKpis[b.id]?.financials

        return (bFinancials?.[rankSelector].value ?? 0) - (aFinancials?.[rankSelector].value ?? 0)
      })
      .map((business, index) => ({
        id: business.id,
        rank: index + 1,
        name: business.name,
        value: businessRankingKpis[business.id]?.financials[rankSelector].value ?? 0,
        currency: business.currency,
        metric: rankSelector
      }))
  }, [businessesState, businessRankingKpis, rankSelector])

  //Business filter
  const filterBusinesses = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value

    setBusinessFilter(selectedValue)
  }

 //Change ranking metric
  const selectRankingMetric = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as RankingMetric
    setRankSelector(selectedValue)
  }

  const selectSummaryPeriod = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as Duration
    setSummaryPeriod(selectedValue)
  }

  const selectRankingPeriod = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as Duration
    setRankingPeriod(selectedValue)
  }

 //Scroll business slider left
  const scrollLeftHandler = () => {
    sliderRef.current?.scrollBy({
      left: -298,
      behavior: "smooth",
    })
  }

  //Scroll business slider right
  const scrollRightHandler = () => {
    sliderRef.current?.scrollBy({
      left: 298,
      behavior: "smooth",
    })
  }

 //create business
  const createBusiness = () => {
    setBackdropOpen(true)
    setBackdropContent( <CreateBusinessForm/> )
  }

  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      {/* Header */}
      <Frame className="w-full flex justify-between items-start">
        <Frame className="gap-[var(--space-xs)] h-max flex-col">
          <Heading size="xl" type="h1">
            {`Welcome back, ${userState.username}`}
          </Heading>
          <Paragraph weight="light" size="sm">
            Here&apos;s what&apos;s happening today.
          </Paragraph>
        </Frame>

        <Frame>
          <Button variant="outline" func={createBusiness} size="sm" iconName="icon-plus">
            Create Business
          </Button>
        </Frame>
      </Frame>

      <Frame className="w-full h-max gap-[var(--space-md)] flex-col">
        <Frame className="w-full justify-end">
          <Dropdown formFunc={selectSummaryPeriod} name="summaryPeriod" width="max-content" size="xs" options={reportDuration}/>
        </Frame>
        {
          dashboardKpis ? 
          <KpiRow kpis={dashboardKpis} isLoading={false} itemsCount={4}/>: 
          <KpiRow kpis={dashboardKpis} isLoading={true} itemsCount={4}/>
        }
      </Frame>


      {/* Business Overview */}
      <Section>
        <Frame className="w-full items-center h-max justify-between">
          <Frame className="gap-[var(--space-sm)]">
            <Heading size="md" type="h2">
              My Businesses
            </Heading>
            <Badge color="accent" size="xs" text={String(filteredBusinesses.length )}/>
          </Frame>

          <Frame className="w-auto h-max gap-[var(--space-sm)]">
            <Dropdown
              formFunc={filterBusinesses}
              name="active filter"
              value={businessFilter}
              width="120px"
              size="sm"
              options={businessFilterArray}
            />
          </Frame>
        </Frame>

        <Frame ref={sliderRef} className="w-full h-max overflow-hidden flex gap-[var(--space-md)]">
          {
            businessesState.length > 0 ? (
              filteredBusinesses.map( (business, index) =>
                <BusinessOverviewCard data={business} index={index} health={businessHealth[business.id]} kpis={businessSummaryKpis[business.id]} key={business.id}/>
              )
            ) : (
              Array.from({ length: 3 }).map( (_, index) => ( <BusinessOverviewLoader key={index}/>))
            )
          }
        </Frame>

        <Frame className="justify-end gap-[var(--space-md)]">
          <Button func={scrollLeftHandler} variant="outline" size="xs" isIcon iconName="icon-left"/>
          <Button func={scrollRightHandler} variant="outline" size="xs" isIcon iconName="icon-right"/>
        </Frame>
      </Section>

      <ChartSection chartUrl="/api/dashboard/financialTrends" />

      {/* Performance Ranking */}
      <Section>
        <Frame className="w-full h-max justify-between mb-[var(--space-md)]">
          <Heading size="md" type="h2">
            Performance Ranking
          </Heading>

          <Frame className="w-auto h-max gap-[var(--space-sm)]">
            <Dropdown formFunc={selectRankingMetric} name="ranking" size="sm" options={rankingMetrics}/>

            <Dropdown
              formFunc={selectRankingPeriod}
              name="rankingDuration"
              size="sm"
              options={reportDuration}
            />
          </Frame>
        </Frame>

        <List specificStyles={{ overflow: "hidden"}}>
          {
            rankedBusinesses.slice(0,3).map(item => <MetricsRow key={item.id} data={item}/> )
          }
        </List>
      </Section>
    </Frame>
  )
}
