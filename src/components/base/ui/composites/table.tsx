"use client"

import { FrameSizeType, ObjectRecordType, SizeType } from "@/src/types/types"
import { MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Frame from "../primitives/frame"
import TableHeaderRow from "./tableHeaderRow"
import TableRow, { ACTIONS_COLUMN } from "./tableRow"

type TableProps = {
    width: FrameSizeType,
    cellWidth?: FrameSizeType,
    height: FrameSizeType,
    data: ObjectRecordType[],
    size: SizeType,
    isCustomerData?: boolean,
    // Renders the trailing actions cell of a row, for example a delete menu. The
    // table adds an actions column for it, and leaves the table untouched when it
    // is not given.
    rowActions?: (row: ObjectRecordType) => ReactNode
}

const MIN_COLUMN_WIDTH = 50

function parseColumnWidth(width: FrameSizeType) {
    if (typeof width === "number") {
        return width
    }

    if (typeof width === "string") {
        const parsedWidth = Number.parseInt(width, 10)
        return Number.isNaN(parsedWidth) ? 150 : parsedWidth
    }

    return 150
}

export default function Table({
    width,
    cellWidth = "150px",
    height,
    data,
    size,
    isCustomerData = false,
    rowActions
}: TableProps) {

    const headerData: string[] = useMemo(() => {
        const itemSet: Set<string> = new Set()

        const getObjectKey = (obj: {}) => {
            return Object.keys(obj)
        }

        const pushToSet = (items: string[]) => {
            items.forEach(item => itemSet.add(item))
        }

        data.forEach(item => {
            pushToSet(getObjectKey(item ?? " "))
        })

        return rowActions ? [...itemSet, ACTIONS_COLUMN] : [...itemSet]
    }, [data, rowActions])

    const [columnWidths, setColumnWidths] = useState<number[]>([])
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
    const [selectedColumnIndex, setSelectedColumnIndex] = useState<number | null>(null)
    const tableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const clearSelectionOutsideTable = (event: globalThis.MouseEvent) => {
            if (!tableRef.current?.contains(event.target as Node)) {
                setSelectedRowIndex(null)
                setSelectedColumnIndex(null)
            }
        }

        document.addEventListener("mousedown", clearSelectionOutsideTable)

        return () => document.removeEventListener("mousedown", clearSelectionOutsideTable)
    }, [])

    useEffect(() => {
        const defaultWidth = parseColumnWidth(cellWidth)

        setColumnWidths((currentWidths) =>
            headerData.map((_, index) => currentWidths[index] ?? defaultWidth)
        )
    }, [cellWidth, headerData])

    const handleColumnResizeStart = useCallback((
        columnIndex: number,
        event: MouseEvent<HTMLDivElement>
    ) => {
        event.preventDefault()

        const startX = event.clientX
        const startWidth = columnWidths[columnIndex] ?? parseColumnWidth(cellWidth)
        const originalCursor = document.body.style.cursor
        const originalUserSelect = document.body.style.userSelect

        document.body.style.cursor = "col-resize"
        document.body.style.userSelect = "none"

        const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
            const nextWidth = Math.max(
                MIN_COLUMN_WIDTH,
                startWidth + moveEvent.clientX - startX
            )

            setColumnWidths((currentWidths) =>
                currentWidths.map((width, index) =>
                    index === columnIndex ? nextWidth : width
                )
            )
        }

        const handleMouseUp = () => {
            document.body.style.cursor = originalCursor
            document.body.style.userSelect = originalUserSelect
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
    }, [cellWidth, columnWidths])

    const cellWidths = headerData.map(
        (_, index) =>
            `${columnWidths[index] ?? parseColumnWidth(cellWidth)}px`
    )

    return (
        <Frame
            ref={tableRef}
            className={`
                ${width === "stretch" ? "w-full" : ""}
                ${width === "hug" ? "w-max" : ""}
                ${height === "stretch" ? "h-full" : ""}
                ${height === "hug" ? "h-max" : ""}
                rounded-[var(--radius-sm)]
                border-[0.5px]
                border-[var(--color-outline1)]
                overflow-auto
            `}
            specificStyles={{
                ...(typeof width === "string" &&
                    width !== "stretch" &&
                    width !== "hug"
                    ? { width }
                    : {}),
                ...(typeof height === "string" &&
                    height !== "stretch" &&
                    height !== "hug"
                    ? { height }
                    : {}),
                ...(typeof width === "number" ? { width } : {}),
                ...(typeof height === "number" ? { height } : {}),
                minHeight: 0,
            }}
        >
            <Frame
                className="w-max h-max flex flex-col bg-[var(--color-white)]"
            >
                <TableHeaderRow
                    widths={cellWidths}
                    size={size}
                    data={headerData}
                    onResizeStart={handleColumnResizeStart}
                    selectedColumnIndex={selectedColumnIndex}
                    onSelectColumn={(columnIndex) => {
                        setSelectedColumnIndex(columnIndex)
                        setSelectedRowIndex(null)
                    }}
                />

                {
                    data.map((item, index) => (
                        <TableRow
                            headerData={headerData}
                            key={index}
                            rowIndex={index}
                            size={size}
                            widths={cellWidths}
                            data={item}
                            isSelected={selectedRowIndex === index}
                            selectedColumnIndex={selectedColumnIndex}
                            onSelect={() => {
                                setSelectedRowIndex(index)
                                setSelectedColumnIndex(null)
                            }}
                            isCustomerData={isCustomerData}
                            rowActions={rowActions}
                        />
                    ))
                }
            </Frame>
        </Frame>
    )
}