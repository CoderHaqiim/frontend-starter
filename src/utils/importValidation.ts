import { cellToText, type SpreadsheetCell } from "./spreadsheet"

// The import types the app supports. Each one is described by an
// `ImportDefinition`, which is what both the modal and the validator read.
export type ImportId = "customers" | "inventory" | "transactions"

export type ImportColumn = {
  // The header the import expects, and the label the errors and the preview use.
  header: string
  // The key the value is sent under when the row is saved.
  key: string
  // Other accepted spellings of the header, e.g. "Name" for "Customer Name".
  aliases?: string[]
  // A required column must be present in the file and filled in on every row.
  required?: boolean
  // The value the template ships as an example of the expected format.
  example?: string
  // Returns the reason a filled in value was rejected, or null when it is fine.
  validate?: (value: string) => string | null
  // Applied to the value before it is sent, e.g. to store choices lowercase.
  transform?: (value: string) => string
}

export type ImportDefinition = {
  id: ImportId
  // "Customers" - used in the modal title and on the confirm button.
  title: string
  // "customer" - used in the toast.
  singular: string
  templateFileName: string
  worksheetName: string
  columns: ImportColumn[]
  importRow: (businessId: string, row: Record<string, string>) => Promise<unknown>
  // The cached queries the imported rows belong to, given as prefixes.
  queryKeys: (businessId: string) => unknown[][]
}

export type ImportRowError = {
  field: string
  message: string
}

export type ImportRow = {
  // The row number in the spreadsheet, with the header row counted as row 1.
  rowNumber: number
  payload: Record<string, string>
  // The row as it will be shown in the preview, keyed by header.
  preview: Record<string, string>
  errors: ImportRowError[]
}

export type ImportValidation = {
  hasHeaderRow: boolean
  missingColumns: string[]
  rows: ImportRow[]
  validRows: ImportRow[]
}

// The field rules the definitions are built from. Each one answers with the
// reason a value was rejected, or null when the value is acceptable, so the
// engine can report the row, the field and the reason together.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const skuPattern = /^[A-Za-z0-9][A-Za-z0-9._-]*$/
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const amountPattern = /^\d+(\.\d+)?$/

export function oneOf(allowedValues: string[]) {
  return (value: string) => {
    const isAllowed = allowedValues.some(
      (allowed) => allowed.toLowerCase() === value.trim().toLowerCase(),
    )

    return isAllowed ? null : `Use one of: ${allowedValues.join(", ")}.`
  }
}

export function emailFormat(value: string) {
  return emailPattern.test(value.trim()) ? null : "Enter a valid email address."
}

export function phoneFormat(value: string) {
  const trimmed = value.trim()

  if (!/^[+()\d\s-]+$/.test(trimmed)) {
    return "Use digits, spaces, brackets, hyphens or a leading +."
  }

  const digitCount = trimmed.replace(/\D/g, "").length

  return digitCount >= 7 && digitCount <= 15
    ? null
    : "Enter a phone number with 7 to 15 digits."
}

// A file may write amounts and stock with thousands separators, so they are
// stripped before the value is checked and before it is sent.
export function stripNumberSeparators(value: string) {
  return value.replace(/[,\s]/g, "")
}

export function wholeNumber(value: string) {
  return /^\d+$/.test(stripNumberSeparators(value))
    ? null
    : "Enter a whole number, for example 42."
}

export function positiveAmount(value: string) {
  const cleaned = stripNumberSeparators(value)

  if (!amountPattern.test(cleaned)) {
    return "Enter an amount, for example 15000 or 15000.50."
  }

  return Number(cleaned) > 0 ? null : "Enter an amount greater than 0."
}

export function isoDate(value: string) {
  const trimmed = value.trim()

  if (!isoDatePattern.test(trimmed)) {
    return "Use the YYYY-MM-DD format, for example 2026-01-31."
  }

  // The pattern also passes nonsense like 2026-02-31, so the parts are built into
  // a date and read back to prove the day exists.
  const [year, month, day] = trimmed.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  return isRealDate ? null : "Enter a real calendar date."
}

export function skuFormat(value: string) {
  return skuPattern.test(value.trim())
    ? null
    : "Use letters, numbers, dots, hyphens or underscores only, for example COF-001."
}

const normalizeHeader = (header: string) => header.replace(/\s+/g, " ").trim().toLowerCase()

export function isBlankSpreadsheetRow(cells: SpreadsheetCell[]) {
  return cells.every((cell) => cellToText(cell) === "")
}

// Reads the first row that holds anything as the header row, then matches every
// column of the definition to the header it was given, so a file keeps working
// when its columns sit in a different order or are spelled differently.
export function validateImportRows(
  definition: ImportDefinition,
  table: SpreadsheetCell[][],
): ImportValidation {
  const headerRowIndex = table.findIndex((cells) => !isBlankSpreadsheetRow(cells))

  if (headerRowIndex === -1) {
    return { hasHeaderRow: false, missingColumns: [], rows: [], validRows: [] }
  }

  const headerIndexes = new Map<string, number>()

  table[headerRowIndex].forEach((cell, index) => {
    const header = normalizeHeader(cellToText(cell))

    if (header && !headerIndexes.has(header)) {
      headerIndexes.set(header, index)
    }
  })

  const columnIndexes = definition.columns.map((column) => {
    const acceptedHeaders = [column.header, ...(column.aliases ?? [])].map(normalizeHeader)
    const foundIndex = acceptedHeaders
      .map((header) => headerIndexes.get(header))
      .find((index) => index !== undefined)

    return foundIndex ?? -1
  })

  const missingColumns = definition.columns
    .filter((column, index) => column.required && columnIndexes[index] === -1)
    .map((column) => column.header)

  if (missingColumns.length > 0) {
    return { hasHeaderRow: true, missingColumns, rows: [], validRows: [] }
  }

  const rows = table
    .map((cells, index) => ({ cells, rowNumber: index + 1 }))
    .slice(headerRowIndex + 1)
    .filter((row) => !isBlankSpreadsheetRow(row.cells))
    .map((row) => buildImportRow(definition, columnIndexes, row.cells, row.rowNumber))

  return {
    hasHeaderRow: true,
    missingColumns: [],
    rows,
    validRows: rows.filter((row) => row.errors.length === 0),
  }
}

// Turns one spreadsheet row into the payload that will be sent, the values the
// preview shows and the errors the row carries. A row with errors is kept so it
// can be listed for the user instead of being dropped quietly.
function buildImportRow(
  definition: ImportDefinition,
  columnIndexes: number[],
  cells: SpreadsheetCell[],
  rowNumber: number,
): ImportRow {
  const payload: Record<string, string> = {}
  const preview: Record<string, string> = {}
  const errors: ImportRowError[] = []

  definition.columns.forEach((column, index) => {
    const columnIndex = columnIndexes[index]
    const value = columnIndex === -1 ? "" : cellToText(cells[columnIndex])

    preview[column.header] = value

    // A column the file does not carry at all is left out rather than reported,
    // because only the required columns have to be present.
    if (!value) {
      if (column.required) {
        errors.push({ field: column.header, message: `${column.header} is required.` })
      }

      return
    }

    const reason = column.validate?.(value)

    if (reason) {
      errors.push({ field: column.header, message: `${column.header}: ${reason}` })

      return
    }

    payload[column.key] = column.transform ? column.transform(value) : value
  })

  return { rowNumber, payload, preview, errors }
}
