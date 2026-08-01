"use client";

import { CSSProperties, ReactNode } from "react";
import { radius } from "@/src/app/design/radius";
import { SizeType } from "@/src/types/types";
import { useTheme } from "../../app/themeProvider";

type SkeletonProps = {
  width?: string;
  height?: string;
  rounded?: SizeType;
  className?: string;
  specificStyle?: CSSProperties;
  children?:ReactNode
};

export default function Skeleton({
  width = "100%",
  height = "16px",
  rounded = "md",
  className = "",
  specificStyle,
  children
}: SkeletonProps) {
  const {colors} = useTheme()
  return (
    <div
      className={`relative overflow-hidden bg-[var(--color-accent2)] ${className}`}
      style={{
        width,
        height,
        borderRadius: radius[rounded],
        ...specificStyle,
      }}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
      style={{
        background: `linear-gradient(90deg, transparent ,${colors["background2"]}, transparent)`,
      }}></div>
    </div>
  );
}