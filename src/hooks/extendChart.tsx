import ExpandedChart from "../components/base/ui/charts/expandedChart"
import { useBackdropState } from "../store/backdropState"
import { ChartPeriod, ChartPoint, chartTypes } from "../types/types"

export default function useExtendedChart() {
  const { setBackdropOpen, setBackdropContent } = useBackdropState()

  const openChart = (chartData: ChartPoint[], selectedChart: chartTypes, selectedPeriod: ChartPeriod) => {
    setBackdropContent(
      <ExpandedChart chartData={chartData} selectedChart={selectedChart} selectedPeriod={selectedPeriod}/>
    )

    setBackdropOpen(true)
  }

  return { openChart }
}
