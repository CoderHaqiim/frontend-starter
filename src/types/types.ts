import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>
export type HealthType = "healthy" | "critical" | "moderate"
export type Duration = "weekly" |"monthly" |"annual"

export interface BusinessHealth {
  businessId: string
  period: Duration
  health: HealthType
  healthScore: number
}

export interface Business {
  id: string
  name: string
  description?: string
  industry?: string
  currency: string
  established: number
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
    expenses: KpiMetric
    profit: KpiMetric
    cashBalance: KpiMetric
  }
}

export interface Customer {
  id: string
  name: string
  address: string
  phone: string
  email: string
}

export type ScheduleType =
  | "task"
  | "meeting"
  | "reminder"
  | "event"

export type ScheduleStatus =
  | "scheduled"
  | "cancelled"
  | "completed"
  | "in-progress"

export type ScheduleRecurrenceFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"

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
  customerId?: string
  recurrence: {
    enabled: boolean
    frequency?: ScheduleRecurrenceFrequency
  }
  createdAt: string
  updatedAt: string
}


export type Priority = "low" | "medium" | "high";

export type Status =
  | "pending"
  | "cancelled"
  | "in-progress"
  | "completed"
  | "overdue"

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  business: string;
  dueDate: string;
  priority: Priority;
  status: Status;
}

export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string;
  description: string;
  business: string;
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  status: "completed" | "pending" | "cancelled";
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
  currency: string
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


