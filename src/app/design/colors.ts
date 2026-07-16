import { generateVariable } from "@/src/utils/generateVariable"
import { CSSProperties } from "react"

const colors = {
    "name": "color",
    "success": "#02681d",
    "error": "#e50000",
    "warning": "#bd8c04",
    "info": "#0534c0",
    "accent1": "#3b155c",
    "accent-lt-1":" #2dc55b",
    "accent-lt-2": "#5c153c",
    "accent2": "#3b155c33",
    "textColor1": "#1e1e1e",
    "muted": "#484646",
    "textColor2": "#4a4949",
    "background1": "#f7f7f7",
    "background2": "#e9e6e6",
    "background3": "#e6e3e3",
    "white": "#ffffff",
    "outline": "#d1cece",
    "success2": "#eaf7ec",
    "error2": "#f7e1de",
    "warning2": "#f5f0dc",
    "info2": "#ececfc"
} as const

export type ColorTypes = keyof typeof colors

const colorVariables = generateVariable(colors, colors.name)

export{
    colors,
    colorVariables
}