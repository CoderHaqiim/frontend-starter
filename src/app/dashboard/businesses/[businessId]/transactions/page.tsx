'use client'

import CreateTransactionForm from '@/src/components/app/forms/createTransaction'
import ImportModal from '@/src/components/app/import/importModal'
import TransactionManager from '@/src/components/app/transactionManager'
import Section from '@/src/components/base/layout/section'
import Dropdown from '@/src/components/base/ui/composites/dropdown'
import KpiRow from '@/src/components/base/ui/composites/kpiRow'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'
import Paragraph from '@/src/components/base/ui/primitives/paragraph'
import { useAccountCurrencySymbol } from '@/src/hooks/accountCurrency'
import useBusinessHealthRefresh from '@/src/hooks/businessHealthRefresh'
import {
  businessTransactionKpisQueryKey,
  businessTransactionsPrefixQueryKey,
  businessTransactionsQueryKey,
  getBusinessTransactionKpis,
  getBusinessTransactions,
  recentBusinessTransactionsPrefixQueryKey,
  updateBusinessTransaction,
} from '@/src/services/transactionService'
import { useBackdropState } from '@/src/store/backdropState'
import { useShowToast } from '@/src/store/toastState'
import { kpiObjectProps, Transaction, TransactionPeriod } from '@/src/types/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function Item3() {
  const { businessId } = useParams<{ businessId: string }>()
  const [page, setPage] = useState(1)
  // The list reads this many rows at a time. The KPI row and the page buttons
  // both work from the whole period, so neither moves with the page being viewed.
  const pageSize = 10
  // The list and the KPI row both read the period selected: weekly, monthly,
  // annual, or everything the business has recorded.
  const [period, setPeriod] = useState<TransactionPeriod>("alltime")
  const periodOptions: { label: string; value: TransactionPeriod }[] = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Annual", value: "annual" },
    { label: "All time", value: "alltime" },
  ]
  // Changing the period starts the list again at its first page, so the page
  // being viewed always belongs to the period selected.
  const periodChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as TransactionPeriod)
    setPage(1)
  }
  const { data: transactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: businessTransactionsQueryKey(businessId, page, pageSize, period),
    queryFn: () => getBusinessTransactions(businessId, page, pageSize, period),
  })

  // The KPI row is read from the server, which reports the whole period rather
  // than the page of records being viewed.
  const { data: transactionKpiSummary, isLoading: isKpiSummaryLoading } = useQuery({
    queryKey: businessTransactionKpisQueryKey(businessId, period),
    queryFn: () => getBusinessTransactionKpis(businessId, period),
  })

  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()
  const refreshBusinessHealth = useBusinessHealthRefresh(businessId)

  // The list, the recent transactions on the overview and the KPI cards all follow
  // a change to one of the transactions. The health score follows it too: it is
  // worked out from these records, so a transaction that is added or changed moves
  // the score.
  const refreshTransactionViews = () => {
    queryClient.invalidateQueries({ queryKey: businessTransactionsPrefixQueryKey(businessId) })
    queryClient.invalidateQueries({ queryKey: recentBusinessTransactionsPrefixQueryKey(businessId) })
    refreshBusinessHealth()
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
      businessTransactionsQueryKey(businessId, page, pageSize, period),
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

  // The KPI row reports the whole period rather than the page being viewed: the
  // count is every transaction in the period, and the money follows the
  // rules the rest of the reports use, so cancelled transactions never happened
  // and are left out of it.
  const {
    total = 0,
    income = 0,
    expenses = 0,
    netProfit = 0,
    receivables = 0,
  } = transactionKpiSummary ?? {}
  // The pages the list really holds, which is what the page buttons draw from.
  const totalPages = Math.max(Math.ceil(total / pageSize), 1)
  // The rows are reported in the account currency.
  const currencySymbol = useAccountCurrencySymbol()
  const transactionKpis: kpiObjectProps[] = [
    {
      title: "Total Transactions",
      value: String(total),
      meaning: "Transactions recorded in the selected period, across every page.",
    },
    { title: "Income", value: `${currencySymbol} ${income.toLocaleString()}` },
    {
      title: "Receivables",
      value: `${currencySymbol} ${receivables.toLocaleString()}`,
      meaning: "Income customers have not paid for yet.",
    },
    { title: "Expenses", value: `${currencySymbol} ${expenses.toLocaleString()}` },
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
        <Frame className="w-full justify-end">
          <Dropdown
            name="period"
            width="max-content"
            size="xs"
            menuAlign="right"
            prefix="Period:"
            options={periodOptions}
            value={period}
            formFunc={periodChangeHandler}
          />
        </Frame>
        <KpiRow kpis={transactionKpis} isLoading={isTransactionsLoading || isKpiSummaryLoading} itemsCount={5} />
      </Section>

      <TransactionManager
        transactions={transactions}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onChangeStatus={(transactionId, status) => handleChangeTransaction(transactionId, { status })}
        onChangeType={(transactionId, type) => handleChangeTransaction(transactionId, { type })}
      />
    </Frame>
  )
}
