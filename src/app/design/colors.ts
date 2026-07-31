import { generateVariable } from "@/src/utils/generateVariable"

export type ThemeType = "light" | "dark"
export type ColorTypes = keyof typeof lightColors
export type ColorVariables = typeof colorVariables
export type ColorsMap = Record<keyof typeof lightColors, string>

const staticColors= {
    "name": "color",
    "success": "#02681d",
    "success2": "#02681d20",
    "error": "#e50000",
    "error2": "#e5000020",
    "warning": "#bd8c04",
    "warning2": "#bd8c0420",
    "info": "#0534c0",
    "info2": "#0534c020",
    "gold" : "#bd8c04",
}

const lightColors = {
    ...staticColors,
    "accent": "#3b155c",
    "accent-lt-1":" #2dc55b",
    "accent-lt-2": "#5c153c",
    "accent2": "#3b155c38",
    "shadow":"#00000009",
    "textColor1": "#1e1e1e",
    "muted": "#b1b0b0",
    "muted2": "#f7f7f7",
    "textColor2": "#4c4c4c",
    "background1": "#fdfdfd",
    "background2": "#f7f7f7",
    "background3": "#e9e9e9",
    "white": "#ffffff",
    "outline2": "#b5b5b5",
    "outline1": "#d3d3d3",
} as const

const darkColors: ColorsMap = {
    ...staticColors,
    "accent": "#1d9bf0",
    "accent-lt-1": "#00ba7c",
    "accent-lt-2": "#7856ff",
    "accent2": "#1d9bf02e",
    "shadow":"#ffffff14",
    "textColor1": "#e7e9ea",
    "muted": "#71767b",
    "muted2": "#16181c",
    "textColor2": "#8b98a5",
    "background1": "#050505",
    "background2": "#0a0a0a",
    "background3": "#101010",
    "white": "#010101",
    "outline2": "#333333",
    "outline1": "#222222",
}

const themeColors = {
    light: lightColors,
    dark: darkColors,
}

const colors = lightColors

const colorVariables = generateVariable(lightColors, lightColors.name)

const getColorVariables = (theme: ThemeType) => {
    return generateVariable(themeColors[theme], themeColors[theme].name)
}



export{
    colors,
    colorVariables,
    getColorVariables,
    // colorVariable,
    themeColors
}
