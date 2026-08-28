import { ChartPeriod, ChartPoint } from "../types/types"
import { useBackdropState } from "../store/backdropState"
import ExpandedChart from "../components/ui/charts/expandedChart"
import { chartTypes } from "../types/types"

export default function useExtendedChart() {
  const { setBackdropOpen, setBackdropContent } = useBackdropState()

  const openChart = (chartData: ChartPoint[], selectedChart: chartTypes, selectedPeriod: ChartPeriod) => {
    setBackdropContent(
      <ExpandedChart chartData={chartData} selectedChart={selectedChart} selectedPeriod={selectedPeriod}/>
    )

    setBackdropOpen(true)
  }

  return {
    openChart,
  }
}
