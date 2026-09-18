import { invoices } from "@/src/data/invoices"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(
    invoices.filter((invoice) => invoice.businessId === businessId)
  )
}
