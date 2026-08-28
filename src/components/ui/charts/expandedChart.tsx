import { useBackdropState } from '@/src/store/backdropState'
import Frame from '../primitives/frame'
import { ChartPoint, chartTypes} from '@/src/types/types'
import Button from '../primitives/button'
import Chart1 from './chart1'


type ExpandedChartProps = {
    chartData: ChartPoint[]
    selectedChart: chartTypes
}

export default function ExpandedChart({chartData, selectedChart}: ExpandedChartProps) {
    const {setBackdropOpen, setBackdropContent} = useBackdropState()
    
    const closeExpandedChart = () => {
        setBackdropContent(null)
        setBackdropOpen(false)
    }

  return (
    <Frame className="w-[85vw] max-w-[900px] max-h-[600px] h-max flex-col gap-[var(--space-md)] rounded-[var(--radius-md)] bg-[var(--color-background2)] p-[var(--space-lg)]">
        <Frame className="w-full top-[0px] right-[-50px] justify-end" specificStyles={{
            position: "absolute"
         }}>
            <Button size="sm" variant="outline" isIcon iconName="icon-x" func={closeExpandedChart}/>
        </Frame>
        <Chart1 height="450px" fixedRatio={false} variant={selectedChart} data={chartData} isLoading={false}/>
    </Frame>
  )
}
