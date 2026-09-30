const currencySymbols: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  JPY: "¥",
  CNY: "¥",
  GHS: "₵",
  ZAR: "R",
  CAD: "$",
  AUD: "$",
}

// The currency the mock account is seeded with. It is what the app reports until the
// profile answers, and what an amount falls back to when no account currency is set.
export const defaultCurrency = "NGN"

export function getCurrencySymbol(currency: string) {
  const code = currency.trim().toUpperCase()

  return currencySymbols[code] ?? currency
}

export function getCurrencyOptions() {
  return Object.keys(currencySymbols).map((code) => ({
    label: `${getCurrencySymbol(code)} ${code}`,
    value: code,
  }))
}

// The account currency the settings page saves has to be one of the codes the
// app knows, so a saved currency always maps to a symbol.
export function isCurrencyCode(currency: string) {
  return Object.keys(currencySymbols).includes(currency.trim().toUpperCase())
}
