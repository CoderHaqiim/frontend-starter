import { generateVariable } from "@/src/utils/generateVariable"

  const radius = {
    "name": "radius",
    "xxs" : "2px",
    "xs" : "4px",
    "sm" : "8px",
    "md" : "16px",
    "lg" : "32px",
    "xl" : "60px",
    "xxl" : "50%"
  } as const

const radiusVariables = generateVariable(radius, radius.name)

export {  
    radius,
    radiusVariables
}