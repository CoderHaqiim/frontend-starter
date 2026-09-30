import { EMPTY_VALUE } from "./emptyValue"

type MonthStyle = "short" | "long"

// The dates on the documents are read as the day they were stored, so the date
// is parsed at midnight rather than at the timezone offset. A document with no
// date shows the blank space instead of an invalid date.
export function formatDate(date: string, month: MonthStyle = "short") {
  if (!date) return EMPTY_VALUE

  return new Intl.DateTimeFormat("en-NG", {
    month,
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}
