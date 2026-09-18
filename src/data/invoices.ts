
export type Invoice = {
  businessId: string
  date: string
  id: string
  amount: string
  customer: {
    id: string
    name: string
    dateSent: string
    amount: string
    paymentStatus: "overdue" | "paid" | "pending" 
  }
  issueDate: string
}

export const invoices: Invoice[] = [
  {
    businessId: "0",
    id: "INV-001",
    customer: { id: "business-0-customer-001", name: "Amelia Carter", dateSent: "Aug 12, 2026", amount: "$2,500", paymentStatus: "pending" },
    date: "Aug 12, 2026",
    issueDate: "Aug 12, 2026",
    amount: "$2,500"
  },
  {
    businessId: "0",
    id: "INV-002",
    customer: { id: "business-0-customer-002", name: "Oliver Hughes", dateSent: "Aug 10, 2026", amount: "$850", paymentStatus: "paid" },
    date: "Aug 10, 2026",
    issueDate: "Aug 10, 2026",
    amount: "$850",
  },
  {
    businessId: "1",
    id: "INV-003",
    customer: { id: "business-1-customer-001", name: "Adewale Okafor", dateSent: "Aug 5, 2026", amount: "$1,200", paymentStatus: "overdue" },
    date: "Aug 5, 2026",
    issueDate: "Aug 5, 2026",
    amount: "$1,200",
  },
  {
    businessId: "1",
    id: "INV-004",
    customer: { id: "business-1-customer-002", name: "Bisi Adeyemi", dateSent: "Jul 29, 2026", amount: "$3,100", paymentStatus: "paid" },
    date: "Jul 29, 2026",
    issueDate: "Jul 29, 2026",
    amount: "$3,100",
  },
  {
    businessId: "2",
    id: "INV-005",
    customer: { id: "business-2-customer-001", name: "Grace Williams", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "pending" },
    date: "Aug 15, 2026",
    issueDate: "Aug 15, 2026",
    amount: "$2,100",
  },
  {
    businessId: "2",
    id: "INV-006",
    customer: { id: "business-2-customer-002", name: "Ibrahim Musa", dateSent: "Aug 18, 2026", amount: "$1,450", paymentStatus: "paid" },
    date: "Aug 18, 2026",
    issueDate: "Aug 18, 2026",
    amount: "$1,450",
  },
  {
    businessId: "3",
    id: "INV-007",
    customer: { id: "business-3-customer-001", name: "Maya Thompson", dateSent: "Aug 20, 2026", amount: "$4,200", paymentStatus: "pending" },
    date: "Aug 20, 2026",
    issueDate: "Aug 20, 2026",
    amount: "$4,200",
  },
  {
    businessId: "3",
    id: "INV-008",
    customer: { id: "business-3-customer-002", name: "Noah Wilson", dateSent: "Aug 22, 2026", amount: "$2,750", paymentStatus: "overdue" },
    date: "Aug 22, 2026",
    issueDate: "Aug 22, 2026",
    amount: "$2,750",
  },
  {
    businessId: "4",
    id: "INV-009",
    customer: { id: "business-4-customer-001", name: "Kemi Balogun", dateSent: "Aug 25, 2026", amount: "$980", paymentStatus: "paid" },
    date: "Aug 25, 2026",
    issueDate: "Aug 25, 2026",
    amount: "$980",
  },
  {
    businessId: "4",
    id: "INV-010",
    customer: { id: "business-4-customer-002", name: "Tunde Martins", dateSent: "Aug 27, 2026", amount: "$1,875", paymentStatus: "pending" },
    date: "Aug 27, 2026",
    issueDate: "Aug 27, 2026",
    amount: "$1,875",
  },
]
