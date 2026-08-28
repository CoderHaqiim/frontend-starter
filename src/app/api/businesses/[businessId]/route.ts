import { NextResponse } from "next/server"
import { businesses } from "@/src/data/businesses"

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
