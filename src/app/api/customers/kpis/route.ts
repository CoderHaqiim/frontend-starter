import { customers } from "@/src/data/customers"
import { getGeneralTransactionTotals } from "@/src/data/kpis"
import { Duration } from "@/src/types/types"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { PERIOD_DAYS, getPeriodWindows, isWithinRange } from "@/src/utils/dateRange"
import { NextResponse } from "next/server"

const reportPeriods = ["weekly", "monthly", "annual"]

// Every business in the mock trades in NGN, so the amounts are reported in naira.
const currencySymbol = getCurrencySymbol("NGN")

// The same four figures the business kpis route reports, added up over every
// business: the customers on the books, the ones gained during the reported period,
// the ones flagged for attention and the income they have not paid for yet.
export async function GET(request: Request) {
  const period = (new URL(request.url).searchParams.get("period") ?? "weekly") as Duration

  if (!reportPeriods.includes(period)) {
    return NextResponse.json(
      { message: "Invalid period. Use weekly, monthly, or annual." },
      { status: 400 }
    )
  }

  const { current } = getPeriodWindows(period)

  const newCustomers = customers.filter(
    (customer) => isWithinRange(customer.dateAdded, current)
  ).length

  const watchlistCustomers = customers.filter(
    (customer) => customer.status === "watchlist"
  ).length

  const { receivables } = getGeneralTransactionTotals()

  return NextResponse.json({
    kpis: [
      {
        id: 0,
        title: "Customers",
        value: String(customers.length),
        meaning: "Total number of customers",
      },
      {
        id: 1,
        title: "New Customers",
        value: String(newCustomers),
        meaning: `Customers gained in the last ${PERIOD_DAYS[period]} days`,
      },
      {
        id: 2,
        title: "Watchlist",
        value: String(watchlistCustomers),
        meaning: "Customers flagged for attention",
      },
      {
        id: 3,
        title: "Receivables",
        value: `${currencySymbol} ${receivables.toLocaleString()}`,
        meaning: "Total amount owed to your business",
      },
    ],
    accessCards: customers.slice(0, 4),
  })
}
