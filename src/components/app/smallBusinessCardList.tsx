"use client"

import Frame from "../ui/primitives/frame"
import SmallBusinessOverview from "./cards/smallBusinessOverview"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useEffect } from "react"
import { useState } from "react"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"


export default function SmallBusinessCardList() {
    const [businessesState, setBusinessesState] = useState<Businesses>([])
    const {selectedBusiness, setSelectedBusiness} = useSelectedBusiness()

    useEffect(()=>{
        const fetchBusinesses = async() => {
            const businesses = await http<Businesses>("/api/businesses", undefined, {method: "GET"})
            setBusinessesState(businesses)
            setSelectedBusiness(businesses[0])
        }

        fetchBusinesses()
    },[])

  return (
    <Frame width="stretch" height="stretch" scroll="hidden" align="center" direction="column" gap="lg" className="pt-[var(--space-md)]">
        {businessesState.map(business => <SmallBusinessOverview business={business} key={business.id}/>)}
    </Frame>
  )
}
