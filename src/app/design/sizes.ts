import { generateVariable } from "@/src/utils/generateVariable"

const elementSizes = {
    "xs": "24px",
    "sm": "30px",
    "md": "40px",
    "lg": "44px",
    "xl": "48px",
    "xxl": "52px",
} as const

const paddingSizes = {
    "xs": "px-[10px] gap-1",
    "sm": "px-[12px] gap-1",
    "md": "px-[15px] gap-2",
    "lg": "px-[20px] gap-2",
    "xl": "px-[25px] gap-3",
    "xxl": "px-[30px] gap-3",
} as const

const elementSizesVariables = generateVariable(elementSizes)
const paddingSizesVariables = generateVariable(paddingSizes) 

export {
    elementSizes,
    paddingSizes,
    elementSizesVariables,
    paddingSizesVariables
}