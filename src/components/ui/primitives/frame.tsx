import { CSSProperties, ReactNode, forwardRef } from "react";
import { radius } from "@/src/app/design/radius";
import { SizeType, FrameSizeType } from "@/src/types/types";
import { space } from "@/src/app/design/spacing";

type FrameProp = {
  scroll?: "hidden" | "visible";
  specificStyles?: CSSProperties;
  rounded?: SizeType;
  children?: ReactNode;
  direction?: "row" | "column";
  padding?: SizeType;
  border?: boolean;
  width?: FrameSizeType;
  height?: FrameSizeType;
  className?: string;
  background?: CSSProperties["color"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  gap?: SizeType;
};

const Frame = forwardRef<HTMLDivElement, FrameProp>(
  (
    {
      border,
      padding,
      rounded,
      scroll,
      direction = "row",
      children,
      specificStyles,
      width,
      justify,
      align,
      height,
      className,
      gap,
    },
    ref
  ) => {
    const overflowStyle =
      scroll === "visible" ? "scrollVisible" : "scrollInvisible";

    const baseStyle = `
      relative flex
      ${border ? "border-[0.5px] border-[var(--color-outline1)]" : ""}
      ${
        scroll
          ? direction === "column"
            ? "overflow-y-scroll"
            : "overflow-x-scroll"
          : ""
      }
      ${overflowStyle}
    `;

    const defaultStyle: CSSProperties = {
      borderRadius: rounded && radius[rounded],
      width:
        width === "hug"
          ? "max-content"
          : width === "stretch"
          ? "100%"
          : width,
      height:
        height === "hug"
          ? "max-content"
          : height === "stretch"
          ? "100%"
          : height,
      flexDirection: direction,
      padding: padding && space[padding],
      justifyContent: justify,
      alignItems: align,
      gap: gap && space[gap],
    };

    return (
      <div ref={ref} className={`${baseStyle} ${className}`} style={{ ...defaultStyle, ...specificStyles }}
      >
        {children}
      </div>
    );
  }
);

Frame.displayName = "Frame";

export default Frame;