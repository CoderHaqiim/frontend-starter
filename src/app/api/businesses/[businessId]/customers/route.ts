import { businessCustomers } from "@/src/data/customers"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const customers = businessCustomers[businessId]

  if (!customers) {
    return NextResponse.json({ message: "Business not found" }, { status: 404 })
  }

  return NextResponse.json(customers)
}