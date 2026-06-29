import { ObjectRecord } from "@/src/types/types"
import { CSSProperties } from "react"

export const space: ObjectRecord = {
    "xs": "2px",
    "sm": "4px",
    "md": "10px",
    "lg": "16px",
    "xl" : "32px",
    "xxl" : "40px"
}

export const spaceVariables = {
    "--xs": space["xs"],
    "--sm": space["sm"],
    "--md": space["md"],
    "--lg": space["lg"],
    "--xl" : space["xl"],
    "--xxl" : space["xxl"]
} as CSSProperties