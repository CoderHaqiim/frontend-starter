"use client"

import Frame from "../ui/primitives/frame"
import SmallBusinessOverview from "./cards/smallBusinessOverview"
import { useBusinessesState } from "@/src/store/businessesState"

export default function SmallBusinessCardList() {
    const {businessesState} = useBusinessesState()

  return (
    <Frame width="stretch" height="stretch" scroll="hidden" align="center" direction="column" gap="lg" className="pt-[var(--space-lg)]">
        {businessesState.map(business => <SmallBusinessOverview business={business} key={business.id}/>)}
    </Frame>
  )
}
