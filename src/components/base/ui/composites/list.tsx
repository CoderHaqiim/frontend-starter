import { FrameSizeType } from "@/src/types/types";
import { Children, CSSProperties, ReactNode } from "react";
import Frame from "../primitives/frame";

// The box a list draws around its rows. It is exported so the empty state a list
// falls back to keeps exactly the same shape.
export const listSurfaceClass =
  "bg-[var(--color-background3)] border-[1px] border-[var(--color-outline2)] rounded-[var(--radius-md)]";

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
        ${listSurfaceClass}
        gap-[var(--space-xxs)]
        flex
        flex-col
        overflow-visible
        ${scroll === "hidden" ? "overflow-y-scroll" : ""}
        ${className}
      `}
      specificStyles={{ ...specificStyles }}
    >
      {Children.map(children, (child, index) => (
        // `relative` keeps the row as an anchor for anything absolutely
        // positioned inside it, but carries no z-index on purpose: a z-index
        // here would create a stacking context per row, which traps row
        // popups and dropdowns behind the rows below them.
        <div
          key={index}
          className={`relative overflow-visible ${index % 2 === 0 ? "bg-[var(--color-white)]" : "bg-[var(--color-white)]"}`}
        >
          {child}
        </div>
      ))}
    </Frame>
  );
}