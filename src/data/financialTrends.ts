import { transactions } from "@/src/data/transactions"
import { ChartPeriod, ChartPoint } from "@/src/types/types"
import { DateRange, dateDaysAgo, isWithinRange, toIsoDate } from "@/src/utils/dateRange"

/*
 * The Financial Performance chart, read from the transactions the app holds.
 *
 * A period is a window ending today, and the window is bucketed the way the
 * period is measured: a bucket per day for the weekly and monthly charts, a
 * bucket per month for the annual one. Only the buckets records fall into are
 * drawn, so every point is a day or a month the business actually traded in and
 * nothing is ever invented to fill the line. Cancelled transactions are left out
 * of every bucket, the same way the KPI reports read them.
 *
 * A window holding fewer than two buckets has nothing worth showing: one day or
 * one month on its own says nothing about how income, expenses and profit move
 * over the period, so the period answers with no points at all and the screen
 * reports that there is not enough data to display instead of drawing it.
 */

// The fewest buckets a period needs before it can be drawn.
export const MIN_CHART_POINTS = 2

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100

// How many days each period looks back over. The annual chart is bucketed by
// month rather than by day, so its window is opened from the month itself below.
const PERIOD_DAYS: Record<ChartPeriod, number> = {
  "7d": 7,
  "30d": 30,
  "12m": 365,
}

// The window a period reports on: the last seven or thirty days end to end, or
// the twelve months ending with the current one.
const periodWindow = (period: ChartPeriod, today = new Date()): DateRange => {
  if (period === "12m") {
    return {
      start: toIsoDate(new Date(today.getFullYear(), today.getMonth() - 11, 1)),
      end: toIsoDate(today),
    }
  }

  const days = PERIOD_DAYS[period]

  return {
    start: toIsoDate(dateDaysAgo(days - 1, today)),
    end: toIsoDate(today),
  }
}

// The bucket a transaction belongs to: its day, or its month for the annual
// chart, which is what the chart's axis labels are keyed by.
const bucketKeyFor = (period: ChartPeriod, date: string) =>
  period === "12m" ? date.slice(0, 7) : date

type BucketTotals = {
  income: number
  expenses: number
}

/*
 * The points for one period, for every business together or for a single one.
 * An empty array means the period holds too little to draw, which is the state
 * the chart shows as "not enough data yet".
 */
export function getFinancialTrends(period: ChartPeriod, businessId?: string): ChartPoint[] {
  const window = periodWindow(period)
  const buckets = new Map<string, BucketTotals>()

  transactions.forEach((transaction) => {
    if (businessId !== undefined && transaction.businessId !== businessId) return
    if (transaction.status === "cancelled") return
    if (!isWithinRange(transaction.date, window)) return

    const key = bucketKeyFor(period, transaction.date)
    const bucket = buckets.get(key) ?? { income: 0, expenses: 0 }

    if (transaction.type === "income") bucket.income += transaction.amount
    else bucket.expenses += transaction.amount

    buckets.set(key, bucket)
  })

  const points = [...buckets.entries()]
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
    .map(([date, bucket]) => ({
      date,
      income: roundToTwoDecimals(bucket.income),
      expenses: roundToTwoDecimals(bucket.expenses),
      profit: roundToTwoDecimals(bucket.income - bucket.expenses),
    }))

  return points.length >= MIN_CHART_POINTS ? points : []
}
