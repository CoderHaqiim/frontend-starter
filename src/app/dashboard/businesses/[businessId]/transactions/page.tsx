'use client'

import CreateTransactionForm from '@/src/components/app/forms/createTransaction'
import ImportModal from '@/src/components/app/import/importModal'
import TransactionManager from '@/src/components/app/transactionManager'
import Section from '@/src/components/base/layout/section'
import KpiRow from '@/src/components/base/ui/composites/kpiRow'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'
import Paragraph from '@/src/components/base/ui/primitives/paragraph'
import { useAccountCurrencySymbol } from '@/src/hooks/accountCurrency'
import {
  businessTransactionsPrefixQueryKey,
  businessTransactionsQueryKey,
  deleteBusinessTransaction,
  getBusinessTransactions,
  recentBusinessTransactionsPrefixQueryKey,
  updateBusinessTransaction,
} from '@/src/services/transactionService'
import { useBackdropState } from '@/src/store/backdropState'
import { useShowToast } from '@/src/store/toastState'
import { kpiObjectProps, Transaction } from '@/src/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const showToast = useShowToast()
  const queryClient = useQueryClient()

  // The list, the recent transactions on the overview and the KPI cards all follow
  // a change to one of the transactions.
  const refreshTransactionViews = () => {
    queryClient.invalidateQueries({ queryKey: businessTransactionsPrefixQueryKey(businessId) })
    queryClient.invalidateQueries({ queryKey: recentBusinessTransactionsPrefixQueryKey(businessId) })
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteBusinessTransaction(businessId, transactionId)

      // The row leaves the cached page straight away, and every cached query is
      // refreshed so the list, the recent transactions and the KPI cards follow.
      queryClient.setQueryData<Transaction[]>(
        businessTransactionsQueryKey(businessId, page),
        (currentTransactions = []) =>
          currentTransactions.filter((transaction) => transaction.id !== transactionId)
      )
      refreshTransactionViews()

      showToast({
        variant: "success",
        title: "Transaction deleted",
        message: `Transaction ${transactionId} was deleted successfully.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The transaction could not be deleted. Please try again.",
      })
    }
  }

  // The type and the status both travel through the transactions route as a change
  // to the transaction, and the row wears the change as it is made so the menu
  // answers straight away. The list is read again either way, so it matches the
  // store when a save is refused.
  const handleChangeTransaction = async (
    transactionId: string,
    updates: Partial<Pick<Transaction, "status" | "type">>,
  ) => {
    queryClient.setQueryData<Transaction[]>(
      businessTransactionsQueryKey(businessId, page),
      (currentTransactions = []) =>
        currentTransactions.map((transaction) =>
          transaction.id === transactionId ? { ...transaction, ...updates } : transaction
        )
    )

    try {
      await updateBusinessTransaction(businessId, transactionId, updates)
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "The transaction could not be saved. Please try again.",
      })
    } finally {
      refreshTransactionViews()
    }
  }

  const createTransaction = () => {
    setBackdropContent(<CreateTransactionForm businessId={businessId} />)
    setBackdropOpen(true)
  }

  const importTransactions = () => {
    setBackdropContent(<ImportModal definitionId="transactions" businessId={businessId} />)
    setBackdropOpen(true)
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0)
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0)
  const netProfit = totalIncome - totalExpenses
  // Receivables are the income customers have not paid for yet, so only the pending
  // incomes count. Cancelled transactions never happened and are left out.
  const receivables = transactions
    .filter(
      (transaction) => transaction.type === "income" && transaction.status === "pending"
    )
    .reduce((total, transaction) => total + transaction.amount, 0)
  // The rows are reported in the account currency.
  const currencySymbol = useAccountCurrencySymbol()
  const transactionKpis: kpiObjectProps[] = [
    { title: "Total Transactions", value: String(transactions.length) },
    { title: "Income", value: `${currencySymbol} ${totalIncome.toLocaleString()}` },
    {
      title: "Receivables",
      value: `${currencySymbol} ${receivables.toLocaleString()}`,
      meaning: "Income in this list that customers have not paid for yet.",
    },
    { title: "Expenses", value: `${currencySymbol} ${totalExpenses.toLocaleString()}` },
    { title: "Net Profit", value: `${currencySymbol} ${netProfit.toLocaleString()}` },
  ]

  return (
    <Frame className="flex w-full flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Transactions</Heading>
            <Paragraph weight="light" size="sm">Track and manage all income and expenses for this business.</Paragraph>
          </Frame>

          <Frame className="gap-[var(--space-sm)]">
            <Button variant="outline" size="sm" iconName="icon-download" iconColor="accent" func={importTransactions}
              specificStyles={{
                color: "var(--color-accent)",
                borderColor: "var(--color-accent)",
              }}
            >
              Import Transactions
            </Button>
            <Button variant="fill" size="sm" iconPosition="left" iconName="icon-plus" func={createTransaction}>
              Add Transaction
            </Button>
          </Frame>
        </Frame>
      </Section>

      <Section>
        <KpiRow kpis={transactionKpis} isLoading={isTransactionsLoading} itemsCount={5} />
      </Section>

      <TransactionManager
        transactions={transactions}
        currentPage={page}
        onPageChange={setPage}
        onDelete={handleDeleteTransaction}
        onChangeStatus={(transactionId, status) => handleChangeTransaction(transactionId, { status })}
        onChangeType={(transactionId, type) => handleChangeTransaction(transactionId, { type })}
      />
    </Frame>
  )
}
