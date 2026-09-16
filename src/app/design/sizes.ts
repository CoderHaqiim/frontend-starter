import { generateVariable } from "@/src/utils/generateVariable"

const elementSizes = {
    "name": "elementSize",
    "xxs": "24px",
    "xs": "28px",
    "sm": "32px",
    "md": "36px",
    "lg": "40px",
    "xl": "44px",
    "xxl": "48px",
} as const

const paddingSizes = {
    "name": "paddingSize",
    "xxs": "px-[4px] gap-[var(--space-xs)]",
    "xs": "px-[8px] gap-[var(--space-sm)]",
    "sm": "px-[12px] gap-[var(--space-sm)]",
    "md": "px-[16px] gap-[var(--space-md)]",
    "lg": "px-[20px] gap-[var(--space-md)]",
    "xl": "px-[24px] gap-3",
    "xxl": "px-[38px] gap-3",
} as const

const elementSizesVariables = generateVariable(elementSizes, elementSizes.name)
const paddingSizesVariables = generateVariable(paddingSizes, paddingSizes.name) 

export {
    elementSizes, elementSizesVariables, paddingSizes, paddingSizesVariables
}

