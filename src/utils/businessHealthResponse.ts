import { BusinessHealth, HealthType } from "@/src/types/types"
import decimalToWholeNumber from "@/src/utils/decimalToWholeNumber"

type HealthMetricValues = BusinessHealth["metrics"]

type BusinessHealthRecord = Pick<BusinessHealth, "businessId" | "period">

const metricWeights: Record<string, HealthMetricValues> = {
  "0-weekly": { operational: 30, growth: 22, stability: 18, profitability: 100 },
  "0-monthly": { operational: 19, growth: 21, stability: 18, profitability: 22 },
  "0-annual": { operational: 16, growth: 17, stability: 15, profitability: 17 },
  
  "1-weekly": { operational: 40, growth: 4, stability: 20, profitability: 30},
  "1-monthly": { operational: 5, growth: 5, stability: 4, profitability: 6 },
  "1-annual": { operational: 11, growth: 12, stability: 10, profitability: 12 },

  "2-weekly": { operational: 50, growth: 14, stability: 12, profitability: 80 },
  "2-monthly": { operational: 7, growth: 8, stability: 7, profitability: 8 },
  "2-annual": { operational: 7, growth: 7, stability: 6, profitability: 8 },

  "3-weekly": { operational: 22, growth: 23, stability: 21, profitability: 22 },
  "3-monthly": { operational: 23, growth: 24, stability: 21, profitability: 22 },
  "3-annual": { operational: 21, growth: 22, stability: 20, profitability: 21 },

  "4-weekly": { operational: 99, growth: 9, stability: 8, profitability: 55},
  "4-monthly": { operational: 12, growth: 13, stability: 12, profitability: 13 },
  "4-annual": { operational: 14, growth: 15, stability: 14, profitability: 15 },
}

export const businessHealthRecords: BusinessHealthRecord[] = Object.keys(metricWeights).map((key) => {
  const [businessId, period] = key.split("-")
  return { businessId, period: period as BusinessHealth["period"] }
})

const getHealthStatus = (score: number): HealthType => {
  if (score < 50) return "critical"
  if (score < 75) return "moderate"
  return "healthy"
}

export const toBusinessHealthResponse = (health: BusinessHealthRecord): BusinessHealth => {
  const metrics = metricWeights[`${health.businessId}-${health.period}`]

  if (!metrics) {
    throw new Error(`Health metrics not found for ${health.businessId}-${health.period}`)
  }
  const {
    operational: operationalEfficiencyScore,
    growth: growthScore,
    stability: stabilityScore,
    profitability: profitabilityScore,
  } = metrics
  const decimalHealthScore =
    profitabilityScore * 0.5 +
    growthScore * 0.3 +
    stabilityScore * 0.1 +
    operationalEfficiencyScore * 0.1
  const healthScore = decimalToWholeNumber(decimalHealthScore)

  return {
    ...health,
    healthScore,
    healthStatus: getHealthStatus(healthScore),
    metrics,
  }
}