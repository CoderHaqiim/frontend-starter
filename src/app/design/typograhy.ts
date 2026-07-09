import { generateVariable } from "@/src/utils/generateVariable"

const bodySize = {
  "name": "bodySize",
  "xxs": "10px",
  "xs": "12px",   // 12px
  "sm": "14px",  // 14px
  "md": "16px",      // 16px
  "lg": "18px",  // 18px
  "xl": "20px",   // 20px
  "xxl": "22px", // 22px
} as const

const headingSize = {
  "name": "headingSize",
  "xxs": "12px",
  "xs": " 14px", 
  "sm": "16px",   // 17.6px
  "md": "18px",   // 19.2px
  "lg": "22px",  // 21.6px
  "xl": "28px",   // 24px
  "xxl": "32px", // 28px
} as const

const fontWeight = {
    "name": "fontWeight",
    "normal": "400",
    "medium": "600",
    "semiBold": "700",
    "bold" :"700"
} as const

const bodySizeVariables = generateVariable(bodySize, bodySize.name)
const headingSizeVariables = generateVariable(headingSize, headingSize.name)
const fontWeightVariables = generateVariable(fontWeight, fontWeight.name)

export {
  bodySize, 
  headingSize, 
  fontWeight, 
  bodySizeVariables, 
  headingSizeVariables, 
  fontWeightVariables
}