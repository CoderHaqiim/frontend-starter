"use client";

import React, { CSSProperties } from "react";
import Icon from "../primitives/icon";
import { elementSizes } from "@/src/app/design/sizes";
import { SizeType } from "@/src/types/types";
import { colorVariables } from "@/src/app/design/colors";

type DropdownOption =
  | string
  | {
      label: string;
      value: string;
    };

type DropdownProps = {
  name: string;
  options: DropdownOption[];
  size?: SizeType;
  border?: boolean;
  outline?: boolean;
  specificStyle?: CSSProperties;
  formFunc?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown({
  name,
  options,
  size = "md",
  border = true,
  outline = true,
  specificStyle,
  formFunc,
}: DropdownProps) {
  const getOptionLabel = (option: DropdownOption) =>
    typeof option === "string" ? option : option.label;

  const getOptionValue = (option: DropdownOption) =>
    typeof option === "string" ? option : option.value;

  const formFuncHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (formFunc) {
      formFunc(e);
    }
  };

  return (
    <div className="relative flex w-max items-center">
      <select
        name="cars"
        onChange={formFuncHandler}
        className={`w-max accent-[var(--color-accent2)] appearance-none rounded-[4px] pr-[30px] bg-[var(--color-background1)] px-[8px] text-[14px] text-[var(--color-textColor1)] outline-none ${
          border ? "border border-[var(--color-outline)]" : ""
        } ${
          outline
            ? "hover:border-[var(--color-accent1)] focus:border-2 focus:border-[var(--color-accent1)]"
            : ""
        }`}
        style={{
          height: elementSizes[size],
          ...specificStyle,
        }}
      >
        {options.map((option) => {
          const value = getOptionValue(option);

          return (
            <option key={value} value={value}>
              {getOptionLabel(option)}
            </option>
          );
        })}
      </select>

      <div className="pointer-events-none absolute right-[8px] flex items-center">
        <Icon name="icon-chevron-down" size="sm" />
      </div>
    </div>
  );
}
