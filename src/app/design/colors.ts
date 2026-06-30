import { ObjectRecord } from "@/src/types/types"
import { CSSProperties } from "react"

export const colors: ObjectRecord = {
    success: "#02681d",
    error: "#e50000",
    warning: "#bd8c04",
    info: "#0534c0",
    accent1: "#45086d",
    accent2: "#d397fa",
    textColor1: "#1e1e1e",
    muted: "#484646",
    textColor2:"#535151",
    background1:"#ffffff",
    background2: "#f7f6f6",
    background3: "#ede9e9",
    white: "#ffffff",
    outline:"#dbd9d9"
}


export const colorVariables = {
    "--success" : colors.success,
    "--error" : colors.error,
    "--warning" : colors.warning,
    "--info" : colors.info,
    "--accent1" : colors.accent1,
    "--accent2" : colors.accent2,
    "--textColor1" : colors.textColor1,
    "--textColor2" : colors.textColor2,
    "--background1":  colors.background1,
    "--background2":   colors.background2,
    "--background3": colors.background3,
    "--background4": colors.background4,
    "--white": colors.white,
    "--outline" : colors.outline
} as CSSProperties