"use client"

import { shadow3 } from '@/src/app/design/shadows'
import { space } from '@/src/app/design/spacing'
import { fontWeight } from '@/src/app/design/typograhy'
import BusinessSwitcher from '@/src/components/app/businessSwitcher'
import ChartSection from '@/src/components/app/chartSection'
import EditLogo from '@/src/components/app/forms/editLogo'
import HealthProgressMetric from '@/src/components/app/healthProgressMetric'
import TransactionItem from '@/src/components/app/transactionItem'
import Section from '@/src/components/base/layout/section'
import Card from '@/src/components/base/ui/composites/card'
import Dropdown from '@/src/components/base/ui/composites/dropdown'
import KpiRow from '@/src/components/base/ui/composites/kpiRow'
import List from '@/src/components/base/ui/composites/list'
import RadialProgress from '@/src/components/base/ui/composites/radialProgress'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'
import Icon from '@/src/components/base/ui/primitives/icon'
import Paragraph from '@/src/components/base/ui/primitives/paragraph'
import { useTheme } from '@/src/components/providers/themeProvider'
import { businessHealthQueryKey, businessKpisQueryKey, businessQueryKey, getBusiness, getBusinessHealth, getBusinessKpis } from '@/src/services/businessService'
import { getRecentBusinessTransactions, recentBusinessTransactionsQueryKey } from '@/src/services/transactionService'
import { useBackdropState } from '@/src/store/backdropState'
import { Business, Duration, kpiObjectProps } from '@/src/types/types'
import abridgeNumber from '@/src/utils/abridgeNumber'
import { businessHealthMetrics } from '@/src/utils/businessHealthMetrics'
import { getCurrencySymbol } from '@/src/utils/currencySymbol'
import { healthMap } from '@/src/utils/healthMap'
import { kpiResponseToCards } from '@/src/utils/kpiResponseToCards'
import { shortenText } from '@/src/utils/shortenText'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function BusinessPage() {
  const { colors } = useTheme()
  const [summaryPeriod, setSummaryPeriod] = useState<Duration>("weekly")
  const [kpisExpanded, setKpisExpanded] = useState(false)
  const { businessId } = useParams<{ businessId: string }>()
  const reportDuration = ["weekly", "monthly", "annual"]
  const queryClient = useQueryClient()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()



  //Fetches
  const { data: businessResponse} = useQuery({
    queryKey: businessQueryKey(businessId),
    queryFn: () => getBusiness(businessId),
  })

  const { data: businessHealthResponse } = useQuery({
    queryKey: businessHealthQueryKey(businessId, summaryPeriod),
    queryFn: () => getBusinessHealth(businessId, summaryPeriod),
  })

  const { data: businessKpisResponse = null } = useQuery({
    queryKey: businessKpisQueryKey(businessId, summaryPeriod),
    queryFn: () => getBusinessKpis(businessId, summaryPeriod),
  })

  const { data: transactions = [] } = useQuery({
    queryKey: recentBusinessTransactionsQueryKey(businessId),
    queryFn: () => getRecentBusinessTransactions(businessId),
  })


  
  const business = 
    businessResponse && businessHealthResponse? 
    {
      ...businessResponse,
      health: businessHealthResponse.healthStatus,
      healthScore: businessHealthResponse.healthScore,
    } : 
    businessResponse


   // Change duration
  const reportChangeHandler = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Duration

    setSummaryPeriod(value)
  }

  const editBusiness = () => {
    setBackdropOpen(true)
    setBackdropContent("edit-business-form")
  }

  const editLogo = () => {
    setBackdropOpen(true)
    setBackdropContent(
      <EditLogo businessId={String(businessId)}
        onSaved={(updatedBusiness) =>
          queryClient.setQueryData<Business>(businessQueryKey(businessId), (currentBusiness) => ({
            ...currentBusiness,
            ...updatedBusiness,
          }))
        }
      />
    )
  }

  const financials = businessKpisResponse?.financials

  const currency = "NGN"
  const currencySymbol = getCurrencySymbol(currency)
  const formatAmount = (amount = 0) => `${currencySymbol} ${abridgeNumber(amount)}`
  const profitMargin = financials?.revenue.value ? Math.round((financials.profit.value / financials.revenue.value) * 100) : 0
  const businessHealth = business?.health ?? "healthy"
  const businessHealthScore = business?.healthScore ?? 0
  
  const businessKpis: kpiObjectProps[] = [
    ...kpiResponseToCards(businessKpisResponse, currency),
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

  const isBusinessDataLoading = !business || !businessKpisResponse

  return (
    <Frame className="w-full flex-col gap-[var(--space-lg)] h-max">
      <Frame className="w-full flex-col z-[45] bg-[var(--color-background1)]">
        <Frame className="w-full rounded-[var(--radius-sm)] h-max justify-between">
          {/* Business Info */}
          <Frame className="gap-[var(--space-lg)]">
            <Frame className="w-[50px] justify-center items-center h-[50px] border rounded-[var(--radius-sm)] text-[white] bg-[green]">
              {
                business?.logo ? (
                <img src={business.logo} alt={`${business.businessName} logo`} className="h-full w-full rounded-[var(--radius-sm)] object-cover"/>
              ) : (
                business?.businessName?.trim().charAt(0).toUpperCase() || "B"
              )}
              <Frame specificStyles={{ position: "absolute", right: "-6px", bottom: "-6px" }}>
                <button
                  type="button"
                  aria-label="Edit business"
                  onClick={editLogo}
                  className={`${shadow3} flex h-[20px] w-[20px] items-center justify-center rounded-[50%] border-[0.5px] border-[var(--color-outline2)] bg-[var(--color-white)]`}
                >
                  <Icon size="xxs" stroke='2' name='icon-pencil'/>
                </button>
              </Frame>
            </Frame>

            <Frame className="flex-col gap-[var(--space-xxs)]">
              <Frame className="items-center h-max w-auto gap-[var(--space-md)]">
                <Heading size="xl" type="h1">
                  { shortenText(business?.businessName?? "", 30) ?? "Business name" }
                </Heading>
                <BusinessSwitcher activeBusinessId={String(businessId)} />
              </Frame>
              <Frame className="gap-[var(--space-xs)] items-center">
                <Paragraph weight="light" size="sm">
                  {business?.industry}
                </Paragraph>
                <span>•</span>
                <Paragraph weight="light" size="xxs">
                  est {businessResponse?.establishedYear}
                </Paragraph>
                <span>•</span>
                <Paragraph weight="light" size="xxs">
                  {business ? `${business.state}, ${business.country}` : ""}
                </Paragraph>
              </Frame>
            </Frame>
          </Frame>

          {/* Actions */}
          <Frame className="gap-[var(--space-sm)] h-max w-max shrink-0 relative">
            <Button variant="outline" size="sm" width="max-content" iconName='icon-pencil' func={editBusiness}>Edit Business</Button>
          </Frame>
        </Frame>
      </Frame>

      {/* KPIS */}
      <Section
        className={`w-full gap-[var(--space-sm)] h-max flex-col`}
        specificStyles={{
          overflow: "hidden",
          transition: "max-height 300ms ease, transform 250ms ease",
          transform: kpisExpanded ? "scale(1)" : "scale(0.995)",
        }}
      >
        <Frame className=' flex-col gap-[var(--space-md)]'>
          <Frame className="w-full justify-end">
            <Dropdown formFunc={reportChangeHandler} name="summaryPeriod" width="max-content" size="xs" options={reportDuration}/>
          </Frame>
          <KpiRow isLoading={isBusinessDataLoading} kpis={businessKpis.slice(0, 4)} itemsCount={4} />
          {kpisExpanded && (
            <KpiRow isLoading={isBusinessDataLoading} kpis={businessKpis.slice(4)} itemsCount={4}/>
          )}
        </Frame>
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
      </Section>


      {/* Business Health */}
      <Section width="stretch" height="stretch">
        <Frame className="justify-between gap-[var(--space-xs)] h-max w-full">
          <Frame className="w-full items-center gap-[var(--space-sm)]">
            <Heading type="h2" size='md'>Business Health</Heading>
            <span>•</span>
            <Paragraph weight="light" size='xs'>Score and Metrics</Paragraph>
          </Frame>
        </Frame>

        <Frame className="gap-[var(--space-md)] h-[250px]">
          <Card gap="lg" padding="lg" width="max-content" height="100%" rounded="md" className="bg-[var(--color-background1)]">
            <Heading type="h3" size='xs'>Business score</Heading>
            <RadialProgress size={180} strokeWidth={4} score={businessHealthScore} color={healthMap[businessHealth]}/>
          </Card>

          <Frame className=" justify-between rounded-[var(--radius-md)] p-[var(--space-lg)] flex-col h-full flex-1 border-[1px] border-[var(--color-outline1)] bg-[var(--color-white)]">
            {
              businessHealthMetrics.map((item, index)=> (
                <HealthProgressMetric
                  item={{ ...item, value: businessHealthResponse?.metrics[item.key] ?? 0 }}
                  key={index}
                />
              ))
            }
          </Frame>
        </Frame>
      </Section>

       {/* Chart */}
      <ChartSection chartUrl="/api/dashboard/financialTrends" />

      {/* Business Insights
      <Section width="stretch" height="stretch">
        <Frame className="flex-col gap-[var(--space-md)] h-max w-full">
          <Frame className="w-full">
            <Heading type="h2" size='md'>Business Insights</Heading>
          </Frame>
          <List width="stretch" height="220px" scroll="hidden">
            <Insight text="Profit increased by 12%" />
            <Insight text="Profit increased by 12%" />
            <Insight text="Profit increased by 12% and bla bla bal" />
            <Insight text="Profit increased by 12% and bla bla bal" />
          </List>
        </Frame>
      </Section> */}

      <Section>
          <Frame className="justify-between gap-[var(--space-xs)] h-max w-full">
            <Frame className="w-full items-center gap-[var(--space-sm)]">
              <Heading type="h2" size='md'>Recent Transactions</Heading>
            </Frame>
          </Frame>
          <Frame>
            {transactions.length > 0 ? (
              <List width="stretch" height="stretch" scroll="hidden">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction}/>
                ))}
              </List>
            ) : (
              <Frame className="w-full h-full jusityf-center items-center ">
                <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex">
                  When you create transactions, they appear here.
                </Paragraph>
              </Frame>
            )}
          </Frame>
      </Section>

    </Frame>
  )
}
