import React, { CSSProperties, ReactNode } from "react";
import { colorVariables } from "@/src/app/design/colors";
import { radius } from "@/src/app/design/radius";
import { SizeType } from "@/src/types/types";
import { space } from "@/src/app/design/spacing";
import { FrameSizeType } from "@/src/types/types";

type FrameProp = {
  scroll?: boolean;
  specificStyle?: CSSProperties;
  rounded?: SizeType;
  children?: ReactNode;
  scrollbar?: boolean;
  direction?: "row" | "column";
  padding?: SizeType | undefined;
  border?: boolean;
  centered?: boolean;
  width: FrameSizeType
  height: FrameSizeType
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

  const baseStyle = `
    relative flex
    ${border ? "border-[0.5px] border-[var(--outline)]" : ""}
    ${centered ? "justify-center items-center" : ""}
    ${scroll? direction === "column" ? "overflow-y-scroll" : "overflow-x-scroll": ""}
  `;

  const frameStyle = `${baseStyle} ${scroll && scrollbar ? "scrollVisible" : ""}`;

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

  const defaultStyle: CSSProperties = {
    borderRadius: rounded && radius[rounded],
    width: widthValue,
    height: heightValue,
    flexDirection: direction,
    padding: padding && space[padding]
  };

  return (
    <div
      className={frameStyle}
      style={{
        ...defaultStyle,
        ...specificStyle
      }}
    >
      {children}
    </div>
  );
}