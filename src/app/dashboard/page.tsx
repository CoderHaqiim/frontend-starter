"use client"

import BusinessOverviewCard from "@/src/components/app/cards/businessOverviewCard"
import BusinessOverviewLoader from "@/src/components/app/cards/businessOverviewLoader"
import ChartSection from "@/src/components/app/chartSection"
import CreateBusinessForm from "@/src/components/app/forms/createBusiness"
import MetricsRow from "@/src/components/app/metricsRow"
import Section from "@/src/components/base/layout/section"
import Badge from "@/src/components/base/ui/composites/badge"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { dashboardRankingQueryKey, dashboardSummaryQueryKey, getDashboardRanking, getDashboardSummary } from "@/src/services/dashboardService"
import { getProfile, profileQueryKey } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { Duration, RankingMetric } from "@/src/types/types"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useRef, useState, useSyncExternalStore } from "react"

const emptySubscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function Home() {
  const reportDuration = ["weekly", "monthly", "annual"]
  const rankingMetrics: RankingMetric[] = ["profit",  "revenue"]
  const businessFilterArray = ["all", "healthy", "moderate", "critical"]
  const [rankSelector, setRankSelector] = useState<RankingMetric>("profit")
  const [businessFilter, setBusinessFilter] = useState("all")
  const [summaryPeriod, setSummaryPeriod] = useState<Duration>("weekly")
  const [rankingPeriod, setRankingPeriod] = useState<Duration>("weekly")
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  )
  const sliderRef = useRef<HTMLDivElement>(null)
  const { setBackdropContent,setBackdropOpen } = useBackdropState()

  const { data: profileData } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  const { data: dashboardSummary, isLoading: isDashboardSummaryLoading } = useQuery({
    queryKey: dashboardSummaryQueryKey(summaryPeriod),
    queryFn: () => getDashboardSummary(summaryPeriod),
  })

  const { data: dashboardRanking } = useQuery({
    queryKey: dashboardRankingQueryKey(rankingPeriod),
    queryFn: () => getDashboardRanking(rankingPeriod),
  })

  const businesses = dashboardSummary?.businesses ?? []
  const businessHealth = dashboardSummary?.businessHealth ?? {}
  const businessSummaryKpis = dashboardSummary?.businessSummaryKpis ?? {}
  const businessRankingKpis = dashboardRanking?.businessRankingKpis ?? {}

  const filteredBusinesses = useMemo(() => {
    if (businessFilter === "all") {
      return businesses
    }

    return businesses.filter(item => businessHealth[item.id]?.healthStatus === businessFilter)
  }, [businesses, businessFilter, businessHealth])

   //rank business
  const rankedBusinesses = useMemo(() => {
    return [...(dashboardRanking?.businesses ?? businesses)]
      .sort((a, b) => {
        const aFinancials = businessRankingKpis[a.id]?.financials
        const bFinancials = businessRankingKpis[b.id]?.financials

        return (bFinancials?.[rankSelector].value ?? 0) - (aFinancials?.[rankSelector].value ?? 0)
      })
      .map((business, index) => ({
        id: business.id,
        rank: index + 1,
        name: business.businessName,
        value: businessRankingKpis[business.id]?.financials[rankSelector].value ?? 0,
        metric: rankSelector
      }))
  }, [businesses, businessRankingKpis, dashboardRanking?.businesses, rankSelector])

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
      left: -327,
      behavior: "smooth",
    })
  }

  //Scroll business slider right
  const scrollRightHandler = () => {
    sliderRef.current?.scrollBy({
      left: 327,
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
             Welcome back, {isMounted ? profileData?.userName ?? "there" : "there"}
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

      <Section>
        <Frame className="w-full justify-end">
          <Dropdown formFunc={selectSummaryPeriod} name="summaryPeriod" width="max-content" size="xs" options={reportDuration}/>
        </Frame>
        {
          <KpiRow kpis={dashboardSummary?.dashboardKpis ?? null} isLoading={isDashboardSummaryLoading} itemsCount={4}/>
        }
      </Section>

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
            businesses.length > 0 ? (
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
