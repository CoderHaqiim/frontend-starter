"use client"

import { radius } from "@/src/app/design/radius"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { CSSProperties } from "react"
import Frame from "./frame"

/*
 * The multiline field of the design system. It follows the Input primitive the way the
 * rest of the fields do - the same size tokens, the same border and focus treatment - so
 * a long answer reads as the same kind of field as a short one, and neither grows its own
 * styling.
 */
type TextareaProps = {
    name: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    defaultValue?: string,
    // How tall the field opens, in text lines.
    rows?: number,
    size?: SizeType,
    rounded?: SizeType,
    border?: boolean,
    outline?: boolean,
    disabled?: boolean,
    specificStyle?: CSSProperties,
    className?: string,
    func?: () => void,
    formFunc?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({
    name,
    placeholder,
    required = false,
    value,
    defaultValue,
    rows = 4,
    size = "md",
    rounded = "sm",
    border = true,
    outline = true,
    disabled = false,
    specificStyle,
    className,
    func,
    formFunc
}: TextareaProps) {

    const defaultStyles: CSSProperties = {
        boxSizing: "border-box",
        borderRadius: rounded && radius[rounded],
        fontSize: bodySize[size],
        lineHeight: "1.5",
        // The field is never shorter than a single line field of the same size; `rows`
        // decides how much taller it opens.
        minHeight: elementSizes[size],
    }

    return (
        <Frame className="w-full flex h-max justify-center overflow-hidden flex-col">
            <textarea
                required={required}
                value={value}
                defaultValue={defaultValue}
                onChange={formFunc}
                onFocus={func}
                onBlur={func}
                name={name}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                className={
                    `w-full flex resize-none bg-transparent outline-none
                    px-[var(--space-md)] py-[var(--space-sm)]
                    ${outline ? "focus:border-[2px] hover:border-[1px] focus:border-[var(--color-accent)] hover:border-[var(--color-accent)]" : ""}
                    placeholder-[var(--color-outline1)]
                    ${border ? "border-[var(--color-outline1)] border-[0.5px]" : ""}
                    ${disabled ? "cursor-not-allowed opacity-[0.55]" : ""}
                    ${className}`
                }
                style={{
                    ...defaultStyles,
                    ...specificStyle
                }}
            />
        </Frame>
    )
}
