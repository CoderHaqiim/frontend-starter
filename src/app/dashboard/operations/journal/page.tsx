import { redirect } from 'next/navigation'
import { journalEntries } from '@/src/utils/journalEntries'

export default function Item2() {
  redirect(`/dashboard/journal/${journalEntries[0].id}`)
}
