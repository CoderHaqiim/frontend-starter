import { shadow3 } from '@/src/app/design/shadows'
import { useBackdropState } from '@/src/store/backdropState'
import { ChartPeriod, ChartPoint, chartTypes, FunctionType } from '@/src/types/types'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { useEffect, useRef, useState } from 'react'
import Card from '../composites/card'
import Tooltip from '../composites/tooltip'
import Button from '../primitives/button'
import Frame from '../primitives/frame'
import Heading from '../primitives/heading'
import Chart1 from './chart1'


type ExpandedChartProps = {
    chartData: ChartPoint[]
    selectedChart: chartTypes
    selectedPeriod: ChartPeriod
}

export default function ExpandedChart({chartData, selectedChart, selectedPeriod}: ExpandedChartProps) {
    const [downloadOpen, setDownloadOpen] = useState<boolean>(false)
    const dialogRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLDivElement>(null)
    const {setBackdropOpen, setBackdropContent} = useBackdropState()

    useEffect(() => {
        if (!downloadOpen) return

        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target

            if (target instanceof Node && (triggerRef.current?.contains(target) || dialogRef.current?.contains(target))) {
                return
            }

            setDownloadOpen(false)
        }

        document.addEventListener('mousedown', handlePointerDown)

        return () => document.removeEventListener('mousedown', handlePointerDown)
    }, [downloadOpen])

    const openDownloadDialogue = () => {
        setDownloadOpen(true)
    }

    const closeDownloadDialogue = () => {
        setDownloadOpen(false)
    }

    const closeExpandedChart = () => {
        setBackdropContent(null)
        setBackdropOpen(false)
    }

    const period = {
        "7d": "Weekly",
        "30d" : "Monthly",
        "12m" : "Annual"
    }

    const chartRef = useRef<HTMLDivElement>(null)

    const downloadPNG = async () => {
        if (!chartRef.current) return

        try {
            const dataUrl = await toPng(chartRef.current, {
                pixelRatio: 2,
                backgroundColor: 'white',
            })

            const link = document.createElement('a')

            link.download = 'chart.png'
            link.href = dataUrl

            link.click()
        } catch (error) {
            console.error('Failed to download chart:', error)
        }
    }

    const downloadPDF = async () => {
        if (!chartRef.current) return

        try {
            const dataUrl = await toPng(chartRef.current, {
                pixelRatio: 2,
                backgroundColor: 'white',
            })

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: 'a4',
            })

            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()

            const margin = 40

            const imageWidth = pageWidth - margin * 2
            const imageHeight = imageWidth * (
                chartRef.current.offsetHeight /
                chartRef.current.offsetWidth
            )

            const y = (pageHeight - imageHeight) / 2

            pdf.addImage(
                dataUrl,
                'PNG',
                margin,
                Math.max(y, margin),
                imageWidth,
                imageHeight
            )

            pdf.save('chart.pdf')
        } catch (error) {
            console.error('Failed to download PDF:', error)
        }
    }

  return (
    <Frame className="w-[85vw] max-w-[900px] max-h-[650px] h-max flex-col gap-[var(--space-md)] rounded-[var(--radius-md)] bg-[var(--color-background2)] p-[var(--space-lg)]">
        <Frame className="w-max gap-[var(--space-sm)] items-end flex-col top-0 right-[-50px] justify-end" specificStyles={{ position: "absolute" }}>
            <Tooltip content="Close Chart" position="bottom">
                <Button variant="outline" isIcon iconName='icon-x' func={closeExpandedChart} size="sm" />
            </Tooltip>
            <div ref={triggerRef} className='relative flex flex-col'>
                <Tooltip content="Download Chart">
                    <Button size="sm" variant="outline" isIcon iconName="icon-download" func={openDownloadDialogue}/>
                </Tooltip>
                 <div
                    ref={dialogRef}
                    className={`${downloadOpen ? "flex" : "hidden"} top-[120%] z-[10] right-[0]`}
                    style={{ position: 'absolute' }}
                    onMouseLeave={closeDownloadDialogue}
                 >
                    <DownloadDialogue downloadPDF={downloadPDF} downloadPNG={downloadPNG}/>
                </div>
            </div>
        </Frame>
        <Frame ref={chartRef} className='flex-col gap-[var(--space-md)]'>
            <Heading size='sm' weight='normal' type='h1'>
                {period[selectedPeriod]} chart showing relationship between revenue, expenses and profit
            </Heading>
            <Chart1 height="400px" fixedRatio={false} variant={selectedChart} data={chartData} isLoading={false} selectedPeriod={selectedPeriod}/>
        </Frame>
    </Frame>
  )
}

function DownloadDialogue ({downloadPDF, downloadPNG}:{ downloadPDF: FunctionType, downloadPNG: FunctionType}){
    return(
        <Card padding="md" width="max-content" height="max-content" className={`gap-[var(--space-sm)] ${shadow3}`}>
            <Button width="150px" func={downloadPNG} size="sm" variant='outline' iconName='icon-download' specificStyles={{ borderRadius: `var(--radius-sm)`}}>Download PNG</Button>
            <Button width="150px"func={downloadPDF} size="sm" variant='fill' iconName='icon-download' specificStyles={{ borderRadius: `var(--radius-sm)`}}>Download PDF</Button>
        </Card>
    )
}
