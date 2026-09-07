import { NextResponse } from "next/server";

 const tasks = [
    {
      id: "1",
      title: "Finish June Report",
      description: "Prepare the monthly financial report.",
      business: "Multilinks Ltd",
      dueDate: "Today",
      priority: "high",
      status: "pending",
    },
    {
      id: "2",
      title: "Call Supplier",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "medium",
      status: "completed",
    },
    {
      id: "3",
      title: "Buy spare parts",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "low",
      status: "overdue",
    },
    {
      id: "4",
      title: "Buy spare parts",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "medium",
      status: "in-progress",
    },
    {
      id: "5",
      title: "Buy spare parts",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "low",
      status: "pending"
    },
    {
      id: "6",
      title: "Buy spare parts",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "low",
      status: "pending"
    },
    {
      id: "7",
      title: "Buy spare parts",
      description: "Call the supplier about the new delivery.",
      business: "Opic Farms",
      dueDate: "Tomorrow",
      priority: "low",
      status: "pending",
    }
  ];

export async function GET(){
    return NextResponse.json(tasks)
}