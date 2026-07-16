"use client"

import Frame from "../ui/primitives/frame"
import SmallBusinessOverview from "./cards/smallBusinessOverview"
import { useEffect } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"

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
    <Frame width="stretch" height="stretch" scroll="hidden" align="center" direction="column" gap="lg" className="pt-[var(--space-md)]">
        {businessesState.map(business => <SmallBusinessOverview business={business} key={business.id}/>)}
    </Frame>
  )
}
