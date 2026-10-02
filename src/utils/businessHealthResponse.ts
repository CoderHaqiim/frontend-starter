import { businesses } from "@/src/data/businesses"
import { syncOverdueTasks, tasks } from "@/src/data/tasks"
import { transactions } from "@/src/data/transactions"
import { BusinessHealth, Duration, HealthType } from "@/src/types/types"
import {
  getHealthStatus,
  growthScore,
  overallHealthScore,
  operationalScore,
  profitabilityScore,
  stabilityScore,
} from "@/src/utils/businessHealthScore"
import decimalToWholeNumber from "@/src/utils/decimalToWholeNumber"
import { DateRange, getPeriodWindows, isWithinRange, toIsoDate } from "@/src/utils/dateRange"
import { isTaskOverdue } from "@/src/utils/taskOverdue"

type BusinessHealthRecord = Pick<BusinessHealth, "businessId" | "period">

// The metric scores a business answers with: null is a metric its records could
// not support, never a score of zero performance.
type MetricScores = { [Key in keyof BusinessHealth["metrics"]]: number | null }

const businessPeriods: BusinessHealth["period"][] = ["weekly", "monthly", "annual"]

type HealthStore = {
  records: BusinessHealthRecord[]
}

// Next.js gives every route module its own copy of a plain module export, so the
// health store is parked on globalThis to keep one copy per server process. That
// is what lets the records registered by the create route be seen by the health
// routes. The store holds only which businesses report health — the metrics are
// read from each business's own transactions and tasks on every request, so a
// record here is never a fabricated score.
const globalStore = globalThis as typeof globalThis & { businessHealthStore?: HealthStore }

const healthStore: HealthStore = globalStore.businessHealthStore ?? {
  records: businesses.flatMap((business) =>
    businessPeriods.map((period) => ({ businessId: business.id, period }))
  ),
}

globalStore.businessHealthStore = healthStore

export const businessHealthRecords = healthStore.records

// The revenue a business recorded inside a window, leaving the cancelled
// transactions out of the figure the way every report does.
const revenueIn = (businessId: string, range: DateRange) =>
  transactions
    .filter(
      (transaction) =>
        transaction.businessId === businessId &&
        transaction.type === "income" &&
        transaction.status !== "cancelled" &&
        isWithinRange(transaction.date, range)
    )
    .reduce((total, transaction) => total + transaction.amount, 0)

const expensesIn = (businessId: string, range: DateRange) =>
  transactions
    .filter(
      (transaction) =>
        transaction.businessId === businessId &&
        transaction.type === "expense" &&
        transaction.status !== "cancelled" &&
        isWithinRange(transaction.date, range)
    )
    .reduce((total, transaction) => total + transaction.amount, 0)

/*
 * The monthly revenue observations the stability metric reads: the last six
 * calendar months, keeping only the months the business actually recorded
 * income in. A month without revenue is left out rather than filled in with a
 * zero that never happened.
 */
const monthlyRevenues = (businessId: string, today = new Date()): number[] => {
  const observations: number[] = []

  for (let offset = 0; offset < 6; offset += 1) {
    const monthStart = new Date(today.getFullYear(), today.getMonth() - offset, 1)
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
    const revenue = revenueIn(businessId, {
      start: toIsoDate(monthStart),
      end: toIsoDate(monthEnd),
    })

    if (revenue > 0) {
      observations.push(revenue)
    }
  }

  return observations
}

// The four metric scores, read from the business's own transactions and tasks
// for the period being reported. A figure the data cannot support answers with
// null instead of a guessed score.
const computeMetricScores = (businessId: string, period: Duration): MetricScores => {
  const { current, previous } = getPeriodWindows(period)
  // The statuses are read through the overdue rule, so a task that went past its
  // due date while the process was running is counted as a failure here too.
  syncOverdueTasks()

  const revenue = revenueIn(businessId, current)
  const expenses = expensesIn(businessId, current)
  const previousRevenue = revenueIn(businessId, previous)

  /*
   * The tasks operational efficiency is measured on.
   *
   * Two groups of task are evaluated, and each task is counted once no matter
   * which group it falls in:
   *
   * - Tasks due inside the report window. A completed one counts as completed
   *   and one still open when the window closes counts as a failure.
   * - Tasks already overdue from before the window. These are failures, and
   *   nothing further is taken off for them: being overdue is the same failure
   *   as being incomplete, so it is counted once and not penalised twice.
   *
   * Tasks due after today are excluded, because the day they are due for has not
   * arrived and a future task cannot have been completed late.
   */
  const dueInPeriod = tasks.filter(
    (task) => task.businessId === businessId && isWithinRange(task.dueDate, current)
  )
  const overdueBefore = tasks.filter(
    (task) =>
      task.businessId === businessId &&
      isTaskOverdue(task) &&
      (current.start === undefined || task.dueDate < current.start)
  )
  // A task due inside the window is not also read as an overdue one from before
  // it, so the two groups are joined on the id and no task is counted twice.
  const evaluatedTaskIds = new Set([...dueInPeriod, ...overdueBefore].map((task) => String(task.id)))
  const evaluatedTasks = tasks.filter(
    (task) => task.businessId === businessId && evaluatedTaskIds.has(String(task.id))
  )
  const completedTasks = evaluatedTasks.filter((task) => task.status === "completed").length

  return {
    profitability: profitabilityScore(revenue, expenses),
    growth: growthScore(revenue, previousRevenue),
    stability: stabilityScore(monthlyRevenues(businessId)),
    // Nothing fell due in the period at all answers with null rather than zero: a
    // business with no tasks waiting on it has not shown that it completes the
    // work it takes on, so the metric reports as unavailable.
    operational:
      dueInPeriod.length === 0 ? null : operationalScore(evaluatedTasks.length, completedTasks),
  }
}

export const toBusinessHealthResponse = (health: BusinessHealthRecord): BusinessHealth => {
  const scores = computeMetricScores(health.businessId, health.period)
  // Whole numbers only: each metric reads the same in the response as it does on
  // screen, and the overall score is calculated from the values that are shown.
  const roundedScores: MetricScores = {
    profitability: scores.profitability === null ? null : decimalToWholeNumber(scores.profitability),
    growth: scores.growth === null ? null : decimalToWholeNumber(scores.growth),
    stability: scores.stability === null ? null : decimalToWholeNumber(scores.stability),
    operational: scores.operational === null ? null : decimalToWholeNumber(scores.operational),
  }
  const insufficientMetrics = (
    Object.keys(roundedScores) as (keyof BusinessHealth["metrics"])[]
  ).filter((key) => roundedScores[key] === null)
  // The metrics that could be calculated carry the score on their own weights,
  // normalized back to 100, so a metric the records cannot support never counts
  // against the business. A business with nothing to measure answers with no
  // score at all rather than a fabricated one.
  const partialScore = overallHealthScore(roundedScores)
  const healthScore = partialScore === null ? 0 : decimalToWholeNumber(partialScore)
  const healthStatus: HealthType =
    partialScore === null ? "insufficient" : getHealthStatus(healthScore)

  return {
    ...health,
    healthScore,
    healthStatus,
    metrics: {
      profitability: roundedScores.profitability ?? 0,
      growth: roundedScores.growth ?? 0,
      stability: roundedScores.stability ?? 0,
      operational: roundedScores.operational ?? 0,
    },
    insufficientMetrics,
  }
}

// A business created through the API registers a record per period so the health
// routes can find it — the scores themselves are read from the business's own
// records at the moment it is asked for.
export const registerBusinessHealth = (businessId: string) => {
  businessPeriods.forEach((period) => {
    const isRegistered = businessHealthRecords.some(
      (record) => record.businessId === businessId && record.period === period
    )

    if (isRegistered) return

    businessHealthRecords.push({ businessId, period })
  })
}

export const unregisterBusinessHealth = (businessId: string) => {
  businessPeriods.forEach((period) => {
    const recordIndex = businessHealthRecords.findIndex(
      (record) => record.businessId === businessId && record.period === period
    )

    if (recordIndex !== -1) {
      businessHealthRecords.splice(recordIndex, 1)
    }
  })
}