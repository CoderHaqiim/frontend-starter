import Frame from "../primitives/frame";
import { CSSProperties, ReactNode, Children } from "react";
import { FrameSizeType } from "@/src/types/types";

type ListProps = {
  scroll?: "hidden" | "visible";
  children: ReactNode;
  specificStyles?: CSSProperties;
  width?: FrameSizeType;
  height?: FrameSizeType;
};

export default function List({
  scroll,
  height,
  width = "stretch",
  children,
  specificStyles,
}: ListProps) {
  return (
    <Frame
      className={`
        ${width === "stretch" ? "w-full" : width === "hug" ? "w-max" : `w-[${width}]`}
        ${height === "stretch" ? "h-full" : height === "hug" ? "h-max" : height ? `h-[${height}]` : ""}
        bg-[var(--color-background1)]
        border-[1px]
        border-[var(--color-outline2)]
        rounded-[var(--radius-md)]
        flex
        flex-col
        ${scroll === "hidden" ? "overflow-hidden" : ""}
        ${scroll === "visible" ? "overflow-visible" : ""}
      `}
      specificStyles={{ ...specificStyles }}
    >
      {Children.map(children, (child, index) => (
        <div className={index % 2 === 0 ? "bg-[var(--color-white)]" : "bg-[var(--color-background1)]"}>
          {child}
        </div>
      ))}
    </Frame>
  );
}