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
import RadialProgress from '@/src/components/ui/composites/radialProgress'
import LinearProgress from '@/src/components/ui/composites/linearProgressBar'
import { stringToNumber } from '@/src/utils/numberStringCheck'

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

const scoreHealthMap = (score:number | string): string => {
  let health
  let newScore = stringToNumber(score)
  if(newScore < 50 ){
    health = "critical"
  }else if(newScore < 75){
    health = "moderate"
  }else{
    health = "healthy"
  }

  return health
}

const healthBackground: ColorTypes= `${healthMap[health]}2` as ColorTypes
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  return (
    <Frame width="stretch" direction='column' gap="lg" height="stretch"> 
      <Frame width="stretch" rounded="sm" height="hug" justify='space-between'>
        <Frame direction='column'>
          <Frame align='center' height="hug" width="hug" gap="sm">
            <Heading size="xl" type="h1" className='leading-[1]'>{business?.name ?? "Business name"}</Heading>
            <Frame height="hug" width="hug" padding='sm' rounded='md' specificStyles={{
              backgroundColor: colors[healthBackground]
            }}>
              <Paragraph weight="medium" size='xs' color={healthMap[health] }>{business?.health}</Paragraph>
            </Frame>
            <Tooltip content="add to favorite">
              <Button variant="ghost" iconColor='gold' iconFill='gold' isIcon size="md" iconName='icon-star' specificStyles={{
                backgroundColor:"transparent"
              }}/>
            </Tooltip>
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
          <Paragraph size="xs" color="textColor2" weight="normal">Transactions</Paragraph>
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
      <Frame gap="md" width="stretch" height="295px" className='shrink-0'>
        <Frame width="50%" direction="column" border padding="lg" height="stretch" rounded="md" specificStyles={{ backgroundColor: colors["white"] }}>
          <Frame direction='column' gap="xs" height="hug" width="stretch" className='mb-[var(--space-lg)]'>
            <Heading type="h2" size='md'>Business Health</Heading>
            <Paragraph weight="light" size='sm'>Score and Metrices</Paragraph>
          </Frame>
          <Frame gap='lg'>
            <Card justify="flex-start" padding="md" align='center' width="140px" height="200px" rounded="md" className=" gap-[var(--space-lg)] bg-[var(--color-background1)]">
              <Heading type="h3" size='xs'>Business score</Heading>
              <RadialProgress size={120} strokeWidth={8} score={business?.healthScore} color={healthMap[scoreHealthMap(business.healthScore)]}/>
            </Card>
            <Frame justify='space-between' gap="md" direction="column" height="200px" 
              className='flex-1 bg-[var(--color-white)]'>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md" 
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Financial</Heading>
                <LinearProgress height={5} textSize='sm' score={20} color={healthMap[scoreHealthMap(20)]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Growth</Heading>
                <LinearProgress height={5} textSize='sm' score={business?.healthScore} color={healthMap[health]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Stability</Heading>
                <LinearProgress height={5} textSize='sm' score={20} color={healthMap[health]}/>
              </Frame>
              <Frame direction="column" justify="space-between" padding="sm" align='flex-start' width="stretch" height="hug" rounded="md"
                className='bg-[var(--color-background1)]'>
                <Heading type="h3" size='xxs'>Operational</Heading>
                <LinearProgress height={5} textSize='sm' score={business?.healthScore} color={healthMap[health]}/>
              </Frame>
            </Frame>
          </Frame>
        </Frame>
        <Frame width="50%" direction="column" border padding="lg" height="stretch" rounded="md" specificStyles={{ backgroundColor: colors["white"] }}>
            <Frame direction='column' gap="xs" height="hug" width="stretch" className='mb-[var(--space-lg)]'>
              <Heading type="h2" size='md'>Business Insights</Heading>
          </Frame>
        </Frame>
      </Frame>

      <Frame width="stretch" direction="column" border padding="lg" height="hug" rounded="md" className='bg-[var(--color-white)]'>
        <Frame justify='space-between' className='mb-[var(--space-lg)]'>
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
      </Frame>

      <Frame>
        <Frame width="stretch" direction="column" border padding="lg" height="hug" rounded="md">
          <Frame height="hug" width="stretch" align='center' gap='md' className='mb-[var(--space-lg)]'>
            <Heading type="h2" size='md'>
              Actions
            </Heading>
          </Frame>
        </Frame>

      </Frame>
    </Frame>
  )
}

