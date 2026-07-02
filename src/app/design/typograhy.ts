import { generateVariable } from "@/src/utils/generateVariable"

const bodySize = {
  "xs": "0.7rem",   // 12px
  "sm": "0.87rem",  // 14px
  "md": "1rem",      // 16px
  "lg": "1.125rem",  // 18px
  "xl": "1.25rem",   // 20px
  "xxl": "1.375rem", // 22px
} as const

const headingSize = {
  "xs": "0.8rem", 
  "sm": "0.95rem",   // 17.6px
  "md": "1.1rem",   // 19.2px
  "lg": "1.35rem",  // 21.6px
  "xl": "1.5rem",   // 24px
  "xxl": "1.75rem", // 28px
} as const

const fontWeight = {
    "normal": "400",
    "medium": "500",
    "semi-bold": "700",
    "bold" :"900"
} as const

const bodySizeVariables = generateVariable(bodySize)
const headingSizeVariables = generateVariable(headingSize)
const fontWeightVariables = generateVariable(fontWeight)    

export {
  bodySize, 
  headingSize, 
  fontWeight, 
  bodySizeVariables, 
  headingSizeVariables, 
  fontWeightVariables
}