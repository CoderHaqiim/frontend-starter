export const dynamic = "force-dynamic";

import { http } from '@/src/http/client'
import { redirect } from 'next/navigation'
import { Business, Businesses} from '@/src/types/types'

const fetchBusinesses = async () => {
  const businesses = await http<Businesses>("/api/businesses", undefined, { method: "GET" })
  const firstBusinessId = businesses[0].id
  return firstBusinessId
}

export default async function BusinessesPage() {
  const firstBusinessId = await fetchBusinesses()
  redirect(`/dashboard/performance/businesses/${firstBusinessId}`)
}