import { NextResponse } from "next/server"

const businesses = [
    {
        id: "0",
        name: "Multilinks Limited",
        industry: "Technology",
        startDate: "Oct 1, 2009",
        health:"healthy"
    },
    {
        id: "1",
        name: "Dangote Cement Limited",
        industry: "Technology",
        startDate: "Oct 1, 2009",
        health:"critical"
    },
    {
        id: "2",
        name: "Microsoft Limited",
        industry: "Minning",
        startDate: "Aug 13, 2009",
        health:"critical"
    },
    {
        id: "3",
        name: "Opic Farms Limited",
        industry: "Commerce",
        startDate: "Mar 22, 2008",
        health:"healthy"
    }
]

export async function GET(){
    return NextResponse.json(businesses)
}

