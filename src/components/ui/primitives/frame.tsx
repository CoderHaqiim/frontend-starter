import { CSSProperties, ReactNode, forwardRef } from "react";

type FrameProp = {
  scroll?: "hidden" | "visible";
  specificStyles?: CSSProperties;
  children?: ReactNode;
  direction?: "row" | "column";
  className?: string;
  border?: boolean
  onClick?: () => void
};

const Frame = forwardRef<HTMLDivElement, FrameProp>(
  (
    {
      border,
      scroll,
      direction,
      children,
      specificStyles,
      className,
      onClick,
    },
    ref
  ) => {
    const overflowStyle =
      scroll === "visible" ? "scrollVisible" : "scrollInvisible";

    const baseStyle = `relative flex 
    ${border? "border-[0.5px] border-[var(--color-success1)]" : " "}
    ${ scroll
          ? direction === "column"
            ? "overflow-y-scroll"
            : "overflow-x-scroll"
          : ""
      }
      ${overflowStyle}
    `;

    return (
      <div ref={ref} className={`${baseStyle} ${className}`} style={{ ...specificStyles }} onClick={onClick}>
        {children}
      </div>
    );
  }
);

Frame.displayName = "Frame";

export default Frame;