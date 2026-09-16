"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useQuery } from "@tanstack/react-query"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import SmallBusinessOverview from "./cards/smallBusinessOverview"

export default function SmallBusinessCardList() {

    const { data: businesses = [] } = useQuery({
      queryKey: businessesQueryKey,
      queryFn: getBusinesses,
    })

  return (
    <Frame scroll="hidden" className="relative gap-[var(--space-xl)] w-[200px] h-full items-center flex-col">
      <Frame className="w-full z-[100] sticky border-b-[1.5px] border-b-[var(--color-outline1)] top-0 pb-[var(--space-md)]">
        <Heading type="h3" size="sm">Select business</Heading>
      </Frame>
      {businesses.map(business => <SmallBusinessOverview business={business} key={business.id}/>)}
    </Frame>
  )
}
