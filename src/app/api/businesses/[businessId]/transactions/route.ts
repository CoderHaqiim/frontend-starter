import { businesses } from "@/src/data/businesses"
import { transactions } from "@/src/data/transactions"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const business = businesses.find((item) => item.id === businessId)

  if (!business) {
    return NextResponse.json(
      { message: "Business not found" },
      { status: 404 }
    )
  }

  const searchParams = new URL(request.url).searchParams
  const limit = Number(searchParams.get("limit") ?? 10)
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1)
  const businessTransactions = transactions.filter(
    (transaction) => transaction.businessId === businessId
  )

  const pageSize = Number.isInteger(limit) && limit > 0 ? limit : 10
  const start = (page - 1) * pageSize

  return NextResponse.json(businessTransactions.slice(start, start + pageSize))
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const business = businesses.find((item) => item.id === businessId)

  if (!business) {
    return NextResponse.json({ message: "Business not found" }, { status: 404 })
  }

  const body = await request.json()
  const now = new Date().toISOString()
  const transaction = {
    id: `trn-${Date.now()}`,
    businessId,
    customer: body.customer ?? "Walk-in customer",
    type: body.type,
    status: body.status ?? "pending",
    amount: Number(body.amount),
    description: body.description,
    category: body.category,
    date: body.date,
    createdAt: now,
    updatedAt: now,
  }

  transactions.unshift(transaction)
  return NextResponse.json(transaction, { status: 201 })
}