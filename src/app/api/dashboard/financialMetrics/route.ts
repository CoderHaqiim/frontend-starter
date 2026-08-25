import { NextResponse } from "next/server"
const dashboardKpis = [
    {
      title: "Total Revenue",
      value: "$4,000",
      trend: "up",
      meaning: "Total money your business makes from selling products or services, before deducting expenses.",
    },
    {
      title: "Total Expenses",
      value: "$500",
      trend: "down",
      meaning: "Total money your business makes from selling products or services, before deducting expenses.",
    },
    {
      title: "Net Profit",
      value: "$3500",
      trend: "up",
      meaning: "Total money your business makes from selling products or services, before deducting expenses.",
    },
    {
      title: "Cash Balance",
      value: "$35000",
      trend: "up",
      meaning: "Total money your business makes from selling products or services, before deducting expenses.",
    }
  ]

  export async function GET(){
    return NextResponse.json(dashboardKpis)
  }