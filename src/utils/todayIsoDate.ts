// Today's date in the form the stores keep, e.g. "2026-08-12".
export const todayIsoDate = () => new Date().toISOString().slice(0, 10)
