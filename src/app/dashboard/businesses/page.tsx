import React from 'react'
import { http } from '@/src/http/client'
import { redirect } from 'next/navigation'
import { Business, Businesses} from '@/src/types/types'

const businesses = await http<Businesses>("/api/businesses", undefined, {method: "GET"})

const firstBusinessId = businesses[0].id

export default function BusinessesPage() {
  redirect(`/dashboard/businesses/${firstBusinessId}`)
}
