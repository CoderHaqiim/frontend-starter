import { generateVariable } from "@/src/utils/generateVariable"

const colors = {
    success: "#02681d",
    error: "#e50000",
    warning: "#bd8c04",
    info: "#0534c0",
    accent1: "#45086d",
    accent2: "#d397fa",
    textColor1: "#1e1e1e",
    muted: "#484646",
    textColor2:"#5e5d5d",
    background1:"#ffffff",
    background2: "#f7f6f6",
    background3: "#ede9e9",
    white: "#ffffff",
    outline:"#cecccc"
} as const

const colorVariables = generateVariable(colors)

export{
    colors,
    colorVariables
}