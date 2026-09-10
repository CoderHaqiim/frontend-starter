"use client"

import BusinessSwitcher from "@/src/components/app/businessSwitcher"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { http } from "@/src/http/client"
import { Businesses } from "@/src/types/types"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function BusinessPageHeader() {
  const { businessId } = useParams<{ businessId: string }>()
  const pathname = usePathname()
  const [businesses, setBusinesses] = useState<Businesses>([])

  const isBusinessRoute = pathname.startsWith("/dashboard/businesses/")
  const isOverview = pathname.endsWith("/overview")

  useEffect(() => {
    if (!isBusinessRoute || isOverview) return

    let isMounted = true

    http<Businesses>("/api/businesses", undefined, { method: "GET" })
      .then((businesses) => {
        if (isMounted) setBusinesses(businesses)
      })
      .catch(() => {
        if (isMounted) setBusinesses([])
      })

    return () => {
      isMounted = false
    }
  }, [isBusinessRoute, isOverview])

  const selectedBusiness = businesses.find((business) => business.id === businessId)

  if (!isBusinessRoute || isOverview) return null

  return (
    <Frame className="w-full items-center gap-[var(--space-md)] border-b border-[var(--color-outline1)] py-[var(--space-sm)] px-[var(--space-lg)]">
      <Heading weight="medium" size="xxs" type="h1">
        {selectedBusiness?.name ?? "Business"}
      </Heading>
      <BusinessSwitcher businesses={businesses} activeBusinessId={businessId} />
    </Frame>
  )
}