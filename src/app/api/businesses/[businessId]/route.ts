import { NextResponse } from "next/server"

const businesses = [
    {
        id: "0",
        name: "Multilinks Limited",
        industry: "Technology",
        startDate: "Oct 1, 2009",
        health:"healthy",
        healthScore: 80,
        established:2010,
        country: "Nigeria",
        state: "Lagos"
    },
    {
        id: "1",
        name: "Dangote Cement Limited",
        industry: "Food and Agriculture",
        startDate: "Oct 1, 2009",
        health:"critical",
        healthScore: 20,
        established:2010,
        country: "Nigeria",
        state: "Lagos"
    },
    {
        id: "2",
        name: "Microsoft Limited",
        industry: "Technology",
        startDate: "Aug 13, 2009",
        health:"critical",
        healthScore: 30,
        established:2009,
        country: "United States",
        state: "Washington D.C"
    },
    {
        id: "3",
        name: "Opic Farms Limited",
        industry: "Food, Agriculture and Commerce",
        startDate: "Mar 22, 2008",
        health:"healthy",
        healthScore: 90,
        established:2020,
        country: "Nigeria",
        state: "Lagos"
    },
     {
        id: "4",
        name: "Alvin stores",
        industry: "Commerce",
        startDate: "Mar 22, 2008",
        health:"moderate",
        healthScore:50,
        established:2014,
        country: "United Kingdom",
        state: "London"
    }
]

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
