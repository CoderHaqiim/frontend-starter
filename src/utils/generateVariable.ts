import { ObjectRecordType } from "../types/types";

export const generateVariable = (object: ObjectRecordType) => {
  return (
    Object.fromEntries(
        Object.entries(object).map(([key, value]) => [`--${key}`, value])
    )
  )
}