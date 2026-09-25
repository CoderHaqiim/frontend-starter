import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>

export interface Profile {
  profilePicture: string
  userName: string
  userId: string | number
  userRole: string
}
export type HealthType = "healthy" | "critical" | "moderate"
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

export type ScheduleStatus = "scheduled" | "cancelled" | "completed" | "in-progress"

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

export type InvoiceCustomerPayload = {
  name?: string
  email?: string
  address?: string
}

// A line item as typed on the form: quantity and price are the source values,
// the amount is always derived from them.
export type CreateInvoiceItemPayload = {
  id?: string
  name?: string
  description?: string
  quantity?: number | string
  price?: number | string
}

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
  items: {
    id: string
    name: string
    description: string
    quantity: number
    price: number
    amount: number
  }[]
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


