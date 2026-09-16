"use client"

import Frame from "../primitives/frame"
import Link from "next/link"
import Paragraph from "../primitives/paragraph"
import { Businesses } from "@/src/types/types"
import Dropdown from "./dropdown"
import { useEffect } from "react"
import { useBusinessesState } from "@/src/store/businessesState"

export default function SmartNavigation() {

  return (
    <Frame className="w-full py-[var(--space-sm)] bg-[var(--color-background2)] items-center gap-[var(--space-md)] px-[var(--space-lg)] h-max">
        <Link href="/dashboard">
         <Paragraph size="xs" color="accent" weight="semiBold">Home</Paragraph>
        </Link>
        <Frame className="navigations">

        </Frame>
    </Frame>
  )
}
