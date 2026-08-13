import Frame from "../../ui/primitives/frame"
import Paragraph from "../../ui/primitives/paragraph"
import Icon from "../../ui/primitives/icon"
import { useTheme } from "../../app/themeProvider"
import { FrameSizeType } from "@/src/types/types"
import abridgeNumber from "@/src/utils/abridgeNumber"
import Card from "../../ui/composites/card"
import Tooltip from "../../ui/composites/tooltip"

type KpiCardProps = {
    title: string,
    value: string,
    trend?: "up" | "down" | string,
    width?: FrameSizeType,
    meaning? : string
}

export default function KpiCard({title, meaning, value, trend, width = "stretch"}: KpiCardProps) {
  const { colors } = useTheme()
  const trendIcon = trend === "up" ? "icon-trend-up" : trend === "down" ? "icon-trend-down" : undefined
  const trendColor = trend === "up" ? "success" : trend === "down" ? "error" : undefined

  return (
    <Tooltip content={meaning} width="stretch" position="top" specificStyle={{
      display: meaning? "flex" : "none",
    }}>
        <Card width={width} height="100px" padding="lg" rounded="md" className="flex-1 bg-[var(--color-white)]">
          <Paragraph size="xs" color="textColor2">{title}</Paragraph>
          <Paragraph size="xxl" color="textColor1" weight="normal">{abridgeNumber(value)}</Paragraph>
          {trendIcon && trendColor && (
            <Frame width="stretch" height="hug" align="center" gap="xs" className="mt-[var(--space-xs)]">
              <Icon name={trendIcon} size="xs" color={trendColor} />
              <Paragraph size="xxs" color={trendColor} weight="normal">
                {trend === "up" ? "Trending up" : "Trending down"}
              </Paragraph>
            </Frame>
          )}
      </Card>
    </Tooltip>
    
  )
}
