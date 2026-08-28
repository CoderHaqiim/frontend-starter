"use client"

import Button from '@/src/components/ui/primitives/button'
import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Paragraph from '@/src/components/ui/primitives/paragraph'
import { Business, BusinessHealth, BusinessKpiResponse, Duration, kpiObjectProps } from '@/src/types/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { http } from '@/src/http/client'
import Chart1 from '@/src/components/ui/charts/chart1'
import Dropdown from '@/src/components/ui/composites/dropdown'
import Section from '@/src/components/layout/section'
import List from '@/src/components/ui/composites/list'
import Insight from '@/src/components/app/insight'
import { fontWeight } from '@/src/app/design/typograhy'
import { space } from '@/src/app/design/spacing'
import { useTheme } from '@/src/components/providers/themeProvider'
import KpiRow from '@/src/components/ui/composites/kpiRow'
import abridgeNumber from '@/src/utils/abridgeNumber'
import { kpiResponseToCards } from '@/src/utils/kpiResponseToCards'
import { useBackdropState } from '@/src/store/backdropState'
import Tooltip from '@/src/components/ui/composites/tooltip'
import { getCurrencySymbol } from '@/src/utils/currencySymbol'
import useExtendedChart from '@/src/hooks/extendChart'
import ChartSection from '@/src/components/app/chartSection'

export default function BusinessPage() {
  const { colors } = useTheme()
  const [summaryPeriod, setSummaryPeriod] = useState<Duration>("weekly")
  const [business, setBusiness] = useState<Business | null>(null)
  const [businessKpisResponse, setBusinessKpisResponse] = useState<BusinessKpiResponse | null>(null)
  const [kpisExpanded, setKpisExpanded] = useState(false)
  const { businessId } = useParams()
  const reportDuration = ["weekly", "monthly", "annual"]
  const chartOptions = ["Line chart", "Bar chart"]
  const {openChart} = useExtendedChart()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  useEffect(() => {
    async function fetchBusiness() {
      const [business, health, kpis] = await Promise.all([
        http<Business>(`/api/businesses/${businessId}`),
        http<BusinessHealth>(`/api/businesses/${businessId}/health?period=${summaryPeriod}`),
        http<BusinessKpiResponse>(`/api/businesses/${businessId}/kpis?period=${summaryPeriod}`),
      ])

      setBusiness({
        ...business,
        health: health.health,
        healthScore: health.healthScore,
      })
      setBusinessKpisResponse(kpis)
    }

    fetchBusiness()
  }, [businessId, summaryPeriod])

   // Change duration
  const reportChangeHandler = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Duration

    setSummaryPeriod(value)
  }

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

  const editBusiness = () => {
    setBackdropOpen(true)
    setBackdropContent("edit-business-form")
  }

  const financials = businessKpisResponse?.financials
  const currency = business?.currency ?? "NGN"
  const currencySymbol = getCurrencySymbol(currency)
  const formatAmount = (amount = 0) => `${currencySymbol} ${abridgeNumber(amount)}`
  const profitMargin = financials?.revenue.value ? Math.round((financials.netProfit.value / financials.revenue.value) * 100) : 0
  
  const businessKpis: kpiObjectProps[] = [...kpiResponseToCards(businessKpisResponse, currency),
    {
      title: "Net Profit Margin",
      value: `${profitMargin}%`,
      trend: profitMargin >= 20 ? "up" : "down",
      meaning: "This measures the percentage of revenue that remains as profit after expenses are deducted."
    },
    {
      title: "Customers",
      value: String(business?.customers ?? 0),
      trend: "up",
      meaning: "This is the number of people your business currently serves."
    },
    {
      title: "Recievables",
      value: formatAmount((financials?.revenue.value ?? 0) * 0.18),
      trend: "down",
      meaning: "This is the total amount of money that customers owe your business for products or services they have already received but have not yet paid for."
    },
    {
      title: "Cash flow",
      value: formatAmount((financials?.revenue.value ?? 0) - (financials?.expenses.value ?? 0)),
      trend: financials && financials.revenue.value >= financials.expenses.value ? "up" : "down",
      meaning: "Cash flow measures the movement of actual cash into and out of a business over a specific period."
    }
  ]

  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")

  return (
    <Frame className="w-full flex-col gap-[var(--space-lg)] h-max">
      <Frame className="w-full flex-col z-[45] bg-[var(--color-background1)]">
        <Frame className="w-full rounded-[var(--radius-sm)] h-max justify-between">
          {/* Business Info */}
          <Frame className="gap-[var(--space-lg)]">
            <Frame className="w-[45px] justify-center items-center h-[45px] border rounded-[var(--radius-sm)] text-[white] bg-[green]">
              a
            </Frame>
            <Frame className="flex-col">
              <Frame className="items-center h-max w-auto gap-[var(--space-sm)]">
                <Heading size="xl" type="h1">{business?.name ?? "Business name"}</Heading>
              </Frame>
              <Frame className="gap-[var(--space-xs)] items-center">
                <Paragraph weight="light" size="sm">
                  {business?.industry}
                </Paragraph>
                <span>•</span>
                <Paragraph weight="light" size="xxs">
                  est {business?.established}
                </Paragraph>
                <span>•</span>
                <Paragraph weight="light" size="xxs">
                  {business ? `${business.state}, ${business.country}` : ""}
                </Paragraph>
              </Frame>
            </Frame>
          </Frame>

          {/* Actions */}
          <Frame className="gap-[var(--space-sm)] h-max w-auto relative">
            <Button variant="outline" size="sm" iconName='icon-pencil' func={editBusiness}>Edit Business</Button>
          </Frame>
        </Frame>
      </Frame>

      {/* KPIS */}
      <Frame
        className={`w-full gap-[var(--space-sm)] h-max flex-col ${kpisExpanded ? "border bg-[var(--color-background2)] border-[var(--color-outline1)] rounded-[var(--radius-md)] p-[var(--space-lg)]" : "bg-[transparent]"}`}
        specificStyles={{
          overflow: "hidden",
          transition: "max-height 300ms ease, transform 250ms ease",
          transform: kpisExpanded ? "scale(1)" : "scale(0.995)",
        }}
      >
        <Frame className="w-full justify-end">
          <Dropdown formFunc={reportChangeHandler} name="summaryPeriod" width="max-content" size="xs" options={reportDuration}/>
        </Frame>
        <KpiRow isLoading={false} kpis={businessKpis.slice(0, 4)} itemsCount={4} />
        {kpisExpanded && (
          <KpiRow isLoading={false} kpis={businessKpis.slice(4)} itemsCount={4}/>
        )}
        <Frame className="w-full justify-center">
          <Button
            variant="ghost"
            size="xxs"
            func={() => setKpisExpanded((prev) => !prev)}
            specificStyles={{
              color: colors["accent"],
              backgroundColor: "transparent",
              fontWeight: fontWeight["semiBold"],
              marginBottom: space["xs"]
            }}
          >
            {kpisExpanded ? 'See less KPIs' : 'See more KPIs'}
          </Button>
        </Frame>
      </Frame>

      {/* Business Insights */}
      <Section width="stretch" height="stretch">
        <Frame className="flex-col gap-[var(--space-xs)] h-max w-full">
          <Frame className="w-full mb-[var(--space-lg)]">
            <Heading type="h2" size='md'>Business Insights</Heading>
          </Frame>
          <List width="stretch" height="220px" scroll="hidden">
            <Insight text="Profit increased by 12%" />
            <Insight text="Profit increased by 12%" />
            <Insight text="Profit increased by 12% and bla bla bal" />
            <Insight text="Profit increased by 12% and bla bla bal" />
            <Insight text="Profit increased by 12% and bla bla bal" />
            <Insight text="Profit increased by 12% and bla bla bal" />
            <Insight text="Profit increased by 12% and bla bla bal" />
          </List>
        </Frame>
      </Section>

      {/* Chart */}
      <ChartSection chartUrl="/api/dashboard/financialTrends" />
    </Frame>
  )
}
