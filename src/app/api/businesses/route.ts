import { NextResponse } from "next/server"
import { businesses } from "@/src/data/businesses"

export async function GET() {
  if(!businesses){
    return NextResponse.json(
        {message:"Business not found"},
        {status: 404}
    )
  }

  return NextResponse.json(businesses)
}

