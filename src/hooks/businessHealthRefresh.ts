"use client"

import {
  businessHealthPrefixQueryKey,
  businessKpisPrefixQueryKey,
  businessesHealthPrefixQueryKey,
} from "@/src/services/businessService"
import { QueryClient, useQueryClient } from "@tanstack/react-query"

/*
 * The health of a business is worked out from its records on every request rather
 * than stored: profitability, growth and stability read its transactions, while
 * operational reads how much of its tasks are completed. So a record changing is a
 * health change, and every mutation that writes one has to refetch it.
 *
 * The periods a screen caches are not known at the mutation site — the overview page
 * holds one query per period the user has looked at, and the dashboard holds one per
 * business — so the refresh goes through the shared prefixes rather than one key.
 *
 * Every screen that writes transactions or tasks refreshes through this, so a
 * transaction and a task move the score in exactly the same way.
 */
export const refreshBusinessHealthQueries = (queryClient: QueryClient, businessId: string) => {
  // The business' own report, on whichever period the screen is showing.
  queryClient.invalidateQueries({ queryKey: businessHealthPrefixQueryKey(businessId) })
  queryClient.invalidateQueries({ queryKey: businessKpisPrefixQueryKey(businessId) })

  // The dashboard and the business ranking read every business' health at once,
  // and both carry this business in their figures.
  queryClient.invalidateQueries({ queryKey: businessesHealthPrefixQueryKey() })
}

// The hook form of the refresh, for the components that already know which business
// they are working on. A form that only learns its business from the values it
// collected calls the function above with its own queryClient instead.
export default function useBusinessHealthRefresh(businessId: string) {
  const queryClient = useQueryClient()

  return () => refreshBusinessHealthQueries(queryClient, businessId)
}