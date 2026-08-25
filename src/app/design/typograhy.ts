import { generateVariable } from "@/src/utils/generateVariable"

const bodySize = {
  "name": "bodySize",
  "xxs": "10px",
  "xs": "12px",   // 12px
  "sm": "14px",  // 14px
  "md": "16px",      // 16px
  "lg": "18px",  // 18px
  "xl": "20px",   // 20px
  "xxl": "24px", // 22px
} as const

const headingSize = {
  "name": "headingSize",
  "xxs": "12px",
  "xs": " 14px", 
  "sm": "16px",   // 17.6px
  "md": "20px",   // 19.2px
  "lg": "22px",  // 21.6px
  "xl": "24px",   // 24px
  "xxl": "30px", // 28px
} as const

const fontWeight = {
    "name": "fontWeight",
    "light": "300",
    "normal": "400",
    "medium": "500",
    "semiBold": "600",
    "bold" :"700"
} as const

export type FontWeightTypes = keyof typeof fontWeight
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