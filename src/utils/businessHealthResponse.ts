import { BusinessHealth, HealthType } from "@/src/types/types"
import decimalToWholeNumber from "@/src/utils/decimalToWholeNumber"

type HealthMetricValues = BusinessHealth["metrics"]

type BusinessHealthRecord = Pick<BusinessHealth, "businessId" | "period">

const seedMetricWeights: Record<string, HealthMetricValues> = {
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

type HealthStore = {
  metricWeights: Record<string, HealthMetricValues>
  records: BusinessHealthRecord[]
}

// Next.js gives every route module its own copy of a plain module export, so the
// health store is parked on globalThis to keep one copy per server process. That
// is what lets the records registered by the create route be seen by the health
// routes.
const globalStore = globalThis as typeof globalThis & { businessHealthStore?: HealthStore }

const healthStore: HealthStore = globalStore.businessHealthStore ?? {
  metricWeights: seedMetricWeights,
  records: Object.keys(seedMetricWeights).map((key) => {
    const [businessId, period] = key.split("-")
    return { businessId, period: period as BusinessHealth["period"] }
  }),
}

globalStore.businessHealthStore = healthStore

const metricWeights = healthStore.metricWeights

export const businessHealthRecords = healthStore.records

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

const businessPeriods: BusinessHealth["period"][] = ["weekly", "monthly", "annual"]

// A business created through the API has no trading history, so it starts from a
// flat metric set. Both the metrics and the listing entry are registered, because
// the listing is built from the metrics when this module is first loaded.
const defaultMetrics: HealthMetricValues = {
  operational: 0,
  growth: 0,
  stability: 0,
  profitability: 0,
}

export const registerBusinessHealth = (businessId: string) => {
  businessPeriods.forEach((period) => {
    const metricKey = `${businessId}-${period}`

    if (metricWeights[metricKey]) return

    metricWeights[metricKey] = { ...defaultMetrics }
    businessHealthRecords.push({ businessId, period })
  })
}

export const unregisterBusinessHealth = (businessId: string) => {
  businessPeriods.forEach((period) => {
    delete metricWeights[`${businessId}-${period}`]

    const recordIndex = businessHealthRecords.findIndex(
      (record) => record.businessId === businessId && record.period === period
    )

    if (recordIndex !== -1) {
      businessHealthRecords.splice(recordIndex, 1)
    }
  })
}