"use client"
import Frame from "../../ui/primitives/frame"
import Paragraph from "../../ui/primitives/paragraph"
import Icon from "../../ui/primitives/icon"
import { useTheme } from "../../providers/themeProvider"
import { FrameSizeType } from "@/src/types/types"
import abridgeNumber from "@/src/utils/abridgeNumber"
import Card from "../../ui/composites/card"
import Tooltip from "../../ui/composites/tooltip"
import Button from "../../ui/primitives/button"
import Spinner from "../../ui/composites/spinner"
import { kpiObjectProps } from "@/src/types/types"


type KpiCardProps = {
  kpi: kpiObjectProps
  width?: FrameSizeType
}


export default function KpiCard({
  kpi,
  width = "100%",
}: KpiCardProps) {

  const trendIcon =
    kpi?.trend === "up"
      ? "icon-trend-up"
      : kpi?.trend === "down"
        ? "icon-trend-down"
        : undefined

  const trendColor =
    kpi?.trend === "up"
      ? "success"
      : kpi?.trend === "down"
        ? "error"
        : undefined

  return (

      <Card width={width} height="100px" padding="lg" rounded="md" className="flex-1 bg-[var(--color-white)]">
        <Frame className="justify-between w-full">
          <Paragraph size="xs" weight="medium" color="textColor2">
            {kpi.title}
          </Paragraph>
          <Frame 
            specificStyles={{ position: "absolute", right: "-5px", top: "-5px"}}>
              <Tooltip content={kpi.meaning} width="stretch" position="top"
                specificStyle={{
                  display: kpi.meaning ? "flex" : "none",
                }}
              >
                <Icon size="sm" name="icon-info"/>
              </Tooltip>
          </Frame>
        </Frame>

        <Paragraph size="lg" color="textColor1" weight="medium">
          {abridgeNumber(kpi.value)}
        </Paragraph>

        {
          trendIcon && trendColor && (
          <Frame className=" w-full h-max flex items-center gap-[var(--space-xs)] mt-[var(--space-xs)]">
            <Icon name={trendIcon} size="xs" color={trendColor} />
            <Paragraph size="xxs" color={trendColor} weight="normal">
              {kpi.trend === "up" ? `increased by ${kpi.change}%` : `decreased by ${kpi.change}%`}
            </Paragraph>
          </Frame>
        )}
      </Card>
      )
}