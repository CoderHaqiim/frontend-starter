import { ObjectRecordType } from "../types/types";

export const generateVariable = (object: ObjectRecordType, name: string) => {
  return (
    Object.fromEntries(
        Object.entries(object).map(([key, value]) => [`--${name}-${key}`, value])
    )
  )
}