"use client"

import Button from '@/src/components/ui/primitives/button'
import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Paragraph from '@/src/components/ui/primitives/paragraph'
import { Business, HealthType } from '@/src/types/types'
import { ColorTypes } from '@/src/app/design/colors'
import { colors } from '@/src/app/design/colors'
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

const dashboardKpis = [
    {
      title: "Transactions",
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

export default function BusinessPage() {
  const [business, setBusiness] = useState<Business>({})
  const {businessId} = useParams()
  const reportDuration = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]

useEffect(()=>{
  fetchBusiness()
},[businessId])

async function fetchBusiness(){
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
    <Frame width="stretch" direction='column' gap="lg" height="hug"> 
      <Frame width="stretch" rounded="sm" height="hug" justify='space-between'>
         {/* Business Info */}
        <Frame direction='column'>
          <Frame align='center' height="hug" width="hug" gap="sm">
            <Heading size="xl" type="h1" className='leading-[1]'>{business?.name ?? "Business name"}</Heading>
            <Tooltip content="add to favorite">
              <Button variant="ghost" iconColor='gold' iconFill='gold' isIcon size="md" iconName='icon-star' specificStyles={{
                height:"max-content",
                width: "max-content"
              }}/>
            </Tooltip>
          </Frame>
          <Paragraph weight="light" size="sm">
            {business?.industry}
          </Paragraph>
        </Frame>

        {/* Actions */}
        <Frame gap='sm' height="hug" width="hug" className='relative'>
            <Button variant="fill" size="sm" iconName='icon-pencil'>Edit Business</Button>
            <Tooltip content="business settings">
              <Button variant="outline" isIcon size="sm" iconName='icon-settings'/>
            </Tooltip>
        </Frame>
      </Frame>

      {/* KPIS */}
       <Frame width="stretch" className="gap-[var(--space-md)]">
        {
          dashboardKpis.map((item, index) => <KpiCard key={index} title={item.title} value={item.value}/>)
        }
      </Frame>

      <Frame gap="md" width="stretch" height="295px" className='shrink-0'>
        {/* Business Health */}
        <Section width="50%" height="stretch">
          <Frame direction='column' gap="xs" height="hug" width="stretch" className='mb-[var(--space-lg)]'>
            <Frame>
              <Heading type="h2" size='md'>Business Health</Heading>
            </Frame>
            <Paragraph weight="light" size='sm'>Score and Metrices</Paragraph>
          </Frame>
          <Frame gap='lg'>
            <Card justify="flex-start" padding="lg" align='center' width="160px" height="200px" rounded="md" className=" gap-[var(--space-lg)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xs'>Business score</Heading>
              <RadialProgress size={120} strokeWidth={5} score={business?.healthScore} color={healthMap[scoreHealthMap(business.healthScore)]}/>
            </Card>
            <Frame justify='space-between' gap="md" direction="column" height="200px" 
              className='flex-1 bg-[var(--color-white)]'>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md" 
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Financial</Heading>
                <LinearProgress height={3} textSize='sm' score={20} color={healthMap[scoreHealthMap(20)]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Growth</Heading>
                <LinearProgress height={3} textSize='sm' score={business?.healthScore} color={healthMap[health]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Stability</Heading>
                <LinearProgress height={3} textSize='sm' score={20} color={healthMap[health]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Operational</Heading>
                <LinearProgress height={3} textSize='sm' score={business?.healthScore} color={healthMap[health]}/>
              </Frame>
            </Frame>
          </Frame>
        </Section>
       
       {/* Business Insights */}
        <Section width="50%" height="stretch">
          <Frame direction='column' gap="xs" height="hug" width="stretch" className='mb-[var(--space-lg)]'>
            <Frame width="stretch" className='mb-[var(--space-lg)]'>
              <Heading type="h2" size='md'>Business Insights</Heading>
            </Frame>
            <List width="stretch" height="220px" scroll="hidden">
              <Insight text="Profit increased by 12%"/>
              <Insight text="Profit increased by 12%"/>
              <Insight text="Profit increased by 12% and bla bla bal"/>
              <Insight text="Profit increased by 12% and bla bla bal"/>
              <Insight text="Profit increased by 12% and bla bla bal"/>
              <Insight text="Profit increased by 12% and bla bla bal"/>
              <Insight text="Profit increased by 12% and bla bla bal"/>
            </List>
          </Frame>
        </Section>
      </Frame>

      {/* Chart */}
      <Section width="stretch">
        <Frame justify='space-between' align='center' className='mb-[var(--space-lg)]'>
          <Frame height="hug" align="center" width="stretch" gap='lg' >
            <Heading type="h2" size='md'> Chart </Heading>
            <Paragraph size='xs'> Expenses • Income • Net Result </Paragraph>
          </Frame>
          <Frame width="hug" height="hug" className="gap-[var(--space-sm)]">
            <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
            <Dropdown name="report" size="sm" options={reportDuration}/>
          </Frame>
        </Frame>
        <Chart1 variant={selectedChart}/>
      </Section>
      {/* <Section width="stretch" height="stretch">
        <Frame height="hug" direction='column' width="stretch" gap='md' className='mb-[var(--space-lg)]'>
          <Frame className='mb-[var(--space-lg)]'>
            <Heading type="h2" size='md'>
              Business Activities
            </Heading>
          </Frame>
           <List width="stretch" height="hug">
            <Frame>Name</Frame>
            <Frame>Name</Frame>
            <Frame>Name</Frame>
            <Frame>Name</Frame>
          </List>
        </Frame>
      </Section> */}
      <Section width="stretch" height="stretch">
        <Frame direction="column" height="hug" width="stretch" gap='md' className='mb-[var(--space-lg)]'>
          <Frame height="hug" width="stretch" className='mb-[var(--space-lg)]'>
            <Heading type="h2" size='md'>
              Transactions
            </Heading>
          </Frame>
          <List scroll='hidden' width="stretch" height="200px">
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
          </List>
        </Frame>
      </Section>
    </Frame>
  )
}

