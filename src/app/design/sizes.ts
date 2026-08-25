import { generateVariable } from "@/src/utils/generateVariable"
import { space } from "./spacing"

const elementSizes = {
    "name": "elementSize",
    "xxs": "24px",
    "xs": "28px",
    "sm": "36px",
    "md": "40px",
    "lg": "44px",
    "xl": "48px",
    "xxl": "56px",
} as const

const paddingSizes = {
    "name": "paddingSize",
    "xxs": "px-[4px] gap-[var(--space-sm)]",
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
    elementSizes,
    paddingSizes,
    elementSizesVariables,
    paddingSizesVariables
}