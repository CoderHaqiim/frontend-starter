import { generateVariable } from "@/src/utils/generateVariable"

const colors = {
    "name": "color",
    "success": "#02681d",
    "error": "#e50000",
    "warning": "#bd8c04",
    "info": "#0534c0",
    "accent1": "#380758",
    "accent2": "#f2ecf5",
    "textColor1": "#1e1e1e",
    "muted": "#484646",
    "textColor2": "#535151",
    "background1": "#fbfbfb",
    "background2": "#f5f5f5",
    "background3": "#e6e3e3",
    "white": "#ffffff",
    "outline": "#d4d3d3",
    "success2": "#eaf7ec",
    "error2": "#f7e1de",
    "warning2": "#f5f0dc",
    "info2": "#ececfc"
} as const

const colorVariables = generateVariable(colors, colors.name)

export{
    colors,
    colorVariables
}