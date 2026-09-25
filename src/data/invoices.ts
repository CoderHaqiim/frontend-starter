import { createMockStore } from "@/src/utils/mockStore"

export type InvoiceItem = {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  amount: number
}

/*
 * An invoice as it is stored once it has been created.
 *
 * Every field the create invoice form sends to POST /api/invoices is kept here
 * (template, businessId, customer, currency, items, subtotal, discount, vat,
 * total, issueDate and dueDate) so a stored invoice can be loaded straight back
 * into the invoice draft and rendered by the template it was created with.
 *
 * `amount` is the formatted total for the invoice and is what the invoice list
 * and invoice KPIs read. `subtotal` is kept as the raw line-item subtotal and
 * `total` stores the invoice total after discount and VAT. `discount` and
 * `vat` are the percentages typed on the form, matching the draft state.
 */
export type Invoice = {
  businessId: string
  id: string
  template: string
  currency: string
  issueDate: string
  dueDate: string
  customer: {
    id: string
    name: string
    email: string
    address: string
    dateSent: string
    amount: string
    paymentStatus: "overdue" | "paid" | "pending"
  }
  items: InvoiceItem[]
  subtotal: number
  discount: number
  vat: number
  total: number
  amount: string
}

const seedInvoices: Invoice[] = [
  {
    businessId: "0",
    id: "INV-001",
    template: "invoice-1",
    currency: "USD",
    issueDate: "2026-08-12",
    dueDate: "2026-08-26",
    customer: {
      id: "business-0-customer-001",
      name: "Amelia Carter",
      email: "amelia.carter@cartergroup.com",
      address: "18 Ozumba Mbadiwe Avenue, Victoria Island, Lagos",
      dateSent: "Aug 12, 2026",
      amount: "$2,687.50",
      paymentStatus: "pending",
    },
    items: [
      {
        id: "item-1",
        name: "Brand Identity Design",
        description: "Logo, colour system and brand guidelines",
        quantity: 1,
        price: 1500,
        amount: 1500,
      },
      {
        id: "item-2",
        name: "Website Landing Page",
        description: "Single page design and build",
        quantity: 1,
        price: 1000,
        amount: 1000,
      },
    ],
    subtotal: 2500,
    discount: 0,
    vat: 7.5,
    total: 2687.5,
    amount: "$2,687.50",
  },
  {
    businessId: "0",
    id: "INV-002",
    template: "invoice-2",
    currency: "USD",
    issueDate: "2026-08-10",
    dueDate: "2026-08-24",
    customer: {
      id: "business-0-customer-002",
      name: "Oliver Hughes",
      email: "oliver.hughes@hughesco.com",
      address: "42 Adeola Odeku Street, Victoria Island, Lagos",
      dateSent: "Aug 10, 2026",
      amount: "$913.75",
      paymentStatus: "paid",
    },
    items: [
      {
        id: "item-1",
        name: "Social Media Audit",
        description: "Audit of the last 90 days of activity",
        quantity: 1,
        price: 850,
        amount: 850,
      },
    ],
    subtotal: 850,
    discount: 0,
    vat: 7.5,
    total: 913.75,
    amount: "$913.75",
  },
  {
    businessId: "1",
    id: "INV-003",
    template: "invoice-1",
    currency: "USD",
    issueDate: "2026-08-05",
    dueDate: "2026-08-19",
    customer: {
      id: "business-1-customer-001",
      name: "Adewale Okafor",
      email: "adewale.okafor@okaforbuilds.com",
      address: "7 Bourdillon Road, Ikoyi, Lagos",
      dateSent: "Aug 5, 2026",
      amount: "$1,290.00",
      paymentStatus: "overdue",
    },
    items: [
      {
        id: "item-1",
        name: "Cement Supply — Grade 42.5R",
        description: "50kg bags delivered to site",
        quantity: 40,
        price: 30,
        amount: 1200,
      },
    ],
    subtotal: 1200,
    discount: 0,
    vat: 7.5,
    total: 1290,
    amount: "$1,290.00",
  },
  {
    businessId: "1",
    id: "INV-004",
    template: "invoice-2",
    currency: "USD",
    issueDate: "2026-07-29",
    dueDate: "2026-08-12",
    customer: {
      id: "business-1-customer-002",
      name: "Bisi Adeyemi",
      email: "bisi.adeyemi@adeyemiconstruction.com",
      address: "21 Admiralty Way, Lekki, Lagos",
      dateSent: "Jul 29, 2026",
      amount: "$3,165.88",
      paymentStatus: "paid",
    },
    items: [
      {
        id: "item-1",
        name: "Bulk Cement Order — Grade 32.5N",
        description: "Palletised bags for the Lekki site",
        quantity: 100,
        price: 31,
        amount: 3100,
      },
    ],
    subtotal: 3100,
    discount: 5,
    vat: 7.5,
    total: 3165.88,
    amount: "$3,165.88",
  },
  {
    businessId: "2",
    id: "INV-005",
    template: "invoice-1",
    currency: "USD",
    issueDate: "2026-08-15",
    dueDate: "2026-08-29",
    customer: {
      id: "business-2-customer-001",
      name: "Grace Williams",
      email: "grace.williams@williamsretail.com",
      address: "3555 South Las Vegas Boulevard, Las Vegas",
      dateSent: "Aug 15, 2026",
      amount: "$2,257.50",
      paymentStatus: "pending",
    },
    items: [
      {
        id: "item-1",
        name: "Microsoft 365 Business Licences",
        description: "Annual licences per seat",
        quantity: 3,
        price: 700,
        amount: 2100,
      },
    ],
    subtotal: 2100,
    discount: 0,
    vat: 7.5,
    total: 2257.5,
    amount: "$2,257.50",
  },
]

// One shared copy of the store per server process, so the invoice list and the
// invoice KPI route read and mutate the same array.
export const invoices = createMockStore("invoicesStore", seedInvoices)
