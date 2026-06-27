import { ObjectRecord } from "@/src/types/types"
import { CSSProperties } from "react"

  export const radius: ObjectRecord = {
    "xs" : "4px",
    "sm" : "8px",
    "md" : "12px",
    "lg" : "16px",
    "xl" : "40px"
  }

  export const radiusVariables = {
    "--radius-xs": radius["xs"],
    "--radius-sm": radius["sm"],
    "--radius-md": radius["md"],
    "--radius-lg": radius["lg"],
    "--radius-xl": radius["xl"],
  } as CSSProperties