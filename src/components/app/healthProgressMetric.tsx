import Frame from "../ui/primitives/frame"
import Tooltip from "../ui/composites/tooltip"
import Icon from "../ui/primitives/icon"
import LinearProgress from "../ui/composites/linearProgressBar"
import Heading from "../ui/primitives/heading"
import { healthMap } from "@/src/utils/healthMap"
import { scoreHealthMap } from "@/src/utils/scoreHealthMap"
import { BusinessHealth } from "@/src/types/types"

type healthProgressProps = {
  item: {
    key: keyof BusinessHealth["metrics"]
    label: string
    description: string
    value?: number
  }
}

export default function HealthProgressMetric({item} : healthProgressProps) {
  return (
    <Frame className="flex-col justify-between gap-[var(--space-xxs)] p-[var(--space-md)] items-start w-full h-max rounded-[var(--radius-sm)] bg-[var(--color-background1)]">
        <Frame className='top-[4px] h-max w-max right-[4px]' specificStyles={{position: 'absolute'}}>
            <Tooltip content={item.description}>
                <Icon name="icon-info" size="xs" stroke="2"/>
            </Tooltip>
        </Frame>
        <Heading type="h3" size='xxs'>{item.label}</Heading>
        <LinearProgress height={3} textSize='xxs' score={item.value ?? 0} color={healthMap[scoreHealthMap(item.value ?? 0)]} />
    </Frame>
  )
}
