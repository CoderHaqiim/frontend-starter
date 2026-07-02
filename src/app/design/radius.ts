import { generateVariable } from "@/src/utils/generateVariable"

  const radius = {
    "xs" : "4px",
    "sm" : "8px",
    "md" : "12px",
    "lg" : "16px",
    "xl" : "40px",
    "xxl" : "50%"
  } as const

const radiusVariables = generateVariable(radius)

export {  
    radius,
    radiusVariables
}