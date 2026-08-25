"use client"

import Frame from "../ui/primitives/frame"
import SmallBusinessOverview from "./cards/smallBusinessOverview"
import { useEffect } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import Heading from "../ui/primitives/heading"

export default function SmallBusinessCardList() {

    const {businessesState, setBusinessesState} = useBusinessesState()

     useEffect(()=>{
        const fetchBusinesses = async() => {
          const businesses = await http<Businesses>("/api/businesses", undefined, {method: "GET"})
          setBusinessesState(businesses)
        }
        
        fetchBusinesses()
      },[])

  return (
    <Frame scroll="hidden" className="relative gap-[var(--space-xl)] w-[200px] h-full items-center flex-col">
      <Frame className="w-full z-[100] sticky border-b-[1.5px] border-b-[var(--color-outline1)] top-0 pb-[var(--space-md)]">
        <Heading type="h3" size="sm">Select business</Heading>
      </Frame>
      {businessesState.map(business => <SmallBusinessOverview business={business} key={business.id}/>)}
    </Frame>
  )
}
