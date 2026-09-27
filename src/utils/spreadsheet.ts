import * as XLSX from "xlsx"

// SheetJS is the only spreadsheet parser the app uses. It reads .csv and .xlsx
// files the same way, so the import flow never needs a parser of its own.

export type Spreadsheet = XLSX.WorkBook

// A cell as SheetJS hands it back, before it is turned into text.
export type SpreadsheetCell = string | number | boolean | Date | null | undefined

export const supportedImportExtensions = [".csv", ".xlsx"]

export function isSupportedImportFile(fileName: string) {
  const lowerCaseName = fileName.toLowerCase()

  return supportedImportExtensions.some((extension) => lowerCaseName.endsWith(extension))
}

// Reads the uploaded file with the File API and hands the bytes to SheetJS. Dates
// are asked for as Date objects so a real date cell can be recognised, and the
// sheet is read as arrays so the import can match headers itself.
export async function readSpreadsheet(file: File): Promise<Spreadsheet> {
  const data = await file.arrayBuffer()

  return XLSX.read(data, { type: "array", cellDates: true })
}

export function getWorksheetNames(workbook: Spreadsheet) {
  return workbook.SheetNames
}

// Rows are kept with their original positions so a validation error can point at
// the row number the user sees in their spreadsheet.
export function getWorksheetRows(workbook: Spreadsheet, worksheetName: string): SpreadsheetCell[][] {
  const worksheet = workbook.Sheets[worksheetName]

  if (!worksheet) return []

  return XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    blankrows: true,
    defval: "",
    raw: true,
  }) as SpreadsheetCell[][]
}

export function cellToText(cell: SpreadsheetCell) {
  if (cell === null || cell === undefined) return ""

  if (cell instanceof Date) return formatIsoDate(cell)

  return String(cell).trim()
}

// SheetJS hands dates back as UTC, so the parts are read in UTC as well. Reading
// them locally would move an Excel date by a day in some timezones.
export function formatIsoDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

// The template carries the headers the import expects next to an example row, so
// it doubles as the format guide.
function buildTemplateWorksheet(headers: string[], exampleRow: string[]) {
  const worksheet = XLSX.utils.aoa_to_sheet([headers, exampleRow])

  worksheet["!cols"] = headers.map((header) => ({ wch: Math.max(header.length + 2, 14) }))

  return worksheet
}

export function downloadSpreadsheetTemplate(
  fileName: string,
  worksheetName: string,
  headers: string[],
  exampleRow: string[],
) {
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, buildTemplateWorksheet(headers, exampleRow), worksheetName)

  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export function downloadCsvTemplate(fileName: string, headers: string[], exampleRow: string[]) {
  const worksheet = buildTemplateWorksheet(headers, exampleRow)
  const csv = XLSX.utils.sheet_to_csv(worksheet)
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
  const link = document.createElement("a")

  link.href = url
  link.download = `${fileName}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
