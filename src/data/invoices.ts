export type Invoice = {
  date: string
  id: string
  amount: string
  sentTo: {
    id: string
    name: string
    dateSent: string
    amount: string
    paymentStatus: "overdue" | "paid" | "pending" 
  }[]
  issueDate: string
}

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    sentTo: [{ id: "cust-001", name: "Joyce Mirro", dateSent: "Aug 12, 2026", amount: "$2,500", paymentStatus: "pending" }],
    date: "Aug 12, 2026",
    issueDate: "Aug 12, 2026",
    amount: "$2,500"
  },
  {
    id: "INV-002",
    sentTo: [
      { id: "cust-002", name: "Tola Ajayi", dateSent: "Aug 10, 2026", amount: "$850", paymentStatus: "paid" },
      { id: "cust-003", name: "Amina Bello", dateSent: "Aug 10, 2026", amount: "$850", paymentStatus: "paid" },
    ],
    date: "Aug 10, 2026",
    issueDate: "Aug 10, 2026",
    amount: "$850",
  },
  {
    id: "INV-003",
    sentTo: [{ id: "cust-004", name: "Samuel Obi", dateSent: "Aug 5, 2026", amount: "$1,200", paymentStatus: "overdue" }],
    date: "Aug 5, 2026",
    issueDate: "Aug 5, 2026",
    amount: "$1,200",
  },
  {
    id: "INV-004",
    sentTo: [
      { id: "cust-005", name: "Ngozi Chukwu", dateSent: "Jul 29, 2026", amount: "$3,100", paymentStatus: "paid" },
      { id: "cust-006", name: "Michael Ade", dateSent: "Jul 29, 2026", amount: "$3,100", paymentStatus: "paid" },
    ],
    date: "Jul 29, 2026",
    issueDate: "Jul 29, 2026",
    amount: "$3,100",
  },
  {
    id: "INV-005",
    sentTo: [
      { id: "cust-001", name: "Joyce Mirro", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "pending" },
      { id: "cust-002", name: "Tola Ajayi", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "paid" },
      { id: "cust-003", name: "Amina Bello", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "overdue" },
      { id: "cust-004", name: "Samuel Obi", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "paid" },
      { id: "cust-005", name: "Ngozi Chukwu", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "pending" },
      { id: "cust-007", name: "Fatima Yusuf", dateSent: "Aug 15, 2026", amount: "$2,100", paymentStatus: "pending" },
    ],
    date: "Aug 15, 2026",
    issueDate: "Aug 15, 2026",
    amount: "$2,100",
  },
]
