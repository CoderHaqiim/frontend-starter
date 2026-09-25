import { Receipt, receipts } from "@/src/data/receipts"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
  matchChoice,
  missingQueryParamResponse,
  normalizeLineItems,
  normalizeText,
  readBody,
  readQueryParam,
  recordNotFoundResponse,
  sumLineItems,
  toDisplayAmount,
  toDisplayDate,
  toText,
  todayIsoDate,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

const receiptPaymentStatuses = ["overdue", "paid", "pending"]

// Ids continue the numbering the store is seeded with, e.g. RCP-004.
const nextReceiptId = () => {
  const highestNumber = receipts.reduce((highest, receipt) => {
    const numericId = Number(receipt.id.replace(/\D/g, ""))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `RCP-${String(highestNumber + 1).padStart(3, "0")}`
}

const readCustomer = (value: unknown) =>
  typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(
    receipts.filter((receipt) => receipt.businessId === businessId)
  )
}

// Creates a receipt for a business. The body matches what the create receipt form
// sends, and the totals are derived from the line items.
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

  const items = normalizeLineItems(body.items)

  if (items.length === 0) {
    return badRequestResponse("At least one receipt item is required")
  }

  const paymentStatus = matchChoice(body.paymentStatus, receiptPaymentStatuses)

  if (body.paymentStatus !== undefined && body.paymentStatus !== "" && !paymentStatus) {
    return badRequestResponse(
      `paymentStatus must be one of ${receiptPaymentStatuses.join(", ")}`
    )
  }

  const currency = normalizeText(body.currency) || "usd"
  const subtotal = sumLineItems(items)
  const amount = toDisplayAmount(currency, subtotal)
  const customer = readCustomer(body.customer)

  const receipt: Receipt = {
    businessId,
    id: nextReceiptId(),
    template: normalizeText(body.template) || "receipt-1",
    currency,
    paymentDate: normalizeText(body.paymentDate) || todayIsoDate(),
    customer: {
      id: toText(customer.id) || `business-${businessId}-customer-000`,
      name: normalizeText(customer.name) || "walk-in customer",
      email: normalizeText(customer.email),
      dateSent: normalizeText(toDisplayDate()),
      amount,
      paymentStatus: paymentStatus
        ? (paymentStatus as Receipt["customer"]["paymentStatus"])
        : undefined,
    },
    items,
    subtotal,
    total: subtotal,
    amount,
  }

  receipts.unshift(receipt)

  return NextResponse.json(
    { message: `Receipt ${receipt.id} created successfully`, data: receipt },
    { status: 201 }
  )
}

// Updates a receipt for a business. The receipt id is read from the `receiptId`
// query parameter. Sending items recalculates every money figure.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const receiptId = readQueryParam(request, "receiptId")

  if (!receiptId) {
    return missingQueryParamResponse("receiptId")
  }

  const receipt = receipts.find(
    (item) => item.id === receiptId && item.businessId === businessId
  )

  if (!receipt) {
    return recordNotFoundResponse("Receipt", receiptId)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  if (body.template !== undefined) {
    receipt.template = normalizeText(body.template) || receipt.template
  }

  if (body.currency !== undefined) {
    receipt.currency = normalizeText(body.currency) || receipt.currency
  }

  if (body.paymentDate !== undefined) {
    receipt.paymentDate = normalizeText(body.paymentDate) || receipt.paymentDate
  }

  if (body.customer !== undefined) {
    const customer = readCustomer(body.customer)

    receipt.customer.name = normalizeText(customer.name) || receipt.customer.name
    receipt.customer.email = normalizeText(customer.email)
  }

  if (body.paymentStatus !== undefined) {
    const paymentStatus = matchChoice(body.paymentStatus, receiptPaymentStatuses)

    if (body.paymentStatus !== "" && !paymentStatus) {
      return badRequestResponse(
        `paymentStatus must be one of ${receiptPaymentStatuses.join(", ")}`
      )
    }

    receipt.customer.paymentStatus = paymentStatus
      ? (paymentStatus as Receipt["customer"]["paymentStatus"])
      : undefined
  }

  const items = body.items !== undefined ? normalizeLineItems(body.items) : receipt.items

  if (body.items !== undefined && items.length === 0) {
    return badRequestResponse("At least one receipt item is required")
  }

  const subtotal = sumLineItems(items)
  const amount = toDisplayAmount(receipt.currency, subtotal)

  receipt.items = items
  receipt.subtotal = subtotal
  receipt.total = subtotal
  receipt.amount = amount
  receipt.customer.amount = amount

  return NextResponse.json({
    message: `Receipt ${receiptId} updated successfully`,
    data: receipt,
  })
}

// Removes a receipt for a business. The receipt id is read from the `receiptId`
// query parameter. Deleting mutates the shared in-memory receipt store, so the
// list and KPI routes reflect the deletion on their next fetch.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const receiptId = readQueryParam(request, "receiptId")

  if (!receiptId) {
    return missingQueryParamResponse("receiptId")
  }

  const receiptIndex = receipts.findIndex(
    (receipt) => receipt.id === receiptId && receipt.businessId === businessId
  )

  if (receiptIndex === -1) {
    return recordNotFoundResponse("Receipt", receiptId)
  }

  const [deletedReceipt] = receipts.splice(receiptIndex, 1)

  return NextResponse.json({
    message: `Receipt ${receiptId} deleted successfully`,
    data: deletedReceipt,
  })
}
