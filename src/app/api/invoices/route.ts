import { invoices } from "@/src/data/invoices"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(invoices)
}
