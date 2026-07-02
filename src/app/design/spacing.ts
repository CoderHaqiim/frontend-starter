import { generateVariable } from "@/src/utils/generateVariable"

const space = {
    "xs": "4px",
    "sm": "6px",
    "md": "10px",
    "lg": "16px",
    "xl" : "32px",
    "xxl" : "40px"
}as const

const spaceVariables = generateVariable(space)

export {
    space, 
    spaceVariables
}