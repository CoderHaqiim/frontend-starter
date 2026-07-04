import { generateVariable } from "@/src/utils/generateVariable"

const colors = {
    "name": "color",
    "success": "#02681d",
    "error": "#e50000",
    "warning": "#bd8c04",
    "info": "#0534c0",
    "accent1": "#45086d",
    "accent2": "#ece1f3",
    "textColor1": "#1e1e1e",
    "muted": "#484646",
    "textColor2": "#575656",
    "background1": "#ffffff",
    "background2": "#fdfdfd",
    "background3": "#f2f1f1",
    "white": "#ffffff",
    "outline": "#d4d3d3"
} as const

const colorVariables = generateVariable(colors, colors.name)

export{
    colors,
    colorVariables
}