import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>
export type HealthType = "healthy" | "critical" | "moderate"
export type Business = Record <string, any >
export type Businesses = Business[]

// types/schedule.ts

export type ScheduleType =
  | "task"
  | "meeting"
  | "reminder"
  | "event"

export type Schedule = {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  type: ScheduleType
  completed: boolean
  source: "local" | "google"
  googleEventId?: string
  reminderMinutesBefore?: number
}


export type Priority = "low" | "medium" | "high";

export type Status =
  | "pending"
  | "cancelled"
  | "in-progress"
  | "completed"
  | "overdue"

export interface Task {
  id: string;
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
  },
