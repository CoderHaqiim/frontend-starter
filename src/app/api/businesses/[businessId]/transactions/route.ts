import { transactions } from "@/src/data/transactions"
import { Transaction } from "@/src/types/types"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
  matchChoice,
  missingQueryParamResponse,
  normalizeText,
  readBody,
  readQueryParam,
  recordNotFoundResponse,
  toNumber,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

const transactionTypes: Transaction["type"][] = ["income", "expense"]
const transactionStatuses: Transaction["status"][] = ["completed", "cancelled", "pending"]

// Lists a page of the transactions belonging to a business.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
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

// Creates a transaction for a business.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const description = normalizeText(body.description)
  const amount = toNumber(body.amount)
  const type = matchChoice(body.type, transactionTypes)
  const status =
    body.status === undefined || body.status === ""
      ? "pending"
      : matchChoice(body.status, transactionStatuses)

  if (!description) {
    return badRequestResponse("description is required")
  }

  if (!type) {
    return badRequestResponse(`type must be one of ${transactionTypes.join(", ")}`)
  }

  if (amount <= 0) {
    return badRequestResponse("amount must be greater than 0")
  }

  if (!status) {
    return badRequestResponse(`status must be one of ${transactionStatuses.join(", ")}`)
  }

  const now = new Date().toISOString()
  const transaction: Transaction = {
    id: `trn-${Date.now()}`,
    businessId,
    customer: normalizeText(body.customer) || "walk-in customer",
    type: type as Transaction["type"],
    status: status as Transaction["status"],
    amount,
    description,
    category: normalizeText(body.category) || "uncategorised",
    date: normalizeText(body.date) || now.slice(0, 10),
    createdAt: now,
    updatedAt: now,
  }

  transactions.unshift(transaction)

  return NextResponse.json(
    { message: `Transaction ${transaction.id} created successfully`, data: transaction },
    { status: 201 }
  )
}

// Updates a transaction for a business. The transaction id is read from the
// `transactionId` query parameter, so the transactions stay on one route.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const transactionId = readQueryParam(request, "transactionId")

  if (!transactionId) {
    return missingQueryParamResponse("transactionId")
  }

  const transaction = transactions.find(
    (item) => item.id === transactionId && item.businessId === businessId
  )

  if (!transaction) {
    return recordNotFoundResponse("Transaction", transactionId)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  if (body.description !== undefined) {
    const description = normalizeText(body.description)

    if (!description) {
      return badRequestResponse("description cannot be empty")
    }

    transaction.description = description
  }

  if (body.type !== undefined) {
    const type = matchChoice(body.type, transactionTypes)

    if (!type) {
      return badRequestResponse(`type must be one of ${transactionTypes.join(", ")}`)
    }

    transaction.type = type as Transaction["type"]
  }

  if (body.status !== undefined) {
    const status = matchChoice(body.status, transactionStatuses)

    if (!status) {
      return badRequestResponse(`status must be one of ${transactionStatuses.join(", ")}`)
    }

    transaction.status = status as Transaction["status"]
  }

  if (body.amount !== undefined) {
    const amount = toNumber(body.amount)

    if (amount <= 0) {
      return badRequestResponse("amount must be greater than 0")
    }

    transaction.amount = amount
  }

  if (body.customer !== undefined) {
    transaction.customer = normalizeText(body.customer) || "walk-in customer"
  }

  if (body.category !== undefined) {
    transaction.category = normalizeText(body.category)
  }

  if (body.date !== undefined) {
    transaction.date = normalizeText(body.date)
  }

  transaction.updatedAt = new Date().toISOString()

  return NextResponse.json({
    message: `Transaction ${transactionId} updated successfully`,
    data: transaction,
  })
}

// Removes a transaction for a business. The transaction id is read from the
// `transactionId` query parameter.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const transactionId = readQueryParam(request, "transactionId")

  if (!transactionId) {
    return missingQueryParamResponse("transactionId")
  }

  const transactionIndex = transactions.findIndex(
    (item) => item.id === transactionId && item.businessId === businessId
  )

  if (transactionIndex === -1) {
    return recordNotFoundResponse("Transaction", transactionId)
  }

  const [deletedTransaction] = transactions.splice(transactionIndex, 1)

  return NextResponse.json({
    message: `Transaction ${transactionId} deleted successfully`,
    data: deletedTransaction,
  })
}