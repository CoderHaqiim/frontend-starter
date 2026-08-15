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
      width={width}
      height={height}
      className="bg-[var(--color-background1)]"
      rounded="md"
      border
      direction="column"
      scroll={scroll}
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