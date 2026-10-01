import { ColorTypes } from "../app/design/colors"
import { healthMap } from "./healthMap"

export function generateHealthBackground(health: string){
    const color = healthMap[health]

    // There is no tinted "textColor22" behind a score that could not be
    // calculated, so the insufficient state sits on the neutral surface.
    if (!color || color === "textColor2") {
        return "background1" as ColorTypes
    }

    const healthBackground: ColorTypes= `${color}2` as ColorTypes
    return healthBackground
}

export function generateLightBackground(color: ColorTypes){
    // The tinted backgrounds are named after the colour they sit behind
    // ("error" -> "error2"), so a plain text colour has no matching tint and would
    // resolve to a name that is not in the palette at all. A text colour is a
    // neutral one, so it sits on the neutral surface instead, the same way an
    // unscoreable health does.
    if (color === "textColor1" || color === "textColor2") {
        return "muted2" as ColorTypes
    }

    const lightBackground: ColorTypes= `${color}2` as ColorTypes
    return lightBackground
}