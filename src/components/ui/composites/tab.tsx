"use client"
import { useState } from "react"
import Frame from "@/src/components/ui/primitives/frame"
import Button from "@/src/components/ui/primitives/button"
import { useTheme } from '../../app/themeProvider'

const tabs = ["Finance", "Operations", "Sales", "Team"]

export default function Tab() {
    const {colors} = useTheme()
    const [activeTab, setActiveTab] = useState("Finance")
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    return (
        <Frame width="stretch" height="hug" align="center" justify="center" specificStyles={{
            position:"fixed",
            bottom:"5%",
            pointerEvents:"none",
            zIndex:500
        }}>
            <Frame direction="row" border gap="sm" width="hug" padding="md" height="hug" rounded="xl" 
                className="bg-[var(--color-white)] shadow-[0px_4px_8px_rgba(0,0,0,0.4)]" 
                specificStyles={{
                    border: `solid 1px ${colors["outline2"]}`
                }}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab
                    const isHovered = hoveredTab === tab
                    const backgroundColor = isActive ? colors["accent"] : isHovered ? colors["background3"] : colors["background1"]

                    return (
                        <div
                            key={tab}
                            onMouseEnter={() => setHoveredTab(tab)}
                            onMouseLeave={() => setHoveredTab(null)}
                        >
                            <Button
                                variant={isActive ? "fill" : "ghost"}
                                size="lg"
                                func={() => setActiveTab(tab)}
                                specificStyles={{ backgroundColor }}
                            >
                                {tab}
                            </Button>
                        </div>
                    )
                })}
            </Frame>
        </Frame>
    )
}
