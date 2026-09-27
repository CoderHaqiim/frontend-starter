import { businessCustomers } from "@/src/data/customers"
import { getBusinessTransactionTotals } from "@/src/data/kpis"
import { Duration } from "@/src/types/types"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { PERIOD_DAYS, getPeriodWindows, isWithinRange } from "@/src/utils/dateRange"
import { NextResponse } from "next/server"

const reportPeriods = ["weekly", "monthly", "annual"]

// Every business in the mock trades in NGN, so the amounts are reported in naira.
const currencySymbol = getCurrencySymbol("NGN")

// Every value is read from the records themselves, the same way the transactions
// page builds its KPI row: the customers the business holds, the ones it gained
// during the reported period, the ones flagged for attention and the income they
// have not paid for yet.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const period = (new URL(request.url).searchParams.get("period") ?? "weekly") as Duration

  if (!reportPeriods.includes(period)) {
    return NextResponse.json(
      { message: "Invalid period. Use weekly, monthly, or annual." },
      { status: 400 }
    )
  }

  const customers = businessCustomers[businessId]

  if (!customers) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    )
  }

  const { current } = getPeriodWindows(period)

  const newCustomers = customers.filter(
    (customer) => isWithinRange(customer.dateAdded, current)
  ).length

  const watchlistCustomers = customers.filter(
    (customer) => customer.status === "watchlist"
  ).length

  const { receivables } = getBusinessTransactionTotals(businessId)

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
  })
}