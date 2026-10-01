/*
 * The scoring behind the Business Health metrics.
 *
 * Every benchmark the calculation reads from lives in this file, so a threshold
 * can be changed here without rewriting any of the calculation. Each metric
 * takes the raw figure the business's own records produce and maps it onto a
 * 0-100 Aiki score by interpolating linearly between the benchmark points, and
 * answers with null when the figure cannot be calculated — a metric the data
 * cannot support is never turned into a performance score.
 */

// The weight each metric carries in the overall health score. The keys match the
// metrics on BusinessHealth.
export const healthMetricWeights = {
  profitability: 0.5,
  growth: 0.3,
  stability: 0.1,
  operational: 0.1,
} as const

export type HealthMetricKey = keyof typeof healthMetricWeights

// The score each health status starts at, on the existing Aiki thresholds:
// below moderate is critical, below healthy is moderate, the rest is healthy.
export const healthStatusThresholds = {
  moderate: 50,
  healthy: 75,
}

// [figure, score] benchmark points, ordered by figure.
type Benchmark = [number, number]

/*
 * Aiki's fixed product benchmarks: 25% net profit margin, for instance, is the
 * figure a 100/100 profitability score is measured at. It is a product choice
 * and not a claim about accounting standards.
 */
export const profitabilityBenchmarks: Benchmark[] = [
  [0, 0],
  [5, 20],
  [10, 40],
  [15, 60],
  [20, 75],
  [25, 100],
]

export const growthBenchmarks: Benchmark[] = [
  [-10, 0],
  [0, 30],
  [5, 40],
  [10, 50],
  [15, 60],
  [20, 70],
  [30, 85],
  [40, 100],
]

// The variation falls as revenue steadies, so the score falls as the variation
// grows: a coefficient of variation at or under 5% is fully stable.
export const stabilityBenchmarks: Benchmark[] = [
  [5, 100],
  [10, 90],
  [15, 80],
  [20, 70],
  [30, 50],
  [40, 30],
  [50, 0],
]

/*
 * Completion rate against a gradual benchmark: the score tracks the rate instead
 * of flooring it. Completing nothing scores 0 and completing everything scores
 * 100, and every point in between is interpolated linearly, so a business that
 * clears a third of its work is scored on the third it cleared rather than being
 * held at the zero the old 40% floor gave it.
 */
export const operationalBenchmarks: Benchmark[] = [
  [0, 0],
  [20, 20],
  [40, 40],
  [60, 60],
  [75, 75],
  [90, 90],
  [100, 100],
]

// Stability needs at least this many months of recorded revenue before the
// spread between them means anything.
export const minStabilityMonths = 3

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

// Linear interpolation between the benchmark points. Below the first point and
// above the last the end score holds, which is how the ≤ and ≥ benchmarks clamp.
export function interpolateScore(value: number, benchmarks: Benchmark[]): number {
  const [firstFigure, firstScore] = benchmarks[0]
  const last = benchmarks[benchmarks.length - 1]

  if (value <= firstFigure) return firstScore
  if (value >= last[0]) return last[1]

  for (let index = 1; index < benchmarks.length; index += 1) {
    const [figure, score] = benchmarks[index]

    if (value <= figure) {
      const [previousFigure, previousScore] = benchmarks[index - 1]
      const ratio = (value - previousFigure) / (figure - previousFigure)

      return clamp(previousScore + ratio * (score - previousScore), 0, 100)
    }
  }

  return last[1]
}

// Net profit margin, as a percentage, mapped onto the profitability score. Null
// when there is no revenue to take the margin against, so a business that has
// not traded is never scored as unprofitable.
export function profitabilityScore(revenue: number, expenses: number): number | null {
  if (!Number.isFinite(revenue) || revenue <= 0) return null

  const netProfitMargin = ((revenue - expenses) / revenue) * 100

  if (!Number.isFinite(netProfitMargin)) return null

  return clamp(interpolateScore(netProfitMargin, profitabilityBenchmarks), 0, 100)
}

// Revenue growth against the previous equivalent period, mapped onto the growth
// score. Null when there is no previous revenue to grow from.
export function growthScore(currentRevenue: number, previousRevenue: number): number | null {
  if (!Number.isFinite(previousRevenue) || previousRevenue <= 0) return null

  const growthRate = ((currentRevenue - previousRevenue) / previousRevenue) * 100

  if (!Number.isFinite(growthRate)) return null

  return clamp(interpolateScore(growthRate, growthBenchmarks), 0, 100)
}

// The spread of the monthly revenue observations, as a coefficient of variation,
// mapped onto the stability score. Null until enough months carry revenue for
// the spread to mean something — missing months are never filled in.
export function stabilityScore(monthlyRevenues: number[]): number | null {
  const observed = monthlyRevenues.filter((revenue) => Number.isFinite(revenue))

  if (observed.length < minStabilityMonths) return null

  const average = observed.reduce((sum, revenue) => sum + revenue, 0) / observed.length

  if (average <= 0) return null

  const variance =
    observed.reduce((sum, revenue) => sum + (revenue - average) ** 2, 0) / observed.length
  const coefficientOfVariation = (Math.sqrt(variance) / average) * 100

  if (!Number.isFinite(coefficientOfVariation)) return null

  return clamp(interpolateScore(coefficientOfVariation, stabilityBenchmarks), 0, 100)
}

/*
 * The completion rate of the period, mapped onto the operational efficiency
 * score: completed tasks over the tasks that fell due, read against the gradual
 * benchmark above. An overdue task is only ever an incomplete one, so it counts
 * as a single failure here and carries no penalty of its own.
 *
 * Null when nothing fell due in the period, because a business with no tasks to
 * complete is not an inefficient one.
 */
export function operationalScore(totalTasks: number, completedTasks: number): number | null {
  if (!Number.isFinite(totalTasks) || totalTasks <= 0) return null

  const completionRate = (completedTasks / totalTasks) * 100

  if (!Number.isFinite(completionRate)) return null

  return clamp(interpolateScore(completionRate, operationalBenchmarks), 0, 100)
}

// The overall health score from the metrics that could be calculated: the
// available weights are normalized back to 100, so a metric that is missing
// never counts against the business. Null when no metric could be calculated at
// all — the state a business without enough history answers with.
export function overallHealthScore(
  scores: Partial<Record<HealthMetricKey, number | null>>
): number | null {
  let weightedTotal = 0
  let availableWeight = 0

  Object.entries(healthMetricWeights).forEach(([key, weight]) => {
    const score = scores[key as HealthMetricKey]

    if (typeof score !== "number" || !Number.isFinite(score)) return

    weightedTotal += clamp(score, 0, 100) * weight
    availableWeight += weight
  })

  if (availableWeight === 0) return null

  return clamp(weightedTotal / availableWeight, 0, 100)
}

// The status a health score reports, on the existing Aiki thresholds.
export function getHealthStatus(score: number): "healthy" | "moderate" | "critical" {
  if (score < healthStatusThresholds.moderate) return "critical"
  if (score < healthStatusThresholds.healthy) return "moderate"
  return "healthy"
}