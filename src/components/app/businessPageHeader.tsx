"use client"

import BusinessSwitcher from "@/src/components/app/businessSwitcher"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname } from "next/navigation"

export default function BusinessPageHeader() {
  const { businessId } = useParams<{ businessId: string }>()
  const pathname = usePathname()

  const isBusinessRoute = pathname.startsWith("/dashboard/businesses/")
  // const isOverview = pathname.endsWith("/overview")
  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
    enabled: isBusinessRoute
  })

  const selectedBusiness = businesses.find((business) => business.id === businessId)

  if (!isBusinessRoute) return null

  return (
    <Frame className="w-full items-center gap-[var(--space-md)] border-b border-[var(--color-outline1)] py-[var(--space-sm)] px-[var(--space-lg)]">
      <Heading weight="medium" size="xxs" type="h1">
        {selectedBusiness?.businessName ?? "Business"}
      </Heading>
      <BusinessSwitcher activeBusinessId={businessId} />
    </Frame>
  )
}
