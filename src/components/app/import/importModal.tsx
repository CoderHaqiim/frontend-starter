"use client"

import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { ToastType } from "@/src/types/types"
import {
  isBlankSpreadsheetRow,
  validateImportRows,
  type ImportId,
  type ImportValidation,
} from "@/src/utils/importValidation"
import {
  downloadCsvTemplate,
  downloadSpreadsheetTemplate,
  getWorksheetNames,
  getWorksheetRows,
  isSupportedImportFile,
  readSpreadsheet,
  supportedImportExtensions,
  type Spreadsheet,
} from "@/src/utils/spreadsheet"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Popup from "../../base/ui/composites/popup"
import Table from "../../base/ui/composites/table"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"
import { getTemplateRows, importDefinitions } from "./importDefinitions"

type ImportModalProps = {
  definitionId: ImportId
  businessId: string
}

// How many valid rows the preview shows before it counts the rest instead.
const previewRowLimit = 10

const acceptedFileTypes = supportedImportExtensions.join(" or ")

// The one modal every import type shares. It reads the file, validates the rows
// against the definition for the type and only saves the rows the user confirms.
export default function ImportModal({ definitionId, businessId }: ImportModalProps) {
  const definition = importDefinitions[definitionId]
  const { headers, exampleRow } = getTemplateRows(definition)
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const queryClient = useQueryClient()

  const [workbook, setWorkbook] = useState<Spreadsheet | null>(null)
  const [fileName, setFileName] = useState("")
  const [worksheetNames, setWorksheetNames] = useState<string[]>([])
  const [worksheetName, setWorksheetName] = useState("")
  const [validation, setValidation] = useState<ImportValidation | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [importedCount, setImportedCount] = useState(0)

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const closeImportModal = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const clearLoadedFile = () => {
    setWorkbook(null)
    setFileName("")
    setWorksheetNames([])
    setWorksheetName("")
    setValidation(null)
  }

  // The preview and the checks both come from the worksheet in use, so picking a
  // different one runs the checks again against that sheet.
  const loadWorksheet = (sourceWorkbook: Spreadsheet, name: string) => {
    setWorksheetName(name)

    const rows = getWorksheetRows(sourceWorkbook, name)

    if (rows.every(isBlankSpreadsheetRow)) {
      setValidation(null)
      setFileError(
        `The "${name}" worksheet is empty. Add the template headers and your rows, then upload the file again.`,
      )
      return
    }

    const result = validateImportRows(definition, rows)

    if (result.missingColumns.length > 0) {
      setValidation(null)
      setFileError(
        `The "${name}" worksheet is missing the required column${
          result.missingColumns.length === 1 ? "" : "s"
        } ${result.missingColumns.join(", ")}. Download the template to check the headers, then upload the file again.`,
      )
      return
    }

    if (result.rows.length === 0) {
      setValidation(null)
      setFileError(`The "${name}" worksheet has headers but no rows below them.`)
      return
    }

    setFileError(null)
    setValidation(result)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const file = input.files?.[0]

    // The field is cleared so picking the same file twice still counts as a
    // change, which is what lets a corrected file be uploaded again.
    input.value = ""

    clearLoadedFile()

    if (!file) {
      setFileError(`Choose a ${acceptedFileTypes} file to import.`)
      return
    }

    if (!isSupportedImportFile(file.name)) {
      setFileError(`${file.name} is not supported. Upload a ${acceptedFileTypes} file.`)
      return
    }

    try {
      const loadedWorkbook = await readSpreadsheet(file)
      const names = getWorksheetNames(loadedWorkbook)

      if (names.length === 0) {
        setFileError(`${file.name} holds no worksheets to import.`)
        return
      }

      setWorkbook(loadedWorkbook)
      setFileName(file.name)
      setWorksheetNames(names)
      loadWorksheet(loadedWorkbook, names[0])
    } catch {
      setFileError(
        `${file.name} could not be read. Check that it is a real ${acceptedFileTypes} file and upload it again.`,
      )
    }
  }

  const handleWorksheetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!workbook) return

    loadWorksheet(workbook, event.target.value)
  }

  const confirmImport = async () => {
    const rowsToImport = validation?.validRows ?? []

    if (rowsToImport.length === 0) return

    setIsImporting(true)
    setImportedCount(0)

    // The rows go through the same create call the forms use, one by one, so a row
    // the server rejects is reported without losing the rows around it.
    const failedRowNumbers: number[] = []

    for (const row of rowsToImport) {
      try {
        await definition.importRow(businessId, row.payload)
      } catch {
        failedRowNumbers.push(row.rowNumber)
      }

      setImportedCount((previous) => previous + 1)
    }

    definition.queryKeys(businessId).forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey })
    })

    const savedCount = rowsToImport.length - failedRowNumbers.length

    showToast(
      failedRowNumbers.length > 0
        ? {
            variant: "warning",
            title: "Import finished with errors",
            message: `${savedCount} of ${rowsToImport.length} rows were imported. Row ${failedRowNumbers.join(", row ")} could not be saved.`,
          }
        : {
            variant: "success",
            title: "Import finished",
            message: `${savedCount} ${definition.singular}${savedCount === 1 ? "" : "s"} imported successfully.`,
          },
    )

    closeImportModal()
  }

  const previewRows = validation?.validRows.slice(0, previewRowLimit).map((row) => row.preview) ?? []
  const errorRows = validation?.rows.filter((row) => row.errors.length > 0) ?? []
  const validRowCount = validation?.validRows.length ?? 0

  return (
    <Card width="500px" padding="xl" height="max-content" specificStyles={{ maxHeight: "calc(100vh - 48px)" }}>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">Import {definition.title}</Heading>
        <Frame>
          <CloseButton func={closeImportModal} />
        </Frame>
      </Frame>

      <Frame scroll="hidden" className="w-full flex-col gap-[var(--space-lg)]" specificStyles={{ minHeight: 0 }}>
        {/* File and template */}
        <Frame className="w-full items-end gap-[var(--space-md)]">
          <Frame className="flex-1 flex-col">
            <Frame className="items-end gap-[var(--space-md)]">
              <Frame className="flex-col">
                <Label text={`${acceptedFileTypes} file`} size="xs" />
                <input type="file" accept={supportedImportExtensions.join(",")} onChange={handleFileChange}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)] text-[length:var(--bodySize-xs)]"
                />
              </Frame>
              <Popup gap={8} width="190px" content={ <DownloadButtons header exampleRow definition/>}>
                <Button variant="outline" size="sm" iconName="icon-download">Download template</Button>
              </Popup>
            </Frame>
            <Frame className="w-full gap-[var(--space-md)]">
              <Frame className="gap-[var(--space-xs)]">
               <Paragraph size="xxs">File name : </Paragraph>
               <Paragraph weight="normal" color="textColor1" size="xxs"> {" " + fileName} </Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xxs">Worksheet : </Paragraph>
                <Paragraph weight="normal" color="textColor1" size="xxs"> {" " + worksheetName} </Paragraph>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        {/* The worksheet picker only shows when there is a choice to make */}
        {
          worksheetNames.length > 1 && (
            <Frame className="w-full items-center justify-between gap-[var(--space-md)]">
              <Paragraph size="xs">
                This workbook holds {worksheetNames.length} worksheets. Choose the one to import.
              </Paragraph>
              <Dropdown name="worksheet" size="sm" width="200px" value={worksheetName} options={worksheetNames} formFunc={handleWorksheetChange}/>
            </Frame>
          )
        }

        {/* Problems with the file itself */}
        {
          fileError && (
            <Frame
              className="w-full rounded-[var(--radius-sm)] p-[var(--space-md)]"
              specificStyles={{ backgroundColor: "var(--color-error2)" }}
            >
              <Paragraph size="xs" color="error">{fileError}</Paragraph>
            </Frame>
          )
        }

        {/* What the file holds, once it has been checked */}
        {
          validation && (
            <>
              <Frame className="w-full items-center gap-[var(--space-sm)]">
                <Paragraph size="xs" color="success" weight="medium">{validRowCount} valid rows</Paragraph>
                <span>•</span>
                <Paragraph size="xs" weight="medium" color={errorRows.length > 0 ? "error" : "textColor2"}>
                  {errorRows.length} rows with errors
                </Paragraph>
                <span>•</span>
              </Frame>

              {
                previewRows.length > 0 && (
                  <Frame className="w-full flex-col">
                    <Label text={ validRowCount > previewRows.length ? `Preview (first ${previewRows.length} of ${validRowCount} valid rows)` : `Preview (${previewRows.length} valid rows)`} size="xs"/>
                    <Table width="stretch" cellWidth="140px" height="hug" size="xs" data={previewRows} />
                  </Frame>
                )
              }

              {
                errorRows.length > 0 && (
                  <Frame className="w-full flex-col gap-[var(--space-sm)]">
                    <Label text="Rows with errors" size="xs" />

                    {
                      errorRows.map((row) => (
                        <Frame
                          key={row.rowNumber}
                          className="w-full flex-col gap-[var(--space-xxs)] border-b border-[var(--color-outline1)] pb-[var(--space-sm)] last:border-b-0 last:pb-0"
                        >
                          <Paragraph size="xs" color="error" weight="medium">Row {row.rowNumber}</Paragraph>

                          {
                            row.errors.map((error) => (
                              <Paragraph key={`${error.field}-${error.message}`} size="xs">
                                {error.message}
                              </Paragraph>
                            ))
                          }
                        </Frame>
                      ))
                    }
                  </Frame>
                )
              }
            </>
          )
        }

        {/* Actions */}
        <Frame className="w-full justify-end gap-[var(--space-sm)]">
          <Button variant="fill" size="md" disabled={isImporting || validRowCount === 0} func={confirmImport}>
            {
              isImporting
                ? `Importing ${importedCount} of ${validRowCount}`
                : `Import ${validRowCount} ${definition.title}`
            }
          </Button>
        </Frame>
      </Frame>
    </Card>
  )
}

import React from 'react'

function DownloadButtons({definition, headers, exampleRow}:any) {
  return (
    <>
      <Frame className="w-full flex-col">
        <Button variant="ghost" size="xs" rounded="sm" iconName="icon-download" iconColor="textColor1" justify="start"
          className="w-full hover:bg-[var(--color-background3)]"
          func={() => downloadSpreadsheetTemplate( definition.templateFileName, definition.worksheetName, headers, exampleRow )}
        > Excel (.xlsx)
        </Button>

        <Button variant="ghost" size="xs" rounded="sm" iconName="icon-download" iconColor="textColor1" justify="start"
          className="w-full hover:bg-[var(--color-background3)]"
          func={() => downloadCsvTemplate(definition.templateFileName, headers, exampleRow)}
        >
          CSV (.csv)
        </Button>
      </Frame>
    </>
  )
}

