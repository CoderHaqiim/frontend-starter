import { NextResponse } from "next/server"
import { businesses } from "@/src/data/businesses"
import { transactions } from "@/src/data/transactions"

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

  const limit = Number(new URL(request.url).searchParams.get("limit"))
  const businessTransactions = transactions.filter(
    (transaction) => transaction.businessId === businessId
  )

  return NextResponse.json(
    Number.isInteger(limit) && limit > 0
      ? businessTransactions.slice(0, limit)
      : businessTransactions
  )
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
    type: body.type,
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