'use client'

import CreateTransactionForm from '@/src/components/app/forms/createTransaction'
import TransactionManager from '@/src/components/app/transactionManager'
import Section from '@/src/components/base/layout/section'
import KpiRow from '@/src/components/base/ui/composites/kpiRow'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'
import Paragraph from '@/src/components/base/ui/primitives/paragraph'
import { businessTransactionsQueryKey, getBusinessTransactions } from '@/src/services/transactionService'
import { useBackdropState } from '@/src/store/backdropState'
import { kpiObjectProps } from '@/src/types/types'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function Item3() {
  const { businessId } = useParams<{ businessId: string }>()
  const [page, setPage] = useState(1)
  const { data: transactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: businessTransactionsQueryKey(businessId, page),
    queryFn: () => getBusinessTransactions(businessId, page),
  })
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const createTransaction = () => {
    setBackdropContent(<CreateTransactionForm businessId={businessId} />)
    setBackdropOpen(true)
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0)
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0)
  const netProfit = totalIncome - totalExpenses
  const transactionKpis: kpiObjectProps[] = [
    { title: "Total Transactions", value: String(transactions.length) },
    { title: "Income", value: `$${totalIncome.toLocaleString()}` },
    { title: "Expenses", value: `$${totalExpenses.toLocaleString()}` },
    { title: "Net Profit", value: `$${netProfit.toLocaleString()}` },
  ]

  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Transactions</Heading>
          <Paragraph weight="light" size="sm">Track and manage all income and expenses for this business.</Paragraph>
        </Frame>

        <Frame>
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus" func={createTransaction}>
            Add Transaction
          </Button>
        </Frame>
      </Frame>

      <Section>
        <KpiRow kpis={transactionKpis} isLoading={isTransactionsLoading} itemsCount={4} />
      </Section>

      <TransactionManager
        transactions={transactions}
        currentPage={page}
        onPageChange={setPage}
      />
    </Frame>
  )
}
