import React, { CSSProperties, ReactNode } from "react";
import { colorVariables } from "@/src/app/design/colors";
import { radius } from "@/src/app/design/radius";
import { Sizes } from "@/src/types/types";

type FrameProp = {
  scroll?: boolean;
  specificStyle?: CSSProperties;
  rounded?: "round" | Sizes;
  children?: ReactNode;
  scrollbar?: boolean;
  direction?: "row" | "column";
  padding?: Sizes | undefined;
  border?: boolean;
  centered?: boolean;
  width: "hug" | "stretch" | CSSProperties["width"];
  height: "hug" | "stretch" | CSSProperties["height"];
};

export default function Frame({
  border,
  scrollbar,
  padding,
  rounded,
  scroll,
  direction = "row",
  children,
  specificStyle,
  centered,
  width,
  height,
}: FrameProp) {
  const borderRadiusValue =
    rounded === "round"
      ? "50%"
      : rounded
      ? radius[rounded]
      : undefined;

  const baseStyle = `
    relative
    flex
    ${direction === "column" ? "flex-col" : "flex-row"}
    ${border ? "border-[0.5px] border-[var(--outline)]" : ""}
    ${centered ? "justify-center items-center" : ""}
    ${
      padding === "xs"
        ? "p-1"
        : padding === "sm"
        ? "p-2"
        : padding === "md"
        ? "p-4"
        : padding === "lg"
        ? "p-8"
        : ""
    }
    ${
      direction === "row"
        ? scroll
          ? "overflow-x-auto"
          : "overflow-x-visible"
        : scroll
        ? "overflow-y-auto"
        : "overflow-y-visible"
    }
  `;

  const frameStyle = `
    ${baseStyle}
    ${scroll && scrollbar ? "scrollVisible" : ""}
  `;

  const widthValue: CSSProperties["width"] =
    width === "hug"
      ? "max-content"
      : width === "stretch"
      ? "100%"
      : width;

  const heightValue: CSSProperties["height"] =
    height === "hug"
      ? "max-content"
      : height === "stretch"
      ? "100%"
      : height;

  const mergedStyle: CSSProperties = {
    borderRadius: borderRadiusValue,
    width: widthValue,
    height: heightValue,
    ...specificStyle,
  };

  return (
    <div
      className={frameStyle}
      style={{
        ...mergedStyle,
        ...colorVariables,
      }}
    >
      {children}
    </div>
  );
}