import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType =  "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];
export type FunctionType = (arg?: number | string) => void | Promise<void>
export type HealthType = "healthy" | "critical" | "moderate"
export type Business = Record <string, string | HealthType | number >
export type Businesses = Business[]
