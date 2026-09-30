"use client"

import { shadow2 } from "@/src/app/design/shadows"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize, fontWeight } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { CSSProperties, useEffect, useRef, useState } from "react"
import { useTheme } from "../../../providers/themeProvider"
import Frame from "../primitives/frame"
import Icon from "../primitives/icon"

type DropdownOption =
  | string
  | { label: string | undefined; value: string | undefined }

type DropdownProps = {
  name: string
  value?: string
  defaultValue?: string
  options: DropdownOption[]
  size?: SizeType
  border?: boolean
  width?: CSSProperties["width"]
  outline?: boolean
  disabled?: boolean
  specificStyle?: CSSProperties
  formFunc?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  // A prefix names what the dropdown controls, so a sort reads as
  // "Sort: Newest to oldest" while its menu keeps the plain option labels.
  prefix?: string
  // Menus open from the left edge by default. A control sitting at the right end
  // of a toolbar opens from its right edge instead, so the menu stays inside the
  // page rather than running past the section it sits in.
  menuAlign?: "left" | "right"
}

export default function Dropdown({
  name,
  value,
  defaultValue,
  options,
  width = "max-content",
  size = "md",
  border = true,
  outline = true,
  disabled = false,
  specificStyle,
  formFunc,
  prefix,
  menuAlign = "left",
}: DropdownProps) {
  const { colors } = useTheme()
  const [open, setOpen] = useState(false)
  const isContentSized = width === "max-content" || width === undefined

  function getOptionLabel(option: DropdownOption) {
    return typeof option === "string" ? option : option?.label
  }

  function getOptionValue(option: DropdownOption) {
    return typeof option === "string" ? option : option?.value
  }

  const [internalSelectedValue, setInternalSelectedValue] = useState(
    value ?? defaultValue ?? getOptionValue(options[0])
  )

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const selectedValue = value ?? internalSelectedValue

  const selectedOption =
    options.find(
      (option) => getOptionValue(option) === selectedValue
    ) ?? options[0]

  const selectedLabel = getOptionLabel(selectedOption)

  const dropdownTextSize: SizeType = ["lg", "xl", "xxl"].includes(size)
    ? "md"
    : size

  function selectOption(option: DropdownOption) {
    const newValue = getOptionValue(option)

    if (value === undefined) {
      setInternalSelectedValue(newValue)
    }

    formFunc?.({
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>)

    setOpen(false)
  }

  return (
    <Frame
      className={`${open ? "z-[500]" : "z-[50]"} ${isContentSized ? "w-fit" : "w-full"} items-center`}
      specificStyles={{
        width: width,
      }}
    >
      {/* The value is always submitted, even while the dropdown is read only,
          so a locked field still reaches the form data. */}
      <input
        type="hidden"
        name={name}
        value={selectedValue}
        readOnly
      />

      <div ref={wrapperRef} className={`relative ${isContentSized ? "w-fit" : "w-full"}`}>
        {/* Dropdown button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className={`relative ${!disabled? "cursor-pointer" : "cursor-not-allowed"} flex ${isContentSized ? "w-fit" : "w-full"} min-w-[100px] items-center justify-between gap-[var(--space-sm)] overflow-hidden whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--color-background3)]
            ${
              border
                ? "border-[0.5px] border-[var(--color-outline2)]"
                : ""
            }
            ${
              !disabled && 
              outline
                ? "hover:border-[var(--color-accent)] focus:border-[1px] focus:border-[var(--color-accent)]"
                : ""
            }
          `}
          style={{
            padding: `0 var(--space-md)`,
            height: elementSizes[size],
            ...specificStyle,
            fontSize: bodySize[dropdownTextSize],
            fontWeight: fontWeight["normal"],
          }}
        >
          {/* Selected text */}
          <span className="min-w-0 truncate">
            {prefix && selectedLabel ? `${prefix} ${selectedLabel}` : selectedLabel}
          </span>

          {/* Chevron icon */}
          <span className="pointer-events-none shrink-0 bg-[var(--color-background3)]">
            <Icon name="icon-chevron-down" size="sm" />
          </span>
        </button>

        {/* Dropdown options */}
        {open && (
          <Frame
            scroll="hidden"
            className={`${shadow2} ${menuAlign === "right" ? "right-0" : "left-0"} top-[100%] mt-1 flex max-h-[150px] ${isContentSized ? "w-fit" : "w-full"} min-w-[100px] flex-col overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--color-outline2)] bg-[var(--color-white)]`}
            specificStyles={{
              position: "absolute",
            }}
          >
            {options.map((option) => {
              const optionValue = getOptionValue(option)

              return (
                <button
                  key={optionValue}
                  type="button"
                  onClick={() => selectOption(option)}
                  className="block w-full overflow-hidden whitespace-nowrap px-3 py-2 text-left text-ellipsis transition-colors hover:bg-[var(--color-background1)]"
                  style={{
                    height: "max-content",
                    minHeight: elementSizes[size],
                    fontSize: bodySize[dropdownTextSize],
                    fontWeight: fontWeight["normal"],
                    backgroundColor:
                      selectedValue === optionValue
                        ? colors["accent2"]
                        : undefined,
                  }}
                >
                  {getOptionLabel(option)}
                </button>
              )
            })}
          </Frame>
        )}
      </div>
    </Frame>
  )
}