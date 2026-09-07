import { businesses } from "@/src/data/businesses";
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

export async function POST(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params
  const business = businesses.find((item) => item.id === businessId)

  if (!business) {
    return NextResponse.json({ message: "Business not found" }, { status: 404 })
  }

  const body = await request.json()

  if (typeof body.logo !== "string") {
    return NextResponse.json({ message: "Invalid logo" }, { status: 400 })
  }

  business.logo = body.logo
  return NextResponse.json(business)
}
