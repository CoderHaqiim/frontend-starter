"use client"

import { useTheme } from "@/src/components/providers/themeProvider"
import { Businesses } from "@/src/types/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Button from "../ui/primitives/button"
import Frame from "../ui/primitives/frame"

type BusinessSwitcherProps = {
  businesses: Businesses
  activeBusinessId?: string
}

export default function BusinessSwitcher({ businesses, activeBusinessId }: BusinessSwitcherProps) {
  const { colors } = useTheme()
  const pathname = usePathname()
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false)
  const [, , , , ...currentBusinessRoute] = pathname.split("/")
  const businessRoute = currentBusinessRoute.length > 0
    ? `/${currentBusinessRoute.join("/")}`
    : "/overview"

  return (
    <Frame className="relative">
      <Button
        func={() => setIsBusinessMenuOpen((prev) => !prev)}
        variant="outline"
        iconPosition="right"
        iconColor="accent"
        size="xxs"
        iconName="icon-change"
        rounded="xs"
        specificStyles={{
          color: colors["accent"],
          fontWeight: "var(--fontWeight-bold)",
        }}
      >
        Switch Business
      </Button>

      {isBusinessMenuOpen && (
        <Frame
          className="left-0 top-[calc(100%+8px)] z-[60] flex-col min-w-[200px] max-h-[180px] overflow-y-auto border border-[var(--color-outline2)] rounded-[var(--radius-sm)] bg-[var(--color-white)] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          specificStyles={{ position: "absolute" }}
        >
          {businesses.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/businesses/${item.id}${businessRoute}`}
              onClick={() => setIsBusinessMenuOpen(false)}
              className="block w-full px-3 py-2 text-left text-[length:var(--bodySize-xs)] transition-colors hover:bg-[var(--color-background1)]"
              style={{
                backgroundColor: activeBusinessId === item.id ? colors["accent2"] : undefined,
                color: activeBusinessId === item.id ? colors["accent"] : "var(--color-text1)",
              }}
            >
              {item.name}
            </Link>
          ))}
        </Frame>
      )}
    </Frame>
  )
}
