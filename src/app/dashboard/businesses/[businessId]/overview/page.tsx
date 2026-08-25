"use client"

import Button from '@/src/components/ui/primitives/button'
import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Paragraph from '@/src/components/ui/primitives/paragraph'
import { Business, HealthType } from '@/src/types/types'
import Card from '@/src/components/ui/composites/card'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { http } from '@/src/http/client'
import Chart1 from '@/src/components/ui/charts/chart1'
import Dropdown from '@/src/components/ui/composites/dropdown'
import Tooltip from '@/src/components/ui/composites/tooltip'
import RadialProgress from '@/src/components/ui/composites/radialProgress'
import LinearProgress from '@/src/components/ui/composites/linearProgressBar'
import { stringToNumber } from '@/src/utils/numberStringCheck'
import KpiCard from '@/src/components/app/cards/kpiCard'
import Section from '@/src/components/layout/section'
import List from '@/src/components/ui/composites/list'
import Transaction from '@/src/components/app/transaction'
import Insight from '@/src/components/app/insight'
import { scoreHealthMap } from '@/src/utils/scoreHealthMap'
import { healthMap } from '@/src/utils/healthMap'
import { fontWeight } from '@/src/app/design/typograhy'
import { space } from '@/src/app/design/spacing'
import { useTheme } from '@/src/components/app/themeProvider'
import KpiRow from '@/src/components/ui/composites/kpiRow'

const businessKpis = [
  {
    title: "Cash Balance",
    value: "$6500000100",
    trend: "up",
    meaning: "Amount of money the business currently has available to use."
  },
  {
    title: "Revenue",
    value: "$4,000",
    trend: "up",
    meaning: "Total money your business makes from selling products or services, before deducting expenses."
  },
  {
    title: "Expenses",
    value: "$500",
    trend: "down",
    meaning: "These are the costs and payments your business incurs to operate, produce or deliver its products/services, and keep the business running."
  },
  {
    title: "Net Profit",
    value: "$3,500",
    trend: "up",
    meaning: "This is the amount of money your business has left after subtracting all of its business expenses from the revenue it generated"
  },
  {
    title: "Net Profit Margin",
    value: "30%",
    trend: "up",
    meaning: "This measures the percentage of revenue that remains as profit after expenses are deducted."
  },
  {
    title: "Customers",
    value: "30",
    trend: "down",
    meaning: "This is the number of people your business currently serves."
  },
  {
    title: "Recievables",
    value: "$3,500",
    trend: "down",
    meaning: "This is the total amount of money that customers owe your business for products or services they have already received but have not yet paid for."
  },
  {
    title: "Cash flow",
    value: "$40,000",
    trend: "up",
    meaning: "Cash flow measures the movement of actual cash into and out of a business over a specific period."
  }
]

export default function BusinessPage() {
  const { colors } = useTheme()
  const [business, setBusiness] = useState<Business>({})
  const [kpisExpanded, setKpisExpanded] = useState(false)
  const { businessId } = useParams()
  const reportDuration = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]

  useEffect(() => {
    fetchBusiness()
  }, [businessId])

  async function fetchBusiness() {
    const businessOne = await http<Business>(`/api/businesses/${businessId}`)
    setBusiness(businessOne)
  }

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

  const health: HealthType | string | number = business?.health

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
                  {business?.state + ", " + business.country}
                </Paragraph>
              </Frame>
            </Frame>
          </Frame>

          {/* Actions */}
          <Frame className="gap-[var(--space-sm)] h-max w-auto relative">
            <Button variant="outline" size="sm" iconName='icon-pencil'>Edit Business</Button>
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

      {/* Business Health */}
      <Section width="stretch" height="stretch">
        <Frame className="justify-between gap-[var(--space-xs)] h-max w-full">
          <Frame className="w-full items-center gap-[var(--space-sm)]">
            <Heading type="h2" size='md'>Business Health</Heading>
            <Paragraph weight="light" size='xs'>Score and Metrices</Paragraph>
          </Frame>
          <Button variant="ghost" isIcon iconName="icon-info" />
        </Frame>

        <Frame className="gap-[var(--space-lg)]">
          <Card
            justify="flex-start"
            padding="lg"
            align='center'
            width="240px"
            height="240px"
            rounded="md"
            gap="xl"
            className="bg-[var(--color-background1)]"
          >
            <Heading type="h3" size='xs'>Business score</Heading>
            <RadialProgress
              size={140}
              strokeWidth={5}
              score={business?.healthScore}
              color={healthMap[scoreHealthMap(business.healthScore)]}
            />
          </Card>

          <Frame
            className="justify-between rounded-[var(--radius-md)] p-[var(--space-lg)] gap-[var(--space-sm)] flex-col h-[240px] flex-1 border-[1px] border-[var(--color-outline1)] bg-[var(--color-white)]"
          >
            {/* weight-40 */}
            <Frame className="flex-col justify-between p-[var(--space-sm)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xxs'>Profitability</Heading>
              <LinearProgress height={3} textSize='xxs' score={20} color={healthMap[scoreHealthMap(20)]} />
            </Frame>

            {/* weight-25 */}
            <Frame className="flex-col justify-between p-[var(--space-sm)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xxs'>Cash health</Heading>
              <LinearProgress height={3} textSize='xxs' score={20} color={healthMap[scoreHealthMap(20)]} />
            </Frame>

            {/* weight-15 */}
            <Frame className="flex-col justify-between p-[var(--space-sm)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xxs'>Growth</Heading>
              <LinearProgress height={3} textSize='xxs' score={business?.healthScore} color={healthMap[health]} />
            </Frame>

            {/* weight-10 */}
            <Frame className="flex-col justify-between p-[var(--space-sm)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xxs'>Stability</Heading>
              <LinearProgress height={3} textSize='xxs' score={20} color={healthMap[health]} />
            </Frame>

            {/* weight-10 */}
            <Frame className="flex-col justify-between p-[var(--space-sm)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xxs'>Operational</Heading>
              <LinearProgress height={3} textSize='xxs' score={business?.healthScore} color={healthMap[health]} />
            </Frame>
          </Frame>
        </Frame>
      </Section>

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
      <Section width="stretch">
        <Frame className="justify-between items-center mb-[var(--space-lg)]">
          <Frame className="h-max items-center w-full gap-[var(--space-lg)]">
            <Heading type="h2" size='md'> Chart </Heading>
            <Paragraph size='xs'> Expenses • Revenue • Net Profit </Paragraph>
          </Frame>
          <Frame className="w-auto h-max gap-[var(--space-sm)]">
            <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler} />
            <Dropdown name="report" size="sm" options={reportDuration} />
          </Frame>
        </Frame>
        <Chart1 variant={selectedChart} />
      </Section>
    </Frame>
  )
}