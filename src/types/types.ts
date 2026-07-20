import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>
export type HealthType = "healthy" | "critical" | "moderate"
export type Business = Record <string, string | HealthType | number >
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
