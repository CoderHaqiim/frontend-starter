import { businessCustomers } from "@/src/data/customers"
import { ObjectRecordType } from "@/src/types/types"
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
  toDisplayDate,
  todayIsoDate,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

// Stored choices are lowercase, so a typed value only has to match them
// case-insensitively to be accepted.
const customerTypes = ["individual", "company"]
const customerStatuses = ["active", "watchlist", "inactive"]

// Customers are stored per business as plain records, so a business that has none
// yet answers with an empty list instead of an error.
const getBusinessCustomers = (businessId: string) => {
  if (!businessCustomers[businessId]) {
    businessCustomers[businessId] = []
  }

  return businessCustomers[businessId]
}

const findCustomerIndex = (businessId: string, customerId: string) =>
  (businessCustomers[businessId] ?? []).findIndex((customer) => customer.id === customerId)

// Ids follow the seeded shape, e.g. business-0-customer-004.
const nextCustomerId = (businessId: string) => {
  const prefix = `business-${businessId}-customer-`
  const highestNumber = (businessCustomers[businessId] ?? []).reduce((highest, customer) => {
    const id = String(customer.id)

    if (!id.startsWith(prefix)) return highest

    const numericId = Number(id.slice(prefix.length))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `${prefix}${String(highestNumber + 1).padStart(3, "0")}`
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(businessCustomers[businessId] ?? [])
}

// Adds a customer to a business. The create form sends name, email, phone, type,
// companyName, country, stateRegion and city.
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

  const name = normalizeText(body.name)
  const email = normalizeText(body.email)
  const customerType = matchChoice(body.type ?? body.customerType, customerTypes)
  const status =
    body.status === undefined || body.status === ""
      ? "active"
      : matchChoice(body.status, customerStatuses)

  if (!name) {
    return badRequestResponse("name is required")
  }

  if (!customerType) {
    return badRequestResponse(`type must be one of ${customerTypes.join(", ")}`)
  }

  if (!status) {
    return badRequestResponse(`status must be one of ${customerStatuses.join(", ")}`)
  }

  const businessCustomerList = getBusinessCustomers(businessId)

  if (email) {
    const isEmailTaken = businessCustomerList.some(
      (customer) => String(customer.email).toLowerCase() === email.toLowerCase()
    )

    if (isEmailTaken) {
      return NextResponse.json(
        { message: `A customer with the email ${email} already exists for this business` },
        { status: 409 }
      )
    }
  }

  const createdCustomer: ObjectRecordType = {
    id: nextCustomerId(businessId),
    name,
    phone: normalizeText(body.phone),
    email,
    customerType,
    companyName: customerType === "company" ? normalizeText(body.companyName) : "",
    status,
    dateAdded: todayIsoDate(),
    city: normalizeText(body.city),
    stateRegion: normalizeText(body.stateRegion) || normalizeText(body.state),
    country: normalizeText(body.country),
    customerSince: normalizeText(body.customerSince) || normalizeText(toDisplayDate()),
  }

  businessCustomerList.push(createdCustomer)

  return NextResponse.json(
    {
      message: `Customer ${createdCustomer.id} created successfully`,
      data: createdCustomer,
    },
    { status: 201 }
  )
}

// Updates a customer for a business. The customer id is read from the
// `customerId` query parameter, so the customers stay on one route.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const customerId = readQueryParam(request, "customerId")

  if (!customerId) {
    return missingQueryParamResponse("customerId")
  }

  const customerIndex = findCustomerIndex(businessId, customerId)

  if (customerIndex === -1) {
    return recordNotFoundResponse("Customer", customerId)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const customer = businessCustomers[businessId][customerIndex]

  if (body.name !== undefined) {
    const name = normalizeText(body.name)

    if (!name) {
      return badRequestResponse("name cannot be empty")
    }

    customer.name = name
  }

  if (body.email !== undefined) {
    const email = normalizeText(body.email)
    const isEmailTaken = (businessCustomers[businessId] ?? []).some(
      (entry) =>
        entry.id !== customerId &&
        Boolean(email) &&
        String(entry.email).toLowerCase() === email
    )

    if (isEmailTaken) {
      return NextResponse.json(
        { message: `A customer with the email ${email} already exists for this business` },
        { status: 409 }
      )
    }

    customer.email = email
  }

  if (body.type !== undefined || body.customerType !== undefined) {
    const customerType = matchChoice(body.type ?? body.customerType, customerTypes)

    if (!customerType) {
      return badRequestResponse(`type must be one of ${customerTypes.join(", ")}`)
    }

    customer.customerType = customerType
  }

  if (body.status !== undefined) {
    const status = matchChoice(body.status, customerStatuses)

    if (!status) {
      return badRequestResponse(`status must be one of ${customerStatuses.join(", ")}`)
    }

    customer.status = status
  }

  const stringFields = ["phone", "companyName", "city", "country", "customerSince"]

  stringFields.forEach((field) => {
    if (body[field] !== undefined) {
      customer[field] = normalizeText(body[field])
    }
  })

  if (body.stateRegion !== undefined || body.state !== undefined) {
    customer.stateRegion = normalizeText(body.stateRegion) || normalizeText(body.state)
  }

  return NextResponse.json({
    message: `Customer ${customerId} updated successfully`,
    data: customer,
  })
}

// Removes a customer from a business. The customer id is read from the
// `customerId` query parameter.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const customerId = readQueryParam(request, "customerId")

  if (!customerId) {
    return missingQueryParamResponse("customerId")
  }

  const customerIndex = findCustomerIndex(businessId, customerId)

  if (customerIndex === -1) {
    return recordNotFoundResponse("Customer", customerId)
  }

  const [deletedCustomer] = businessCustomers[businessId].splice(customerIndex, 1)

  return NextResponse.json({
    message: `Customer ${customerId} deleted successfully`,
    data: deletedCustomer,
  })
}