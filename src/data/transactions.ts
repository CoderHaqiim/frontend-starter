import { Transaction } from "@/src/types/types"
import { createMockStore } from "@/src/utils/mockStore"
import { dateDaysAgo, toIsoDate } from "@/src/utils/dateRange"

const handwrittenTransactions: Transaction[] = [
  {
    id: "trn-001",
    businessId: "0",
    customer: "Acme Networks",
    type: "income",
    status: "completed",
    amount: 4000,
    description: "Client invoice payment",
    category: "Sales",
    date: "2026-07-27",
    createdAt: "2026-07-27T10:00:00.000Z",
    updatedAt: "2026-07-27T10:00:00.000Z",
  },
  {
    id: "trn-002",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "completed",
    amount: 180,
    description: "Office internet subscription",
    category: "Utilities",
    date: "2026-07-25",
    createdAt: "2026-07-25T09:30:00.000Z",
    updatedAt: "2026-07-25T09:30:00.000Z",
  },
  {
    id: "trn-003",
    businessId: "0",
    customer: "TechSource Supplies",
    type: "expense",
    status: "pending",
    amount: 1250,
    description: "Supplier deposit",
    category: "Inventory",
    date: "2026-07-23",
    createdAt: "2026-07-23T12:00:00.000Z",
    updatedAt: "2026-07-23T12:00:00.000Z",
  },
  {
    id: "trn-004",
    businessId: "0",
    customer: "BrightPath Consulting",
    type: "income",
    status: "completed",
    amount: 2200,
    description: "Consulting retainer",
    category: "Services",
    date: "2026-07-20",
    createdAt: "2026-07-20T14:00:00.000Z",
    updatedAt: "2026-07-20T14:00:00.000Z",
  },
  {
    id: "trn-010",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "pending",
    amount: 650,
    description: "Equipment maintenance",
    category: "Maintenance",
    date: "2026-07-18",
    createdAt: "2026-07-18T15:00:00.000Z",
    updatedAt: "2026-07-18T15:00:00.000Z",
  },
  {
    id: "trn-005",
    businessId: "1",
    customer: "BuildRight Distributors",
    type: "income",
    status: "completed",
    amount: 1850000,
    description: "Cement distribution order",
    category: "Sales",
    date: "2026-07-28",
    createdAt: "2026-07-28T08:00:00.000Z",
    updatedAt: "2026-07-28T08:00:00.000Z",
  },
  {
    id: "trn-006",
    businessId: "1",
    customer: "Dangote Cement Limited",
    type: "expense",
    status: "cancelled",
    amount: 320000,
    description: "Freight and delivery costs",
    category: "Logistics",
    date: "2026-07-26",
    createdAt: "2026-07-26T11:00:00.000Z",
    updatedAt: "2026-07-26T11:00:00.000Z",
  },
  {
    id: "trn-007",
    businessId: "2",
    customer: "CloudPoint Nigeria",
    type: "income",
    status: "completed",
    amount: 75000,
    description: "Cloud services renewal",
    category: "Services",
    date: "2026-07-24",
    createdAt: "2026-07-24T13:00:00.000Z",
    updatedAt: "2026-07-24T13:00:00.000Z",
  },
  {
    id: "trn-008",
    businessId: "3",
    customer: "GreenField Produce",
    type: "expense",
    status: "pending",
    amount: 4600,
    description: "Seed and fertilizer purchase",
    category: "Supplies",
    date: "2026-07-22",
    createdAt: "2026-07-22T10:00:00.000Z",
    updatedAt: "2026-07-22T10:00:00.000Z",
  },
  {
    id: "trn-009",
    businessId: "4",
    customer: "Lagos Home Mart",
    type: "income",
    status: "completed",
    amount: 980,
    description: "Household goods sale",
    category: "Sales",
    date: "2026-07-21",
    createdAt: "2026-07-21T16:00:00.000Z",
    updatedAt: "2026-07-21T16:00:00.000Z",
  },
  {
    id: "trn-011",
    businessId: "0",
    customer: "Northstar Telecoms",
    type: "income",
    status: "completed",
    amount: 3100,
    description: "Managed services payment",
    category: "Services",
    date: "2026-07-17",
    createdAt: "2026-07-17T10:00:00.000Z",
    updatedAt: "2026-07-17T10:00:00.000Z",
  },
  {
    id: "trn-012",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "cancelled",
    amount: 420,
    description: "Office supplies",
    category: "Supplies",
    date: "2026-07-16",
    createdAt: "2026-07-16T09:00:00.000Z",
    updatedAt: "2026-07-16T09:00:00.000Z",
  },
  {
    id: "trn-013",
    businessId: "0",
    customer: "MetroLink Services",
    type: "income",
    status: "pending",
    amount: 1750,
    description: "Network installation payment",
    category: "Services",
    date: "2026-07-15",
    createdAt: "2026-07-15T11:00:00.000Z",
    updatedAt: "2026-07-15T11:00:00.000Z",
  },
  {
    id: "trn-014",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "completed",
    amount: 900,
    description: "Software licence renewal",
    category: "Software",
    date: "2026-07-14",
    createdAt: "2026-07-14T13:00:00.000Z",
    updatedAt: "2026-07-14T13:00:00.000Z",
  },
  {
    id: "trn-015",
    businessId: "0",
    customer: "Apex Solutions",
    type: "income",
    status: "completed",
    amount: 2650,
    description: "Monthly support retainer",
    category: "Services",
    date: "2026-07-13",
    createdAt: "2026-07-13T14:00:00.000Z",
    updatedAt: "2026-07-13T14:00:00.000Z",
  },
  {
    id: "trn-016",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "pending",
    amount: 300,
    description: "Team travel expense",
    category: "Travel",
    date: "2026-07-12",
    createdAt: "2026-07-12T08:30:00.000Z",
    updatedAt: "2026-07-12T08:30:00.000Z",
  },
  {
    id: "trn-017",
    businessId: "0",
    customer: "CityConnect Ltd",
    type: "income",
    status: "completed",
    amount: 1200,
    description: "Connectivity service payment",
    category: "Sales",
    date: "2026-07-11",
    createdAt: "2026-07-11T15:00:00.000Z",
    updatedAt: "2026-07-11T15:00:00.000Z",
  },
  {
    id: "trn-018",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "cancelled",
    amount: 275,
    description: "Professional membership fee",
    category: "Subscriptions",
    date: "2026-07-10",
    createdAt: "2026-07-10T10:30:00.000Z",
    updatedAt: "2026-07-10T10:30:00.000Z",
  },
  {
    id: "trn-019",
    businessId: "0",
    customer: "Nova Consulting",
    type: "income",
    status: "completed",
    amount: 1950,
    description: "Technical consulting payment",
    category: "Consulting",
    date: "2026-07-09",
    createdAt: "2026-07-09T12:00:00.000Z",
    updatedAt: "2026-07-09T12:00:00.000Z",
  },
  {
    id: "trn-020",
    businessId: "0",
    customer: "Multilinks Limited",
    type: "expense",
    status: "pending",
    amount: 540,
    description: "Equipment replacement parts",
    category: "Maintenance",
    date: "2026-07-08",
    createdAt: "2026-07-08T16:00:00.000Z",
    updatedAt: "2026-07-08T16:00:00.000Z",
  },
]

/*
 * The rest of the store is generated.
 *
 * Every business trades in NGN and needs a trading history of its own, because the
 * weekly, monthly and annual reports are read from the transactions inside their
 * window and measured against the window directly before it. So each business is
 * given its own customers, vendors, amounts and rate of growth, and the records it
 * is still short of are generated until it holds the same number of transactions
 * as every other business.
 */

type TradingProfile = {
  businessId: string
  customers: string[]
  vendors: string[]
  income: { description: string; category: string }[]
  expenses: { description: string; category: string }[]
  incomeRange: [number, number]
  expenseRange: [number, number]
  // How much more the business earns and spends than it did two years ago. A value
  // below 1 is a business that is shrinking, which is what turns its reports into
  // a fall rather than a rise.
  growth: number
}

const tradingProfiles: TradingProfile[] = [
  {
    businessId: "0",
    customers: [
      "Acme Networks",
      "TechSource Supplies",
      "BrightPath Consulting",
      "Northstar Telecoms",
      "CityConnect Ltd",
      "Nova Consulting",
      "Apex Solutions",
      "MetroLink Services",
    ],
    vendors: [
      "Ikeja Data Centre",
      "Multilinks Power Services",
      "Zenith Office Supplies",
      "SwiftNet Fibre",
      "Lagos Software House",
    ],
    income: [
      { description: "Client invoice payment", category: "Sales" },
      { description: "Managed services retainer", category: "Services" },
      { description: "Network installation payment", category: "Services" },
      { description: "Bandwidth resale income", category: "Sales" },
      { description: "Technical consulting payment", category: "Consulting" },
      { description: "Monthly support retainer", category: "Services" },
    ],
    expenses: [
      { description: "Office internet subscription", category: "Utilities" },
      { description: "Software licence renewal", category: "Software" },
      { description: "Equipment maintenance", category: "Maintenance" },
      { description: "Data centre power bill", category: "Utilities" },
      { description: "Team travel expense", category: "Travel" },
      { description: "Staff salaries", category: "Payroll" },
    ],
    incomeRange: [420000, 3800000],
    expenseRange: [95000, 1250000],
    growth: 1.35,
  },
  {
    businessId: "1",
    customers: [
      "BuildRight Distributors",
      "Lagos Builders Depot",
      "Abuja Construction Ltd",
      "Westgate Projects",
      "Cement Traders Union",
      "Delta Blocks and Concrete",
    ],
    vendors: [
      "Obajana Haulage Services",
      "Northern Limestone Ltd",
      "CoalLink Energy",
      "Gbagada Plant Spares",
      "Industrial Diesel Supplies",
    ],
    income: [
      { description: "Cement distribution order", category: "Sales" },
      { description: "Bulk cement supply", category: "Sales" },
      { description: "Haulage contract income", category: "Logistics" },
      { description: "Export shipment payment", category: "Sales" },
      { description: "Concrete block supply", category: "Sales" },
    ],
    expenses: [
      { description: "Freight and delivery costs", category: "Logistics" },
      { description: "Plant maintenance", category: "Maintenance" },
      { description: "Limestone purchase", category: "Raw Materials" },
      { description: "Diesel for kilns", category: "Utilities" },
      { description: "Plant staff wages", category: "Payroll" },
    ],
    incomeRange: [8500000, 42000000],
    expenseRange: [3200000, 21000000],
    growth: 0.82,
  },
  {
    businessId: "2",
    customers: [
      "CloudPoint Nigeria",
      "Zenith Financial Services",
      "SwiftPay Fintech",
      "Northern Data Systems",
      "Lagos State Ministry of Education",
    ],
    vendors: [
      "Azure Hosting Nigeria",
      "Partner Network Africa",
      "Brightline Marketing",
      "Sapphire Data Centres",
      "West Africa Cloud Brokers",
    ],
    income: [
      { description: "Cloud services renewal", category: "Services" },
      { description: "Enterprise licence payment", category: "Licensing" },
      { description: "Azure consumption billing", category: "Services" },
      { description: "Partner support contract", category: "Services" },
      { description: "Developer tooling subscription", category: "Licensing" },
    ],
    expenses: [
      { description: "Data centre hosting", category: "Hosting" },
      { description: "Partner commissions", category: "Commissions" },
      { description: "Marketing campaign spend", category: "Marketing" },
      { description: "Engineering salaries", category: "Payroll" },
      { description: "Software testing services", category: "Professional Services" },
    ],
    incomeRange: [6000000, 28000000],
    expenseRange: [2400000, 11500000],
    growth: 1.28,
  },
  {
    businessId: "3",
    customers: [
      "GreenField Produce",
      "Ikeja Food Market",
      "Fresh Harvest Stores",
      "Opic Agro Dealers",
      "Agric Suppliers Nigeria",
    ],
    vendors: [
      "Agro Seed Nigeria",
      "Livestock Feed Depot",
      "Ikorodu Irrigation Services",
      "Farm Labour Cooperative",
      "Poultry Care Ventures",
    ],
    income: [
      { description: "Produce sales to wholesalers", category: "Sales" },
      { description: "Poultry supply contract", category: "Sales" },
      { description: "Grain harvest sale", category: "Sales" },
      { description: "Farm machinery hire income", category: "Hire" },
      { description: "Processed food supply", category: "Sales" },
    ],
    expenses: [
      { description: "Seed and fertilizer purchase", category: "Supplies" },
      { description: "Feed and veterinary costs", category: "Livestock" },
      { description: "Irrigation diesel", category: "Utilities" },
      { description: "Farm labour wages", category: "Payroll" },
      { description: "Harvest haulage", category: "Logistics" },
    ],
    incomeRange: [1800000, 8500000],
    expenseRange: [900000, 4600000],
    growth: 1.18,
  },
  {
    businessId: "4",
    customers: [
      "Lagos Home Mart",
      "Alaba Traders",
      "Ikeja Retail Hub",
      "Mama Nkechi Provisions",
      "Walk-in Customers",
    ],
    vendors: [
      "Alaba Wholesale Depot",
      "Ikeja Stock Supply",
      "PowerGen Diesel",
      "Shop Rent Services",
      "City Retail Logistics",
    ],
    income: [
      { description: "Household goods sale", category: "Sales" },
      { description: "Counter sales", category: "Sales" },
      { description: "Bulk provisions order", category: "Sales" },
      { description: "Store delivery income", category: "Delivery" },
      { description: "Weekend market sales", category: "Sales" },
    ],
    expenses: [
      { description: "Stock purchase", category: "Inventory" },
      { description: "Shop rent", category: "Rent" },
      { description: "Generator fuel", category: "Utilities" },
      { description: "Store attendant wages", category: "Payroll" },
      { description: "Packaging materials", category: "Supplies" },
    ],
    incomeRange: [250000, 1600000],
    expenseRange: [120000, 980000],
    growth: 0.92,
  },
]

// Every business holds this many transactions in total: the records already
// written for it by hand, plus the generated ones it takes to reach the total.
const TRANSACTIONS_PER_BUSINESS = 60

// Day offsets spread evenly across a span, so a window holds its share of the
// records rather than a clump at one end.
const sampleOffsets = (start: number, end: number, count: number): number[] => {
  if (count <= 0) return []
  if (count === 1) return [Math.round((start + end) / 2)]

  return Array.from(
    { length: count },
    (_, index) => start + Math.round((index * (end - start)) / (count - 1))
  )
}

/*
 * The day offsets a business's generated records land on, in four spans: the
 * current week (what the weekly chart and report read), the rest of the current
 * month (the monthly windows), the rest of the year (the annual chart and the
 * months the health metrics read) and the year before it (the window the annual
 * report measures itself against). The spans add up to the count they are given,
 * so a business ends up holding exactly the total it is meant to.
 */
const spreadOffsets = (count: number): number[] => {
  const week = Math.max(2, Math.round(count * 0.15))
  const restOfMonth = Math.max(3, Math.round(count * 0.2))
  const priorYear = Math.max(3, Math.round(count * 0.15))
  const restOfYear = count - week - restOfMonth - priorYear

  // A count too small to fill four spans is spread over the whole history
  // instead, which still answers with exactly the count that was asked for.
  if (restOfYear < 1) return sampleOffsets(0, 730, count)

  return [
    ...sampleOffsets(0, 6, week),
    ...sampleOffsets(7, 29, restOfMonth),
    ...sampleOffsets(30, 364, restOfYear),
    ...sampleOffsets(365, 730, priorYear),
  ]
}

// The span the generated history covers, which is what the growth of a business is
// measured over.
const historyDays = 730

// Deterministic variation: the history looks varied, but a restart on the same day
// rebuilds exactly the same store.
const variation = (seed: number) => {
  const value = Math.sin(seed) * 10000

  return value - Math.floor(value)
}

// Naira amounts, rounded to the nearest thousand because that is the smallest unit
// these businesses deal in.
const amountFor = (range: [number, number], seed: number, trend: number) => {
  const [minimum, maximum] = range
  const amount = (minimum + (maximum - minimum) * (0.65 + variation(seed) * 0.35)) * trend

  return Math.round(amount / 1000) * 1000
}

// Income is paid in turns, so every second income is still pending and sits in
// receivables, while expenses settle more often. The occasional transaction is
// cancelled, which takes it out of every figure.
const statusFor = (index: number, isIncome: boolean): Transaction["status"] => {
  if (index % 9 === 5) return "cancelled"
  if (isIncome) return (index / 2) % 2 === 0 ? "pending" : "completed"

  return ((index - 1) / 2) % 5 === 3 ? "pending" : "completed"
}

const buildGeneratedTransactions = () => {
  const generated: Transaction[] = []

  tradingProfiles.forEach((profile, profileIndex) => {
    // The records already written for this business by hand count towards its
    // total, so only the difference is generated.
    const handwrittenCount = handwrittenTransactions.filter(
      (transaction) => transaction.businessId === profile.businessId
    ).length
    const offsets = spreadOffsets(Math.max(TRANSACTIONS_PER_BUSINESS - handwrittenCount, 0))

    offsets.forEach((daysAgo, index) => {
      const isIncome = index % 2 === 0
      const catalogue = isIncome ? profile.income : profile.expenses
      const parties = isIncome ? profile.customers : profile.vendors
      const entry = catalogue[index % catalogue.length]
      const seed = profileIndex * 1000 + index
      // Newer history is scaled by the growth of the business, so the figure a
      // window reports can genuinely move up or down against the window before it.
      const trend = Math.pow(profile.growth, (historyDays - daysAgo) / historyDays)
      const date = toIsoDate(dateDaysAgo(daysAgo))
      const hour = String(8 + (index % 9)).padStart(2, "0")

      generated.push({
        id: `trn-${profileIndex + 1}-gen-${String(index + 1).padStart(3, "0")}`,
        businessId: profile.businessId,
        customer: parties[index % parties.length],
        type: isIncome ? "income" : "expense",
        status: statusFor(index, isIncome),
        amount: amountFor(isIncome ? profile.incomeRange : profile.expenseRange, seed, trend),
        description: entry.description,
        category: entry.category,
        date,
        createdAt: `${date}T${hour}:30:00.000Z`,
        updatedAt: `${date}T${hour}:30:00.000Z`,
      })
    })
  })

  return generated
}

// Newest first, which is the order the list routes page through and the order the
// create route keeps by unshifting.
const seedTransactions: Transaction[] = [
  ...handwrittenTransactions,
  ...buildGeneratedTransactions(),
].sort(
  (first, second) =>
    second.date.localeCompare(first.date) || second.createdAt.localeCompare(first.createdAt)
)

// One shared copy of the store per server process, so every transaction route
// reads and mutates the same array.
export const transactions = createMockStore("transactionsStore", seedTransactions)