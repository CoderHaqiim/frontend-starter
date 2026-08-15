"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/userState"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Dropdown from "@/src/components/ui/composites/dropdown"
import Chart1 from "@/src/components/ui/charts/chart1" 
import BusinessOverviewCard from "@/src/components/app/cards/businessOverviewCard"
import MetricsRow from "@/src/components/app/metricsRow"
import Transaction from "@/src/components/app/transaction"
import { useState, useEffect, useRef, useCallback } from "react"
import { Businesses } from "@/src/types/types"
import { http } from "@/src/http/client"
import { useBusinessesState } from "@/src/store/businessesState"
import List from "@/src/components/ui/composites/list"
import Section from "@/src/components/layout/section"
import KpiCard from "@/src/components/app/cards/kpiCard"
import RightAside from "@/src/components/app/rightAside"
import Button from "@/src/components/ui/primitives/button"
import { shadow2 } from "@/src/app/design/shadows"
import Tooltip from "@/src/components/ui/composites/tooltip"
import { shadow1 } from "@/src/app/design/shadows"
import KpiRow from "@/src/components/ui/composites/kpiRow"

export default function Home() {
  const {userState} = useUserState()
  const reportDuration = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")
  const businessMetrics = ["profit","revenue","expenses"]
  const {businessesState, setBusinessesState} = useBusinessesState()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const dashboardKpis = [
    {
      title: "Active businesses",
      value: "3"
    },
    {
      title: "Tasks",
      value: "10"
    },
    {
      title: "Schedules",
      value: "2"
    },
    {
      title: "Transactions",
      value: "30"
    }
  ]

  const updateSliderButtons = useCallback(() => {
  const slider = sliderRef.current;

  if (!slider) return;

  const { scrollLeft, scrollWidth, clientWidth } = slider;
  setShowLeftButton(scrollLeft > 0);
  setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
}, []);

useEffect(()=>{
    const fetchBusinesses = async() => {
      const businesses = await http<Businesses>("/api/businesses", undefined, {method: "GET"})
      setBusinessesState(businesses)
    }
    
    fetchBusinesses()
  },[])

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    updateSliderButtons();
    slider.addEventListener("scroll", updateSliderButtons);
    window.addEventListener("resize", updateSliderButtons);
    return () => {
      slider.removeEventListener("scroll", updateSliderButtons);
      window.removeEventListener("resize", updateSliderButtons);
    };
}, [businessesState, updateSliderButtons]);

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

const scrollLeftHandler = () => {
  sliderRef.current?.scrollBy({
    left: -266,
    behavior: "smooth",
  });
};

const scrollRightHandler = () => {
  sliderRef.current?.scrollBy({
    left: 266,
    behavior: "smooth",
  });
};

  return (
      <Frame width="stretch" direction="column" height="hug" gap="lg"> 
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Operations</Heading>
        </Frame>
        
        <KpiRow kpis={dashboardKpis}/>

         {/* Latest Transactions */}
          <Section>
            <Frame width="stretch" justify="space-between" align="center" height="hug" className="mb-[var(--space-md)]">
              <Heading size="md" type="h2">Latest Transactions</Heading>
              <Frame width="hug" height="hug" gap="sm">
                <Dropdown name="ranking" size="sm" options={["Business1", "Business2", "Business3"]}/>
              </Frame>
            </Frame>
              <List height="200px" scroll="hidden">
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
              </List>
            </Section>
      </Frame>
  )
}
