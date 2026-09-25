import { Invoice, invoices } from "@/src/data/invoices"
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
  roundAmount,
  sumLineItems,
  toDisplayAmount,
  toDisplayDate,
  toNumber,
  toText,
  todayIsoDate,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

const invoicePaymentStatuses: Invoice["customer"]["paymentStatus"][] = ["overdue", "paid", "pending"]

// Ids continue the numbering the store is seeded with, e.g. INV-004.
const nextInvoiceId = () => {
  const highestNumber = invoices.reduce((highest, invoice) => {
    const numericId = Number(invoice.id.replace(/\D/g, ""))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `INV-${String(highestNumber + 1).padStart(3, "0")}`
}

const readCustomer = (value: unknown) =>
  typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {}

// Derives the totals from the line items and the discount and vat rates the form
// sends, so a stored invoice always agrees with its items.
const buildTotals = (
  items: ReturnType<typeof normalizeLineItems>,
  discount: number,
  vat: number
) => {
  const subtotal = sumLineItems(items)
  const discountAmount = subtotal * (discount / 100)
  const vatAmount = (subtotal - discountAmount) * (vat / 100)

  return { subtotal, total: roundAmount(subtotal - discountAmount + vatAmount) }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(
    invoices.filter((invoice) => invoice.businessId === businessId)
  )
}
// Creates an invoice for a business. The body matches what the create invoice form
// sends, and every money figure is derived from the line items.
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
    return badRequestResponse("At least one invoice item is required")
  }

  const currency = normalizeText(body.currency) || "usd"
  const discount = toNumber(body.discount)
  const vat = toNumber(body.vat)
  const paymentStatus =
    body.paymentStatus === undefined || body.paymentStatus === ""
      ? "pending"
      : matchChoice(body.paymentStatus, invoicePaymentStatuses)

  if (!paymentStatus) {
    return badRequestResponse(
      `paymentStatus must be one of ${invoicePaymentStatuses.join(", ")}`
    )
  }

  const { subtotal, total } = buildTotals(items, discount, vat)
  const amount = toDisplayAmount(currency, total)
  const customer = readCustomer(body.customer)
  const issueDate = normalizeText(body.issueDate) || todayIsoDate()

  const invoice: Invoice = {
    businessId,
    id: nextInvoiceId(),
    template: normalizeText(body.template) || "invoice-1",
    currency,
    issueDate,
    dueDate: normalizeText(body.dueDate) || issueDate,
    customer: {
      id: toText(customer.id) || `business-${businessId}-customer-000`,
      name: normalizeText(customer.name) || "walk-in customer",
      email: normalizeText(customer.email),
      address: normalizeText(customer.address),
      dateSent: normalizeText(toDisplayDate()),
      amount,
      paymentStatus: paymentStatus as Invoice["customer"]["paymentStatus"],
    },
    items,
    subtotal,
    discount,
    vat,
    total,
    amount,
  }

  invoices.unshift(invoice)

  return NextResponse.json(
    { message: `Invoice ${invoice.id} created successfully`, data: invoice },
    { status: 201 }
  )
}

// Updates an invoice for a business. The invoice id is read from the `invoiceId`
// query parameter. Sending items, discount or vat recalculates every money figure.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const invoiceId = readQueryParam(request, "invoiceId")

  if (!invoiceId) {
    return missingQueryParamResponse("invoiceId")
  }

  const invoice = invoices.find(
    (item) => item.id === invoiceId && item.businessId === businessId
  )

  if (!invoice) {
    return recordNotFoundResponse("Invoice", invoiceId)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  if (body.template !== undefined) {
    invoice.template = normalizeText(body.template) || invoice.template
  }

  if (body.currency !== undefined) {
    invoice.currency = normalizeText(body.currency) || invoice.currency
  }

  if (body.issueDate !== undefined) {
    invoice.issueDate = normalizeText(body.issueDate) || invoice.issueDate
  }

  if (body.dueDate !== undefined) {
    invoice.dueDate = normalizeText(body.dueDate) || invoice.dueDate
  }

  if (body.customer !== undefined) {
    const customer = readCustomer(body.customer)

    invoice.customer.name = normalizeText(customer.name) || invoice.customer.name
    invoice.customer.email = normalizeText(customer.email)
    invoice.customer.address = normalizeText(customer.address)
  }

  if (body.paymentStatus !== undefined) {
    const paymentStatus = matchChoice(body.paymentStatus, invoicePaymentStatuses)

    if (!paymentStatus) {
      return badRequestResponse(
        `paymentStatus must be one of ${invoicePaymentStatuses.join(", ")}`
      )
    }

    invoice.customer.paymentStatus = paymentStatus as Invoice["customer"]["paymentStatus"]
  }

  const items = body.items !== undefined ? normalizeLineItems(body.items) : invoice.items

  if (body.items !== undefined && items.length === 0) {
    return badRequestResponse("At least one invoice item is required")
  }

  const discount = body.discount !== undefined ? toNumber(body.discount) : invoice.discount
  const vat = body.vat !== undefined ? toNumber(body.vat) : invoice.vat
  const { subtotal, total } = buildTotals(items, discount, vat)
  const amount = toDisplayAmount(invoice.currency, total)

  invoice.items = items
  invoice.subtotal = subtotal
  invoice.discount = discount
  invoice.vat = vat
  invoice.total = total
  invoice.amount = amount
  invoice.customer.amount = amount

  return NextResponse.json({
    message: `Invoice ${invoiceId} updated successfully`,
    data: invoice,
  })
}

// Removes an invoice for a business. The invoice id is read from the `invoiceId`
// query parameter. Deleting mutates the shared in-memory invoice store, so the
// list and KPI routes reflect the deletion on their next fetch.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const invoiceId = readQueryParam(request, "invoiceId")

  if (!invoiceId) {
    return missingQueryParamResponse("invoiceId")
  }

  const invoiceIndex = invoices.findIndex(
    (invoice) => invoice.id === invoiceId && invoice.businessId === businessId
  )

  if (invoiceIndex === -1) {
    return recordNotFoundResponse("Invoice", invoiceId)
  }

  const [deletedInvoice] = invoices.splice(invoiceIndex, 1)

  return NextResponse.json({
    message: `Invoice ${invoiceId} deleted successfully`,
    data: deletedInvoice,
  })
}
