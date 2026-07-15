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

export default function BusinessPage() {
const [business, setBusiness] = useState<Business>({})
const {businessId} = useParams()

console.log(businessId)

useEffect(()=>{
  async function fetchBusiness(){
    const businessOne = await http<Business>(`/api/businesses/${businessId}`)
    console.log(businessOne)
    setBusiness(businessOne)
  }

  fetchBusiness()
},[businessId])

const health: HealthType | string = business?.health

const healthMap: Record<string,ColorTypes> = {
  "healthy": "success",
  "moderate": "warning",
  "critical": "error"
}

const healthBackground: ColorTypes= `${healthMap[health]}2` as ColorTypes

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
        <Button variant="fill" size="sm" iconName='icon-pencil'>Edit Business</Button>
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
    </Frame>
  )
}

