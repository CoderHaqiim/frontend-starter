import { ChangeEvent, CSSProperties, useId } from 'react'

type CheckboxProps = {
  name: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  id?: string
  label?: string
  ariaLabel?: string
  required?: boolean
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  specificStyle?: CSSProperties
}

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
} as const

export default function Checkbox({
  name,
  checked,
  defaultChecked,
  onChange,
  value,
  id,
  label,
  ariaLabel,
  required = false,
  disabled = false,
  className = '',
  size = 'sm',
  specificStyle,
}: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? `${name}-${generatedId}`

  const checkboxSize = sizeMap[size]

  return (
    <label
      htmlFor={checkboxId}
      className={`group inline-flex items-center ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel ?? (label ? undefined : name)}
        className="peer sr-only"
      />

      <span
        aria-hidden="true"
        className="
          relative flex shrink-0 items-center justify-center
          border border-[var(--color-outline2)]
          bg-[var(--color-background1)]
          transition-all duration-150 ease-out
          peer-checked:border-[var(--color-accent2)]
          peer-checked:bg-[var(--color-accent2)]
          peer-focus-visible:outline-none
          peer-focus-visible:ring-2
          peer-focus-visible:ring-[var(--color-accent)]/40
          peer-disabled:opacity-50
        "
        style={{
          width: checkboxSize,
          height: checkboxSize,
          borderRadius: 'var(--radius-xs)',
          ...specificStyle,
        }}
      >
        <svg
          viewBox="0 0 12 12"
          width="12"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
            pointer-events-none absolute
            opacity-0
            transition-opacity duration-150
            group-has-[:checked]:opacity-100
          "
          aria-hidden="true"
        >
          <path
            d="M2.5 6.2L4.8 8.5L9.5 3.8"
            stroke="var(--color-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {label && (
        <span
          className="
            ml-[var(--space-xs)]
            text-[length:var(--bodySize-sm)]
            text-[var(--color-textColor1)]
          "
        >
          {label}
        </span>
      )}
    </label>
  )
}