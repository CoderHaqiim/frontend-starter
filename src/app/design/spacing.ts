import { generateVariable } from "@/src/utils/generateVariable"

const space = {
    "name": "space",
    "xxs": "2px",
    "xs": "4px",
    "sm": "6px",
    "md": "10px",
    "lg": "16px",
    "xl" : "32px",
    "xxl" : "40px"
}as const

const spaceVariables = generateVariable(space, space.name)

export {
    space, 
    spaceVariables
}