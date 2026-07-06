import { generateVariable } from "@/src/utils/generateVariable"

const bodySize = {
  "name": "bodySize",
  "xs": "0.625rem",   // 12px
  "sm": "0.8rem",  // 14px
  "md": "1rem",      // 16px
  "lg": "1.125rem",  // 18px
  "xl": "1.25rem",   // 20px
  "xxl": "1.375rem", // 22px
} as const

const headingSize = {
  "name": "headingSize",
  "xs": "0.8rem", 
  "sm": "0.95rem",   // 17.6px
  "md": "1.1rem",   // 19.2px
  "lg": "1.35rem",  // 21.6px
  "xl": "1.5rem",   // 24px
  "xxl": "1.75rem", // 28px
} as const

const fontWeight = {
    "name": "fontWeight",
    "normal": "400",
    "medium": "500",
    "semiBold": "700",
    "bold" :"900"
} as const

const bodySizeVariables = generateVariable(bodySize, bodySize.name)
const headingSizeVariables = generateVariable(headingSize, headingSize.name)
const fontWeightVariables = generateVariable(fontWeight, fontWeight.name)    

console.log(bodySizeVariables)

export {
  bodySize, 
  headingSize, 
  fontWeight, 
  bodySizeVariables, 
  headingSizeVariables, 
  fontWeightVariables
}