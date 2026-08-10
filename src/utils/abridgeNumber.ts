export default function abridgeNumber(input: string): string {
  if (!input || typeof input !== "string") return String(input)

  const sepRegex = /\s*(?:-|–|—|to)\s*/i
  const parts = input.split(sepRegex)

  const formatPart = (part: string) => {
    let s = part.trim()
    if (!s) return s

    // extract leading currency/unit characters (like $, €, £, GBP)
    const leadingMatch = s.match(/^([^0-9.+\-\s]+)/)
    const currency = leadingMatch ? leadingMatch[1] : ""
    if (currency) s = s.slice(currency.length).trim()

    // remove commas
    s = s.replace(/,/g, "")

    // detect unit suffix (k, m, b)
    const unitMatch = s.match(/([kKmMbB])$/)
    let multiplier = 1
    if (unitMatch) {
      const u = unitMatch[1].toLowerCase()
      if (u === 'k') multiplier = 1e3
      if (u === 'm') multiplier = 1e6
      if (u === 'b') multiplier = 1e9
      s = s.slice(0, -1)
    }

    // parse number
    const num = parseFloat(s)
    if (Number.isNaN(num)) return part.trim()
    const full = num * multiplier

    // choose abbreviation
    let abVal: number | null = null
    let suffix = ''
    if (Math.abs(full) >= 1e9) {
      abVal = full / 1e9
      suffix = 'M' // user wanted M for millions; for billions use 'B'
      // if >=1e9, use B
      suffix = 'B'
    } else if (Math.abs(full) >= 1e6) {
      abVal = full / 1e6
      suffix = 'M'
    } else if (Math.abs(full) >= 1e3) {
      abVal = full / 1e3
      suffix = 'k'
    }

    if (abVal === null) {
      // nothing to abbreviate
      return currency + Intl.NumberFormat().format(full)
    }

    // format value: keep one decimal if needed
    const display = abVal % 1 === 0 ? String(abVal) : String(Number(abVal.toFixed(1)))

    return `${currency}${display}${suffix}`
  }

  const formattedParts = parts.map(formatPart)
  return formattedParts.join(' - ')
}
