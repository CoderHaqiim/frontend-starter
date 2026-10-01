// Today's date in the form the stores keep, e.g. "2026-08-12".
export const todayIsoDate = () => new Date().toISOString().slice(0, 10)

/*
 * Whether a task's due date falls on the current calendar day.
 *
 * The comparison is done on the calendar parts of both dates rather than on the
 * ISO strings, because `toISOString` reports in UTC: a business in a timezone
 * behind UTC would otherwise read as due the day before or after the one the user
 * is looking at. Building the date with an explicit midnight keeps it on the
 * reader's own calendar day, which is the day a task is due on.
 */
export const isDueToday = (dueDate: string, today: Date = new Date()) => {
  const date = new Date(`${dueDate}T00:00:00`)

  return date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate()
}
