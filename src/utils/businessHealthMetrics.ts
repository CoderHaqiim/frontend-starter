import { BusinessHealth } from "@/src/types/types"

export const businessHealthMetrics: {
  key: keyof BusinessHealth["metrics"]
  label: string
  description: string
}[] = [
  {
    "key": "profitability",
    "label": "Profitability",
    "description": "Measures how effectively your business generates profit from its income. Contributes 50% of the overall Business Health score."
  },
  {
    "key": "growth",
    "label": "Growth",
    "description": "Percentage increase in revenue over the last quarter"
  },
  {
    "key": "stability",
    "label": "Stability",
    "description": "Total number of customers"
  },
  {
    "key": "operational",
    "label": "Operational Efficiency",
    "description": "Efficiency of business operations"
  }
]