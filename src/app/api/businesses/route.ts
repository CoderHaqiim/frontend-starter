import { businesses } from "@/src/data/businesses"
import { Business } from "@/src/types/types"
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
// keep using the id in their urls, and an id is never handed out a second time.
// Deleting a business removes its records now, but keeping the counter ahead of
// the store also guarantees a recycled id can never resurrect the records of a
// business that was deleted. The counter is parked on globalThis the way the
// stores are, so every copy of this route module shares it and a hot reload does
// not reset it.
const idCounter = globalThis as typeof globalThis & { lastIssuedBusinessId?: number }

const nextBusinessId = () => {
  const highestStoredId = businesses.reduce(
    (highest, business) => Math.max(highest, Number(business.id) || 0),
    -1
  )

  idCounter.lastIssuedBusinessId =
    Math.max(idCounter.lastIssuedBusinessId ?? -1, highestStoredId) + 1

  return String(idCounter.lastIssuedBusinessId)
}

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

  // A new business holds no bank details. Nothing is derived from its name or id,
  // so the overview and the invoice payment details report the account as not set
  // until the details are entered in the edit bank details form.

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

