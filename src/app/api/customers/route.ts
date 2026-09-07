import { customers } from "@/src/data/customers"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(customers)
}