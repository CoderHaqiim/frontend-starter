import { businesses } from "@/src/data/businesses"
import { Business } from "@/src/types/types"
import { exampleBankNames, generateAccountNumber } from "@/src/utils/bankInformation"
import { registerBusinessHealth } from "@/src/utils/businessHealthResponse"
import { normalizeText } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(businesses)
}

// The profile fields the create business form sends. Anything else in the body is
// ignored, so the server keeps ownership of the id, the customer count and the
// health figures.
const profileFields = [
  "businessName",
  "tagLine",
  "description",
  "email",
  "phone",
  "address",
  "website",
  "industry",
  "country",
  "state",
] as const

// Ids continue the numbering the store is seeded with, so the business pages can
// keep using the id in their urls.
const nextBusinessId = () =>
  String(businesses.reduce((highest, business) => Math.max(highest, Number(business.id) || 0), -1) + 1)

// Creates a business in the in-memory store. The business is registered with
// zeroed KPIs and a flat health record, because the dashboard, ranking and health
// routes all expect a record per business for every period.
export async function POST(request: Request) {
  const body = await request.json()

  const businessName = normalizeText(body.businessName)

  if (!businessName) {
    return NextResponse.json({ message: "businessName is required" }, { status: 400 })
  }

  const isNameTaken = businesses.some(
    (business) => business.businessName.toLowerCase() === businessName
  )

  if (isNameTaken) {
    return NextResponse.json(
      { message: `A business named ${businessName} already exists` },
      { status: 409 }
    )
  }

  const establishedYear = Number(body.establishedYear)

  if (!Number.isFinite(establishedYear) || establishedYear <= 0) {
    return NextResponse.json({ message: "establishedYear is required" }, { status: 400 })
  }

  const createdBusiness: Business = {
    id: nextBusinessId(),
    logo: typeof body.logo === "string" ? body.logo : "",
    businessName,
    establishedYear,
    customers: 0,
    country: "",
    state: "",
  }

  profileFields.forEach((field) => {
    const value = normalizeText(body[field])

    if (value) {
      createdBusiness[field] = value
    }
  })

  // Bank information belongs to the server the way the id and the customer count
  // do, so a new business always starts with its own set of values. The account
  // name follows the business name and the bank starts on one of the example
  // banks, because a business can be paid into any bank once the details are
  // edited.
  createdBusiness.account = {
    accountName: createdBusiness.businessName,
    accountNumber: generateAccountNumber(createdBusiness.id),
    bankName: exampleBankNames[Number(createdBusiness.id) % exampleBankNames.length],
  }

  businesses.push(createdBusiness)

  registerBusinessHealth(createdBusiness.id)

  return NextResponse.json(
    {
      message: `Business ${createdBusiness.id} created successfully`,
      data: createdBusiness,
    },
    { status: 201 }
  )
}

