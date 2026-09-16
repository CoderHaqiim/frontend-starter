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
  "sm": "16px",   
  "md": "18px",   
  "lg": "20px", 
  "xl": "24px",   
  "xxl": "30px", 
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
  bodySize, bodySizeVariables, fontWeight, fontWeightVariables, headingSize, headingSizeVariables
}

