"use client"

import { getProfile, profileQueryKey } from "@/src/services/profileService"
import { defaultCurrency, getCurrencySymbol } from "@/src/utils/currencySymbol"
import { useQuery } from "@tanstack/react-query"

/*
 * The currency the account keeps its money in, so every amount the app shows is
 * reported in it. The settings page saves it through the profile route, and the
 * forms that record money in a currency of their own — the invoice and receipt
 * drafts — still pick the one they are saved in.
 *
 * The account currency is read from the profile the app already caches, and until
 * that answers the code the mock seeds the account with is used.
 */
export default function useAccountCurrency() {
  const { data: profile } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  return profile?.currency || defaultCurrency
}

// The symbol for the account currency, which is what every amount the app shows
// is prefixed with.
export function useAccountCurrencySymbol() {
  return getCurrencySymbol(useAccountCurrency())
}

