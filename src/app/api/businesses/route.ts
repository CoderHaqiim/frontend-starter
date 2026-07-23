import { NextResponse } from "next/server"

const businesses = [
    {
        id: "0",
        name: "Multilinks Limited",
        industry: "Technology",
        startDate: "Oct 1, 2009",
        health:"healthy",
        healthScore: 80
    },
    {
        id: "1",
        name: "Dangote Cement Limited",
        industry: "Technology",
        startDate: "Oct 1, 2009",
        health:"critical",
        healthScore: 20
    },
    {
        id: "2",
        name: "Microsoft Limited",
        industry: "Minning",
        startDate: "Aug 13, 2009",
        health:"critical",
        healthScore: 30
    },
    {
        id: "3",
        name: "Opic Farms Limited",
        industry: "Commerce",
        startDate: "Mar 22, 2008",
        health:"healthy",
        healthScore: 90
    },
    {
        id: "4",
        name: "Apic Farms Limited",
        industry: "Commerce",
        startDate: "Mar 22, 2008",
        health:"moderate",
        healthScore:50
    }
]

export async function GET(){
    return NextResponse.json(businesses)
}

