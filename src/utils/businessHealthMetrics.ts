import { BusinessHealth } from "@/src/types/types"

interface BusinessHealthMetric {
  key: keyof BusinessHealth["metrics"]
  label: string
  description: string
}

export const businessHealthMetrics: BusinessHealthMetric[] = [
  {
    "key": "profitability",
    "label": "Profitability",
    "description": "How much of its income the business keeps as profit in the reported period, measured by net profit margin. Contributes 50% of the overall Business Health score."
  },
  {
    "key": "growth",
    "label": "Growth",
    "description": "Revenue growth against the previous equivalent period. Contributes 30% of the overall Business Health score."
  },
  {
    "key": "stability",
    "label": "Stability",
    "description": "How steady monthly revenue has been over the last six months. Contributes 10% of the overall Business Health score."
  },
  {
    "key": "operational",
    "label": "Operational Efficiency",
    "description": "Completed tasks over the tasks that fell due in the period, with anything overdue counting as a failure. The score follows the completion rate from 0 to 100. Contributes 10% of the overall Business Health score."
  }
]