'use client'

import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Button from '@/src/components/ui/primitives/button'
import TransactionManager from '@/src/components/app/transactionManager'
import { http } from '@/src/http/client'
import { Transaction } from '@/src/types/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useBackdropState } from '@/src/store/backdropState'
import CreateTransactionForm from '@/src/components/app/forms/createTransaction'

export default function Item3() {
  const { businessId } = useParams<{ businessId: string }>()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const createTransaction = () => {
    setBackdropContent(<CreateTransactionForm businessId={businessId} />)
    setBackdropOpen(true)
  }

  useEffect(() => {
    http<Transaction[]>(`/api/businesses/${businessId}/transactions`)
      .then(setTransactions)
      .catch(() => setTransactions([]))
  }, [businessId])

  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Transactions</Heading>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
            func={createTransaction}
          >
            New Transaction
          </Button>
        </Frame>
      </Frame>

      <TransactionManager transactions={transactions} />
    </Frame>
  )
}