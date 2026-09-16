import { FrameSizeType } from "@/src/types/types";
import { Children, CSSProperties, ReactNode } from "react";
import Frame from "../primitives/frame";

type ListProps = {
  scroll?: "hidden" | "visible";
  children: ReactNode;
  specificStyles?: CSSProperties;
  width?: FrameSizeType;
  height?: FrameSizeType;
  className?: string
};

export default function List({
  scroll,
  height,
  width = "stretch",
  children,
  specificStyles,
  className
}: ListProps) {
  return (
    <Frame
      className={`
        ${width === "stretch" ? "w-full" : width === "hug" ? "w-max" : `w-[${width}]`}
        ${height === "stretch" ? "h-full" : height === "hug" ? "h-max" : height ? `h-[${height}]` : ""}
        bg-[var(--color-background3)]
        border-[1px]
        border-[var(--color-outline1)]
        gap-[var(--space-xxs)]
        rounded-[var(--radius-md)]
        flex
        flex-col
        ${scroll === "hidden" ? "overflow-y-scroll" : ""}
        ${scroll === "visible" ? "overflow-visible" : ""}
        ${className}
      `}
      specificStyles={{ ...specificStyles }}
    >
      {Children.map(children, (child, index) => (
        <div className={index % 2 === 0 ? "bg-[var(--color-white)]" : "bg-[var(--color-white)]"}>
          {child}
        </div>
      ))}
    </Frame>
  );
}