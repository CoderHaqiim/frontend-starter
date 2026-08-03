"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Frame from "@/src/components/ui/primitives/frame"
import { useTheme } from '../../app/themeProvider'
import Paragraph from "../primitives/paragraph"
import { getDashboardViewFromPath } from "@/src/utils/navItems"

const tabs = [
    { id: "finance", label: "Finance", href: "/dashboard/finance" },
    { id: "operations", label: "Operations", href: "/dashboard/operations" },
    { id: "customers", label: "Customers", href: "/dashboard/customers" },
    { id: "team", label: "Team", href: "/dashboard/team" },
]

export default function Tab() {
    const {colors} = useTheme()
    const pathname = usePathname()
    const activeTab = getDashboardViewFromPath(pathname)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [indicator, setIndicator] = useState({ left: 0, width: 0 })
    const containerRef = useRef<HTMLDivElement | null>(null)
    const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

    useEffect(() => {
        const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
        const activeItem = itemRefs.current[activeIndex]
        const container = containerRef.current

        if (!activeItem || !container) return

        const containerRect = container.getBoundingClientRect()
        const itemRect = activeItem.getBoundingClientRect()

        setIndicator({
            left: itemRect.left - containerRect.left,
            width: itemRect.width,
        })
    }, [activeTab])

    useEffect(() => {
        const handleResize = () => {
            const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
            const activeItem = itemRefs.current[activeIndex]
            const container = containerRef.current

            if (!activeItem || !container) return

            const containerRect = container.getBoundingClientRect()
            const itemRect = activeItem.getBoundingClientRect()

            setIndicator({
                left: itemRect.left - containerRect.left,
                width: itemRect.width,
            })
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [activeTab])

    return (
        <Frame width="stretch" height="hug" align="center" justify="center" specificStyles={{
            position:"fixed",
            bottom:"5%",
            pointerEvents:"none",
            zIndex:500
        }}>
            <Frame
                ref={containerRef}
                direction="row"
                gap="lg"
                width="hug"
                padding="md"
                height="65px"
                rounded="xl"
                align="center"
                className="relative bg-[var(--color-white)] shadow-[0px_4px_8px_rgba(0,0,0,0.7)]"
                specificStyles={{
                    border: `solid 1px ${colors["outline1"]}`,
                }}
            >
                <div className="absolute rounded-[var(--radius-lg)] transition-[left,width,background-color] duration-300 ease-out"
                    style={{
                        height:"45px",
                        left: indicator.left,
                        width: indicator.width,
                        backgroundColor: colors["accent"],
                    }}
                />

                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id
                    const isHovered = hoveredTab === tab.id

                    return (
                        <Link key={tab.id} ref={(node) => {itemRefs.current[index] = node}}
                            href={tab.href}
                            onMouseEnter={() => setHoveredTab(tab.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            className={`flex relative h-[40px] z-10 rounded-[var(--radius-lg)] px-4 py-2 justify-center align-center font-[var(--fontWeight-medium)] transition-colors duration-200 ease-out ${isActive ? "text-[var(--color-white)]" : "text-[var(--color-textColor1)]"} ${!isActive ? "hover:bg-[var(--color-background3)]" : ""}`}
                            style={{
                                pointerEvents: "all",
                                backgroundColor: isActive ? "transparent" : isHovered ? colors["background3"] : "transparent",
                            }}
                        >
                            <Paragraph size="md" weight="normal" color={isActive ? "white" : isHovered ? "accent" : "textColor1"} 
                                specificStyle={{
                                    lineHeight: "1",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                {tab.label}
                            </Paragraph>    
                        </Link>
                    )
                })}
            </Frame>
        </Frame>
    )
}
