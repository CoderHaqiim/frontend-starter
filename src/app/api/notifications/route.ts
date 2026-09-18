import { NextResponse } from "next/server"

const notifications = [
  {
    id: 1,
    title: "Invoice received",
    message: "New invoice #INV-1042 has been submitted by Northwind Studio.",
    createdAt: "2026-09-17T09:15:00.000Z",
    read: false,
  },
  {
    id: 2,
    title: "Payment reminder",
    message: "Invoice #INV-1038 is due in 2 days.",
    createdAt: "2026-09-16T15:42:00.000Z",
    read: false,
  },
  {
    id: 3,
    title: "Task assigned",
    message: "You were assigned to review the quarterly sales report.",
    createdAt: "2026-09-15T11:20:00.000Z",
    read: true,
  },
  {
    id: 4,
    title: "Business update",
    message: "Apex Retail has completed the onboarding checklist.",
    createdAt: "2026-09-14T17:35:00.000Z",
    read: false,
  },
  {
    id: 5,
    title: "Schedule alert",
    message: "Your meeting with the finance team starts in 30 minutes.",
    createdAt: "2026-09-13T08:05:00.000Z",
    read: true,
  },
]

export async function GET() {
  return NextResponse.json(notifications)
}
