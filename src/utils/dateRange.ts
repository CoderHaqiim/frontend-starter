import { Duration } from "@/src/types/types"

/*
 * The date handling the KPI windows share.
 *
 * A report window ends today and looks back over a fixed number of days, and the
 * figure each window reports is compared against the window of the same length
 * directly before it. Dates are compared as ISO dates (YYYY-MM-DD), which is the
 * format the transaction store keeps, so the comparison stays string-only.
 */

// A window is open ended when only one of its bounds matters, which is how the
// cash balance reads everything that settled up to a given day.
export type DateRange = {
  start?: string
  end?: string
}

// How many days each report period looks back over.
export const PERIOD_DAYS: Record<Duration, number> = {
  weekly: 7,
  monthly: 30,
  annual: 365,
}

// Built from the local date parts rather than the ISO string, so a window never
// slips a day for a server that is not running in UTC.
export const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

// Calendar arithmetic: handing a negative day to the Date constructor rolls the
// month and the year back correctly.
export const dateDaysAgo = (days: number, today = new Date()) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)

export const isWithinRange = (date: string, { start, end }: DateRange) =>
  (start === undefined || date >= start) && (end === undefined || date <= end)

// The window a period reports on and the window it is measured against: both end
// on a day boundary, and the previous one sits directly before the current one.
export const getPeriodWindows = (period: Duration, today = new Date()) => {
  const days = PERIOD_DAYS[period]

  return {
    current: {
      start: toIsoDate(dateDaysAgo(days - 1, today)),
      end: toIsoDate(today),
    },
    previous: {
      start: toIsoDate(dateDaysAgo(days * 2 - 1, today)),
      end: toIsoDate(dateDaysAgo(days, today)),
    },
  }
}
