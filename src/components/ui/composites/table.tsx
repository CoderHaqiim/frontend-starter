"use client"

import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react"
import Frame from "../primitives/frame"
import { FrameSizeType, SizeType } from "@/src/types/types"
import TableRow from "./tableRow"
import TableHeaderRow from "./tableHeaderRow"
import { ObjectRecordType } from "@/src/types/types"

type TableProps = {
    width: FrameSizeType,
    cellWidth?: FrameSizeType,
    height: FrameSizeType,
    data: ObjectRecordType[],
    size: SizeType
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
    size
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

        return [...itemSet]
    }, [data])

    const [columnWidths, setColumnWidths] = useState<number[]>([])

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
            className={`
                ${width === "stretch" ? "w-full" : ""}
                ${width === "hug" ? "w-max" : ""}
                ${height === "stretch" ? "h-full" : ""}
                ${height === "hug" ? "h-max" : ""}
                rounded-[var(--radius-sm)]
                border-[1.5px]
                border-[var(--color-outline2)]
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
                className="w-max h-max flex flex-col"
            >
                <TableHeaderRow
                    widths={cellWidths}
                    size={size}
                    data={headerData}
                    onResizeStart={handleColumnResizeStart}
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
                        />
                    ))
                }
            </Frame>
        </Frame>
    )
}