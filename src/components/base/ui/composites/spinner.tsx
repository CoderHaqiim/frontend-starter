"use client"

import { elementSizes } from "@/src/app/design/sizes"
import { SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"

type SpinnerProps = {
  size?: SizeType
}

export default function Spinner({
  size = "md",
}: SpinnerProps) {

  return (
    <Frame className={` rounded-full border-[3px] border-[var(--color-outline1)] border-t-[var(--color-accent)] animate-spin`}
        specificStyles={{
            width:elementSizes[size],
            height:elementSizes[size]
        }}/>
  )
}