import { ObjectRecord } from "@/src/types/types"

export const bodySize: ObjectRecord = {
  "xs": "0.75rem",   // 12px
  "sm": "0.875rem",  // 14px
  "md": "1rem",      // 16px
  "lg": "1.125rem",  // 18px
  "xl": "1.25rem",   // 20px
  "xxl": "1.375rem", // 22px
}

export const headingSize: ObjectRecord = {
  "xs": "1rem",     // 16px
  "sm": "1.1rem",   // 17.6px
  "md": "1.2rem",   // 19.2px
  "lg": "1.35rem",  // 21.6px
  "xl": "1.5rem",   // 24px
  "xxl": "1.75rem", // 28px
}

export const fontWeight: ObjectRecord = {
    "normal": "400",
    "medium": "500",
    "semi-bold": "600",
    "bold" :"700"
}

export const fontWeightVariables: ObjectRecord = {
    "--normal": fontWeight["normal"],
    "--medium": fontWeight["medium"],
    "--semi-bold": fontWeight["semi-bold"],
    "--bold" : fontWeight["bold"]
}