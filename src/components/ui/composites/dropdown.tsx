"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Frame from "../primitives/frame";
import Icon from "../primitives/icon";
import { elementSizes } from "@/src/app/design/sizes";
import { SizeType } from "@/src/types/types";
import { useTheme } from "../../app/themeProvider";
import { shadow2 } from "@/src/app/design/shadows";
import { bodySize, fontWeight } from "@/src/app/design/typograhy";

type DropdownOption =
  string | { label: string; value: string };

type DropdownProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  options: DropdownOption[];
  size?: SizeType;
  border?: boolean;
  outline?: boolean;
  disabled?: boolean;
  specificStyle?: CSSProperties;
  formFunc?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown({
  name,
  value,
  defaultValue,
  options,
  size = "md",
  border = true,
  outline = true,
  disabled = false,
  specificStyle,
  formFunc,
}: DropdownProps) {
  const { colors } = useTheme()
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? getOptionValue(options[0]));

  const wrapperRef = useRef<HTMLDivElement>(null);

  function getOptionLabel(option: DropdownOption) {
    return typeof option === "string" ? option : option.label;
  }

  function getOptionValue(option: DropdownOption) {
    return typeof option === "string" ? option : option.value;
  }

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const selectedOption =
    options.find((option) => getOptionValue(option) === selectedValue) ??
    options[0];

  function selectOption(option: DropdownOption) {
    const newValue = getOptionValue(option);

    if (value === undefined) {
      setSelectedValue(newValue);
    }

    formFunc?.({
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>);

    setOpen(false);
  }

  return (
    <Frame width="hug" align="center" className="z-[50]">
      <div ref={wrapperRef} className="relative w-max">
        <button type="button" disabled={disabled} onClick={() => setOpen((prev) => !prev)}
          className={`flex items-center justify-between rounded-[var(--radius-sm)] px-2 pr-8 min-w-[100px]
            ${ border? "border border-[var(--color-outline1)]" : ""}
            ${ outline ? "hover:border-[var(--color-accent)] focus:border-2 focus:border-[var(--color-accent)]": ""}
          `}
          style={{
            height: elementSizes[size],
            ...specificStyle,
            fontSize: bodySize["xs"],
            fontWeight: fontWeight["normal"]
          }}
        >
          {getOptionLabel(selectedOption)}

          <div className="absolute right-2 pointer-events-none">
            <Icon name="icon-chevron-down" size="sm" />
          </div>
        </button>

        {open && (
          <Frame border rounded="sm" direction="column" className={`${shadow2} left-0 top-[100%] z-50 bg-[var(--color-white)] mt-1 min-w-full overflow-hidden`}
            specificStyles={{
              position: "absolute"
          }}>
            {
              options.map((option) => {
                const optionValue = getOptionValue(option);
                return (
                  <button key={optionValue} type="button" onClick={() => selectOption(option)}
                    className="block text-[length:var(--bodySize-sm)] w-full px-3 py-2 text-left transition-colors hover:bg-[var(--color-background1)]"
                    style={{
                      backgroundColor: selectedValue === optionValue? colors["accent2"]: undefined,
                  }}>
                    {optionValue}
                  </button>
                );
              })
            }
          </Frame>
        )}
      </div>
    </Frame>
  );
}