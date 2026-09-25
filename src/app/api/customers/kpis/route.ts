import { customers } from "@/src/data/customers"
import { getGeneralKpis } from "@/src/data/kpis"
import { NextResponse } from "next/server"

export async function GET() {
  const newCustomers = customers.filter(
    (customer) => customer.dateAdded >= "2026-06-01"
  ).length
  const watchlistCustomers = customers.filter(
    (customer) => customer.status === "Watchlist"
  ).length

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
        meaning: "Customers gained during this period",
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
        value: String(getGeneralKpis().financials.receivables.value),
        meaning: "Total amount owed to your business",
      },
    ],
    accessCards: customers.slice(0, 4),
  })
}
