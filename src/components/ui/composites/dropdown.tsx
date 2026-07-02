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
    <div className="relative flex w-max flex-1 items-center">
      <select
        name="cars"
        onChange={formFuncHandler}
        className={`w-max accent-[var(--accent2)] appearance-none rounded-[var(--sm)] pr-[30px] bg-[var(--background1)] px-[8px] text-[14px] text-[var(--textColor1)] outline-none ${
          border ? "border border-[var(--outline)]" : ""
        } ${
          outline
            ? "hover:border-[var(--accent1)] focus:border-2 focus:border-[var(--accent1)]"
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
