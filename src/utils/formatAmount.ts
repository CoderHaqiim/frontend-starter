import abridgeNumber from "./abridgeNumber"
import { getCurrencySymbol } from "./currencySymbol"

// The KPI figures the routes answer with are reported in the account currency
// without decimals, so the card shows the exact total it was given.
export const formatWholeAmount = (currency: string, amount: number) =>
  `${getCurrencySymbol(currency)}${amount.toLocaleString()}`

// The summary cards report money in the account currency, shortened with the
// abridged number so a large figure still fits on the card.
export const formatAbridgedAmount = (symbol: string, amount = 0) =>
  `${symbol} ${abridgeNumber(amount)}`
