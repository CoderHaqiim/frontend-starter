import { generateVariable } from "@/src/utils/generateVariable"

export type ThemeType = "light" | "dark"
export type ColorTypes = keyof typeof lightColors
export type ColorVariables = typeof colorVariables
export type ColorsMap = Record<keyof typeof lightColors, string>

const staticColors= {
    "name": "color",
    "success": "#02681d",
    "success2": "#02681d18",
    "error": "#e50000",
    "error2": "#e5000018",
    "warning": "#bd8c04",
    "warning2": "#bd8c0418",
    "info": "#0534c0",
    "info2": "#0534c018",
    "gold" : "#bd8c04",
}

const lightColors = {
    ...staticColors,
    "accent": "#4a1b72",
    "accent2": "#3b155c40",
    "accent3": "#3b155c10",
    "shadow":"#00000009",
    "textColor1": "#1e1e1e",
    "textColor2": "#555555",
    "muted": "#9e9d9d",
    "muted2": "#e7e5e5",
    "background1": "#fbfbfb",
    "background2": "#f9f9f9",
    "background3": "#f4f4f4",
    "white": "#ffffff",
    "outline3": "#c0c0c0",
    "outline2": "#dddddd",
    "outline1": "#d5d5d5",
} as const

const darkColors: ColorsMap = {
    ...staticColors,
    "accent": "#1d9bf0",
    "accent2": "#1d9cf040",
    "accent3": "#1d9cf010",
    "shadow":"#ffffff14",
    "textColor1": "#e7e9ea",
    "muted": "#676b6e",
    "muted2": "#16181c",
    "textColor2": "#8b98a5",
    "background1": "#050505",
    "background2": "#0a0a0a",
    "background3": "#101010",
    "white": "#010101",
    "outline2": "#333333",
    "outline3": "#a1a1a1",
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



export {
    colors,
    colorVariables,
    getColorVariables,
    themeColors
}

