import { account } from "@/src/data/account"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { NextResponse } from "next/server"

// The figures the whole portfolio is read on. The amounts are kept as numbers so the
// route reports them in the account currency, the way the pages that build their
// cards from the same figures do.
const dashboardFigures = [
  {
    title: "Total Revenue",
    amount: 4000,
    trend: "up",
    meaning: "Total money your business makes from selling products or services, before deducting expenses.",
  },
  {
    title: "Total Expenses",
    amount: 500,
    trend: "down",
    meaning: "Total money your business makes from selling products or services, before deducting expenses.",
  },
  {
    title: "Net Profit",
    amount: 3500,
    trend: "up",
    meaning: "Total money your business makes from selling products or services, before deducting expenses.",
  },
  {
    title: "Cash Balance",
    amount: 35000,
    trend: "up",
    meaning: "Total money your business makes from selling products or services, before deducting expenses.",
  },
]

export async function GET() {
  // The figures are reported in the account currency.
  const currencySymbol = getCurrencySymbol(account.currency)

  return NextResponse.json(
    dashboardFigures.map(({ amount, ...figure }) => ({
      ...figure,
      value: `${currencySymbol}${amount.toLocaleString()}`,
    })),
  )
}
