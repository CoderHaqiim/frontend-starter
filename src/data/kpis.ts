import { businesses } from "@/src/data/businesses"
import { transactions } from "@/src/data/transactions"
import { BusinessKpiResponse, Duration, KpiDirection, KpiMetric } from "@/src/types/types"
import { DateRange, getPeriodWindows, isWithinRange } from "@/src/utils/dateRange"

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100

// Every figure a report carries is read from the transaction store. The one number a
// business is still seeded with is the naira cash it was holding before its first
// transaction was recorded, which is what turns a period's cash movements into a
// balance.
const seedOpeningCashBalance: Record<string, number> = {
  "0": 5000000,
  "1": 8700000,
  "2": 7600000,
  "3": 6200000,
  "4": 1200000,
}

type TransactionTotals = {
  revenue: number
  receivables: number
  expenses: number
  profit: number
  cashBalance: number
}

const emptyTotals: TransactionTotals = {
  revenue: 0,
  receivables: 0,
  expenses: 0,
  profit: 0,
  cashBalance: 0,
}

// Revenue is every income recorded in the window, receivables are the part of that
// income customers have not paid yet, expenses are everything the business paid out,
// profit is what is left of the revenue, and cash only moves for transactions that
// have actually settled. Cancelled transactions are left out of every figure.
const sumTransactions = (businessId: string, range?: DateRange): TransactionTotals => {
  const totals = transactions.reduce<TransactionTotals>(
    (runningTotals, transaction) => {
      if (transaction.businessId !== businessId || transaction.status === "cancelled") {
        return runningTotals
      }

      if (range && !isWithinRange(transaction.date, range)) return runningTotals

      if (transaction.type === "income") {
        runningTotals.revenue += transaction.amount

        if (transaction.status === "pending") runningTotals.receivables += transaction.amount
        if (transaction.status === "completed") runningTotals.cashBalance += transaction.amount
      } else {
        runningTotals.expenses += transaction.amount

        if (transaction.status === "completed") runningTotals.cashBalance -= transaction.amount
      }

      return runningTotals
    },
    { ...emptyTotals }
  )

  totals.profit = totals.revenue - totals.expenses

  return totals
}

const roundTotals = (totals: TransactionTotals): TransactionTotals => ({
  revenue: roundToTwoDecimals(totals.revenue),
  receivables: roundToTwoDecimals(totals.receivables),
  expenses: roundToTwoDecimals(totals.expenses),
  profit: roundToTwoDecimals(totals.profit),
  cashBalance: roundToTwoDecimals(totals.cashBalance),
})

// The all-time figures for a business, used where no period is being reported.
export const getBusinessTransactionTotals = (businessId: string) =>
  roundTotals(sumTransactions(businessId))

// The all-time figures for every business together, used where a report is not tied
// to a period. This is what the company wide customers report reads its receivables
// from, so both customers reports answer with the same definition of the money
// customers have not paid yet.
export const getGeneralTransactionTotals = () =>
  businesses.reduce<TransactionTotals>(
    (totals, business) => addTotals(totals, sumTransactions(business.id)),
    { ...emptyTotals }
  )

// What a business did during the window being reported, next to what it did during
// the window directly before it. The second set is what the reported change is
// derived from.
type PeriodTotals = {
  current: TransactionTotals
  previous: TransactionTotals
  cashBalance: number
  previousCashBalance: number
}

const getBusinessPeriodTotals = (businessId: string, period: Duration): PeriodTotals => {
  const { current, previous } = getPeriodWindows(period)
  const openingCashBalance = seedOpeningCashBalance[businessId] ?? 0

  return {
    current: sumTransactions(businessId, current),
    previous: sumTransactions(businessId, previous),
    // Cash is a balance rather than a period figure, so it is the opening cash plus
    // everything that had settled by the end of the window, and the balance it is
    // measured against is the same sum taken to the end of the window before it.
    cashBalance: openingCashBalance + sumTransactions(businessId, { end: current.end }).cashBalance,
    previousCashBalance:
      openingCashBalance + sumTransactions(businessId, { end: previous.end }).cashBalance,
  }
}

const addTotals = (first: TransactionTotals, second: TransactionTotals): TransactionTotals => {
  const revenue = first.revenue + second.revenue
  const expenses = first.expenses + second.expenses

  return {
    revenue,
    receivables: first.receivables + second.receivables,
    expenses,
    profit: revenue - expenses,
    cashBalance: first.cashBalance + second.cashBalance,
  }
}

// The change a figure reports is the real derivative: how far this window moved from
// the window before it, as a percentage of where it came from. A figure with nothing
// behind it yet is reported as fully new rather than as an infinite move.
const toKpiMetric = (value: number, previousValue: number): KpiMetric => {
  const direction: KpiDirection = value >= previousValue ? "up" : "down"

  if (previousValue <= 0) {
    return { value: roundToTwoDecimals(value), change: value > 0 ? 100 : 0, direction }
  }

  const change = ((value - previousValue) / previousValue) * 100

  return { value: roundToTwoDecimals(value), change: Math.abs(Math.round(change)), direction }
}

const toKpiResponse = (businessId: string, totals: PeriodTotals): BusinessKpiResponse => ({
  businessId,
  financials: {
    revenue: toKpiMetric(totals.current.revenue, totals.previous.revenue),
    receivables: toKpiMetric(totals.current.receivables, totals.previous.receivables),
    expenses: toKpiMetric(totals.current.expenses, totals.previous.expenses),
    profit: toKpiMetric(totals.current.profit, totals.previous.profit),
    cashBalance: toKpiMetric(totals.cashBalance, totals.previousCashBalance),
  },
})

export const getBusinessKpis = (businessId: string, period: Duration = "monthly") => {
  if (!businesses.some((business) => business.id === businessId)) return undefined

  return toKpiResponse(businessId, getBusinessPeriodTotals(businessId, period))
}

// The dashboard adds every business's window together and derives the change from
// those totals, so each figure is the movement of the whole portfolio for the period.
export const getGeneralKpis = (period: Duration = "monthly") => {
  const totals = businesses.reduce<PeriodTotals>(
    (runningTotals, business) => {
      const businessTotals = getBusinessPeriodTotals(business.id, period)

      return {
        current: addTotals(runningTotals.current, businessTotals.current),
        previous: addTotals(runningTotals.previous, businessTotals.previous),
        cashBalance: runningTotals.cashBalance + businessTotals.cashBalance,
        previousCashBalance:
          runningTotals.previousCashBalance + businessTotals.previousCashBalance,
      }
    },
    {
      current: { ...emptyTotals },
      previous: { ...emptyTotals },
      cashBalance: 0,
      previousCashBalance: 0,
    }
  )

  return toKpiResponse("all", totals)
}

export const generalKpis = getGeneralKpis("monthly")

