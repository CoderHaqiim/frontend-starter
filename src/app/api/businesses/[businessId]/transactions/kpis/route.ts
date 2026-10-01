import { getBusinessTransactionTotals } from "@/src/data/kpis"
import { transactions } from "@/src/data/transactions"
import { BusinessTransactionKpis, TransactionPeriod } from "@/src/types/types"
import { TRANSACTION_PERIODS, getReportWindow, isWithinRange } from "@/src/utils/dateRange"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

/*
 * The KPI row above the transactions list, read from every transaction the
 * business holds in the period asked for rather than the page of records being
 * viewed: the count is the whole period, and the money follows the rules the
 * rest of the reports use, so cancelled transactions never happened and are
 * left out of it. All time reads everything the business holds.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const period = (new URL(request.url).searchParams.get("period") ?? "alltime") as TransactionPeriod

  if (!TRANSACTION_PERIODS.includes(period)) {
    return badRequestResponse("Invalid period. Use weekly, monthly, annual, or alltime.")
  }

  const range = getReportWindow(period)
  const { revenue, receivables, expenses, profit } = getBusinessTransactionTotals(
    businessId,
    range
  )

  const kpis: BusinessTransactionKpis = {
    total: transactions.filter(
      (transaction) =>
        transaction.businessId === businessId && isWithinRange(transaction.date, range)
    ).length,
    income: revenue,
    expenses,
    netProfit: profit,
    receivables,
  }

  return NextResponse.json(kpis)
}
