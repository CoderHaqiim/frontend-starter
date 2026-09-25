"use client"
import { FrameSizeType, kpiObjectProps } from "@/src/types/types"
import abridgeNumber from "@/src/utils/abridgeNumber"
import Card from "../../base/ui/composites/card"
import Tooltip from "../../base/ui/composites/tooltip"
import Frame from "../../base/ui/primitives/frame"
import Icon from "../../base/ui/primitives/icon"
import Paragraph from "../../base/ui/primitives/paragraph"


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

      <Card width={width} height="110px" padding="lg" className="flex-1 bg-[var(--color-white)]" specificStyles={{
        border:0,
        justifyContent: "center",
        borderRadius: "0"
      }}>
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

        <Paragraph size="xl" color="textColor1" weight="semiBold">
          {abridgeNumber(kpi.value)}
        </Paragraph>

        {kpi.description ? (
          <Paragraph size="xxs" color="textColor2" weight="normal">
            {kpi.description}
          </Paragraph>
        ) : (
          trendIcon && trendColor && (
          <Frame className=" w-full h-max flex items-center gap-[var(--space-xs)] mt-[var(--space-xs)]">
            <Icon name={trendIcon} size="xs" color={trendColor} />
            <Paragraph size="xxs" color={trendColor} weight="normal">
              {kpi.trend === "up" ? `increased by ${kpi.change}%` : `decreased by ${kpi.change}%`}
            </Paragraph>
          </Frame>
          )
        )}
      </Card>
      )
}