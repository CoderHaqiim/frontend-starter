import { CSSProperties } from "react";

export type FormObjectTypes = Record<string, FormDataEntryValue>
export type ObjectRecordType = Record<string, string>
export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type FrameSizeType = "hug" | "stretch" | CSSProperties["height"] | CSSProperties["width"];