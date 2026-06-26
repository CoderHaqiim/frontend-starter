import { ObjectRecord } from "@/src/types/types"

export const fontWeight: ObjectRecord = {
    "normal": "400",
    "medium": "500",
    "semi-bold": "600",
    "bold" :"700"
}

export const fontWeightVariables: ObjectRecord = {
    "--normal": fontWeight["normal"],
    "--medium": fontWeight["medium"],
    "--semi-bold": fontWeight["semi-bold"],
    "--bold" : fontWeight["bold"]
}