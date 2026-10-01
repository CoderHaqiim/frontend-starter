import { ColorTypes } from "../app/design/colors"

export const healthMap: Record< string , ColorTypes > = {
  "healthy": "success",
  "moderate": "warning",
  "critical": "error",
  // A score that could not be calculated reads in the neutral secondary colour,
  // never in the red a critical score wears.
  "insufficient": "textColor2"
}