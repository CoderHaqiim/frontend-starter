export const dynamic = "force-dynamic";

import { getBusinesses } from '@/src/services/businessService'
import { redirect } from 'next/navigation'

const fetchBusinesses = async () => {
  const businesses = await getBusinesses()
  const firstBusinessId = businesses[0].id
  return firstBusinessId
}

export default async function BusinessesPage() {
  const firstBusinessId = await fetchBusinesses()
  redirect(`/dashboard/businesses/${firstBusinessId}/overview`)
}
