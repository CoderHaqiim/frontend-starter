import { businesses } from "@/src/data/businesses"
import { unregisterBusinessHealth } from "@/src/utils/businessHealthResponse";
import { normalizeText } from "@/src/utils/mockApi";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}:{params: Promise<{businessId: string}>}) {
  const {businessId} = await params;

  const business = businesses.find(b => b.id === businessId)

  if(!business){
    return NextResponse.json(
        {message:"Business not found"},
        {status: 404}
    )
  }

  return NextResponse.json(business)
}

// The profile fields the edit business form owns. The id, the customer count and
// the health figures belong to the server, so they are never taken from a body.
const updatableFields = [
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
]

type RouteParams = { params: Promise<{ businessId: string }> }

// Shared by PATCH and the POST alias below, so the two verbs cannot drift apart.
async function updateBusiness(request: Request, { params }: RouteParams) {
  const { businessId } = await params
  const business = businesses.find((item) => item.id === businessId)

  if (!business) {
    return NextResponse.json({ message: "Business not found" }, { status: 404 })
  }

  const body = await request.json()

  // The edit logo form sends the logo on its own and the edit business form sends
  // the profile fields, so either subset is accepted.
  if (body.logo !== undefined && typeof body.logo !== "string") {
    return NextResponse.json({ message: "Invalid logo" }, { status: 400 })
  }

  const updates: Record<string, string | number> = {}

  updatableFields.forEach((field) => {
    if (typeof body[field] === "string") {
      updates[field] = normalizeText(body[field])
    }
  })

  const establishedYear = Number(body.establishedYear)
  if (body.establishedYear !== undefined && Number.isFinite(establishedYear)) {
    updates.establishedYear = establishedYear
  }

  if (typeof body.logo === "string") {
    updates.logo = body.logo
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ message: "No business fields to update" }, { status: 400 })
  }

  Object.assign(business, updates)

  return NextResponse.json({
    message: `Business ${businessId} updated successfully`,
    data: business,
  })
}

export async function PATCH(request: Request, { params }: RouteParams) {
  return updateBusiness(request, { params })
}

// Kept as an alias so the edit logo form and any older caller keep working.
export async function POST(request: Request, { params }: RouteParams) {
  return updateBusiness(request, { params })
}

// Removes the business from the in-memory store. The KPI and health stores are
// keyed by business id, so the entries belonging to it are cleared with it and
// the dashboard totals stop counting it.
export async function DELETE(_request: Request, { params }: RouteParams) {
  const { businessId } = await params
  const businessIndex = businesses.findIndex((item) => item.id === businessId)

  if (businessIndex === -1) {
    return NextResponse.json({ message: `Business ${businessId} was not found` }, { status: 404 })
  }

  const [deletedBusiness] = businesses.splice(businessIndex, 1)

  unregisterBusinessHealth(businessId)

  return NextResponse.json({
    message: `Business ${businessId} deleted successfully`,
    data: deletedBusiness,
  })
}
