import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>

// The personal information the settings page lists and the profile button and
// card show. The username is what those two display, and the currency is the
// account currency the account settings list and the money fields are read in.
export interface Profile {
  profilePicture: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  currency: string
  userId: string | number
}
// "insufficient" is the state a business answers with when its own records are
// too thin to score — it is not a performance status and never reads as
// critical.
export type HealthType = "healthy" | "critical" | "moderate" | "insufficient"
export type Duration = "weekly" |"monthly" |"annual"

export interface BusinessHealth {
  businessId: string
  period: Duration
  healthStatus: HealthType
  healthScore: number
  metrics: {
    operational: number
    growth: number
    stability: number
    profitability: number
  }
  // The metrics the business's own records could not produce a score for. They
  // report as unavailable rather than as zero performance, and the overall
  // score is normalized over the weights that remain.
  insufficientMetrics: (keyof BusinessHealth["metrics"])[]
}

// The bank information a business is paid into, shown on the business overview
// and on the invoice payment details.
export type BusinessAccount = {
  accountName: string
  accountNumber: string
  bankName: string
}

export interface Business {
  id: string
  businessName: string
  logo?: string
  tagLine?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  website?: string
  industry?: string
  establishedYear: number
  country: string
  state: string
  customers: number
  // The bank information the business overview and the invoice payment details
  // show. The server owns these values, so the client only reads them.
  account?: BusinessAccount
  health?: HealthType
  healthScore?: number
}

export type Businesses = Business[]
export type KpiDirection = "up" | "down"

export type KpiMetric = {
  value: number
  change: number
  direction: KpiDirection
}

export type BusinessKpiResponse = {
  businessId: string
  financials: {
    revenue: KpiMetric
    receivables: KpiMetric
    expenses: KpiMetric
    profit: KpiMetric
    cashBalance: KpiMetric
  }
}

export interface Customer {
  id: string
  customerName: string
  customerType: "individual" | "company"
  companyName?: string
  address: string
  phone: string
  email: string
  quickCard: boolean
}

export type ToastType = {
  variant: "success" | "error" | "warning" | "info",
  message: string,
  title?: string
}

export type ScheduleType = "task" | "meeting" | "reminder" | "event"

// A schedule is either still to be done or done: the two statuses the schedule
// list and the schedules panel show.
export type ScheduleStatus = "complete" | "pending"

export type ScheduleRecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly"

export type Schedule = {
  id: string
  businessId: string
  title: string
  description?: string
  type: ScheduleType
  status: ScheduleStatus
  startAt: string
  endAt?: string
  allDay: boolean
  location?: string
  recurrence: {
    enabled: boolean
    frequency?: ScheduleRecurrenceFrequency
  }
  createdAt: string
  updatedAt: string
}

export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "pending" | "in-progress" | "completed" | "overdue"

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  businessId: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
}

export interface Transaction {
  id: string;
  businessId: string;
  customer: string;
  type: "income" | "expense";
  status: "completed" | "cancelled" | "pending";
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// The periods the transactions page reports on: the three windows every other
// report uses, plus everything the business has recorded.
export type TransactionPeriod = Duration | "alltime"

// The figures the KPI row above the transactions list reports. They are read
// from every transaction the business holds, so the row reports the whole list
// rather than the page of records being viewed.
export type BusinessTransactionKpis = {
  total: number
  income: number
  expenses: number
  netProfit: number
  receivables: number
}

export interface JournalEntry {
  id: string;
  title: string;
  business: string;
  date: string;
  summary: string;
  category: string;
  status: "draft" | "published" | "archived";
}

export interface SupportTicket {
  id: string;
  subject: string;
  business: string;
  date: string;
  message: string;
  priority: Priority;
  status: "open" | "in-progress" | "resolved";
}

export interface GoalsType {
    id: string,
    description: string,
    category: string,
    setDate: string, /*change to date*/
    duration: string,
    remaining: string
  }

  export type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };

  export type kpiObjectProps = {
    id?: string | number,
    title: string,
    value: string,
    meaning?: string,
    description?: string,
    trend?: "up" | "down" | string
    change?: number
}

export type ChartPoint = {
  date: string
  income: number
  expenses: number
  profit: number
}

export type chartTypes = "Line chart" | "Bar chart"

export type RankingMetric = "profit" | "revenue"

export interface BusinessStats {
  id: string
  rank: number
  name: string
  value: number
  metric: RankingMetric
}

export type ChartPeriod = "7d" | "30d" | "12m"

export type ChartResponse = {
  success: boolean
  data: {
    period: ChartPeriod
    points: ChartPoint[]
  }
}

// A line item on an invoice or a receipt, whether it is being drafted on a form,
// stored on a record or printed on a document. Quantity and price are the source
// values and the amount is always derived from them.
export type LineItem = {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  amount: number
}

export type InvoiceCustomerPayload = {
  name?: string
  email?: string
  address?: string
}

// A line item as it arrives on a request. The amount is sent only by a client
// that already worked it out, which is why it is optional here.
export type LineItemPayload = {
  id?: string
  name?: string
  description?: string
  quantity?: number | string
  price?: number | string
  amount?: number | string
}

// A line item as typed on the create invoice form. The amount is derived from
// the quantity and price, so it is never sent.
export type CreateInvoiceItemPayload = Omit<LineItemPayload, "amount">

// JSON payload sent by the create invoice form. It carries source values only:
// the business travels as its id, and the line items, discount and vat rates are
// enough for the route to derive every amount and total.
export type CreateInvoicePayload = {
  template?: string
  businessId?: string
  customer?: InvoiceCustomerPayload
  currency?: string
  items?: CreateInvoiceItemPayload[]
  discount?: number | string
  vat?: number | string
  issueDate?: string
  dueDate?: string
}

// The invoice returned by POST /api/invoices once the payload is normalised.
export type CreatedInvoice = {
  invoiceNo: string
  template: string
  status: string
  businessId: string
  customer: {
    name: string
    email: string
    address: string
  }
  currency: {
    code: string
    symbol: string
  }
  items: LineItem[]
  totals: {
    subtotal: number
    discountRate: number
    discountAmount: number
    vatRate: number
    vatAmount: number
    total: number
  }
  dates: {
    issueDate: string
    dueDate: string
    createdAt: string
  }
}

export type CreateInvoiceResponse = {
  message: string
  data: CreatedInvoice
}

// The invoice payload a request carries before the route normalises it. The route
// accepts the money figures the client already worked out as well, so a request
// that sends the derived totals does not have to send the line items and rates.
export type InvoiceRoutePayload = Omit<CreateInvoicePayload, "items"> & {
  items?: LineItemPayload[]
  amount?: number | string
  subtotal?: number | string
  total?: number | string
}

// The receipt payload a request carries before the route normalises it.
export type ReceiptRoutePayload = {
  template?: string
  businessId?: string
  customer?: {
    name?: string
    email?: string
  }
  currency?: string
  items?: LineItemPayload[]
  amount?: string
  subtotal?: number | string
  paymentDate?: string
}

