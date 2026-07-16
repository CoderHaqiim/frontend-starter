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
import Image from 'next/image'
import Chart1 from '@/src/components/ui/charts/chart1'
import Dropdown from '@/src/components/ui/composites/dropdown'
import Tooltip from '@/src/components/ui/composites/tooltip'
import Icon from '@/src/components/ui/primitives/icon'
import Score from '@/src/components/ui/composites/score'

export default function BusinessPage() {
const [business, setBusiness] = useState<Business>({})
const {businessId} = useParams()
const reportDuration = ["This week", "This month", "This year"]
const chartOptions = ["Line chart", "Bar chart"]

useEffect(()=>{
  async function fetchBusiness(){
    const businessOne = await http<Business>(`/api/businesses/${businessId}`)
    setBusiness(businessOne)
  }

  fetchBusiness()
},[businessId])

const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value as "Line chart" | "Bar chart";
  setSelectedChart(selectedValue);
};

const health: HealthType | string | number = business?.health

const healthMap: Record<string,ColorTypes> = {
  "healthy": "success",
  "moderate": "warning",
  "critical": "error"
}

const healthBackground: ColorTypes= `${healthMap[health]}2` as ColorTypes
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  return (
    <Frame width="stretch" direction='column' gap="lg" height="stretch"> 
      <Frame width="stretch" rounded="sm" height="hug" justify='space-between'>
        <Frame direction='column'>
          <Frame align='center' height="hug" width="hug" gap="sm">
            <Heading size="xl" type="h1">{business?.name ?? "Business name"}</Heading>
            <Frame height="hug" width="hug" padding='sm' rounded='md' specificStyles={{
              backgroundColor: colors[healthBackground]
            }}>
              <Paragraph weight="medium" size='xs' color={healthMap[health] }>{business?.health}</Paragraph>
            </Frame>
          </Frame>
          <Paragraph size="sm">{business?.industry}</Paragraph>
        </Frame>
        <Frame gap='sm' height="hug" width="hug" className='relative'>
            <Button variant="fill" size="sm" iconName='icon-pencil'>Edit Business</Button>
            <Tooltip content="business settings">
              <Button variant="outline" isIcon size="sm" iconName='icon-settings'/>
            </Tooltip>
        </Frame>
      </Frame>
       <Frame width="stretch" height="100px" className="gap-[var(--space-md)]">
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
      <Frame width="stretch" direction="column" border padding="lg" height="hug" rounded="md" specificStyles={{
        backgroundColor: colors[healthBackground]
      }}>
        <Frame height="hug" width="stretch" align='center' gap='md' className='mb-[var(--space-lg)]'>
          <Icon name="icon-pulse" color={healthMap[health]} size="lg"/>
          <Heading type="h2" size='md'>
            Business Health
          </Heading>
        </Frame>
        <Frame>
          <Score score={business?.healthScore} color={healthMap[health]}/>
        </Frame>
      </Frame>
      <Frame width="stretch" direction="column" border padding="lg" height="hug" rounded="md">
        <Frame justify='space-between' className='mb-[var(--space-lg)]'>
          <Frame height="hug" align="center" width="stretch" gap='md'>
            <Icon name="icon-chart" size="lg"/>
            <Heading type="h2" size='md'>
              Chart
            </Heading>
            <Paragraph size='sm'>
              Expenses • Income • Net Result
            </Paragraph>
          </Frame>
          <Frame width="hug" height="hug" className="gap-[var(--space-sm)]">
            <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
            <Dropdown name="report" size="sm" options={reportDuration}/>
          </Frame>
        </Frame>
       <Chart1 variant={selectedChart}/>
      </Frame>
    </Frame>
  )
}

