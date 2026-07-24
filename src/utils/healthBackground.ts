import { ColorTypes } from "../app/design/colors"
import { healthMap } from "./healthMap"

export function generateHealthBackground(health: string){
    const healthBackground: ColorTypes= `${healthMap[health]}2` as ColorTypes
    return healthBackground
}

export function generateLightBackground(color: ColorTypes){
    const lightBackground: ColorTypes= `${color}2` as ColorTypes
    return lightBackground
}