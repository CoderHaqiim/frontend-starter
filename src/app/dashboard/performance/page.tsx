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
      title: "Total Revenue",
      value: "$4000"
    },
    {
      title: "Total Expenses",
      value: "$500"
    },
    {
      title: "Net Profit",
      value: "$3500"
    },
    {
      title: "Cash Balance",
      value: "$35000"
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
          <Heading size="xl" type="h1">{`Welcome back, ${userState.username}`}</Heading>
          <Paragraph weight="light" size="sm">
            Here's what's happening today.
          </Paragraph>
        </Frame>

        {/* Insights */}


        {/* KPIs */}
        <Frame width="stretch" height="100px" gap="md">
          {
            dashboardKpis.map((item, index) => <KpiCard key={index} title={item.title} value={item.value}/>)
          }
        </Frame>

        {/* Business Overview */}
        <Section>
          <Frame width="stretch" align="center" height="hug" className="justify-between mb-[var(--space-md)]">
            <Heading size="md" type="h2">Businesses Overview</Heading>
            <Frame width="hug" height="hug" gap="sm">
              <Dropdown name="ranking" size="sm" options={reportDuration}/>
            </Frame>
          </Frame>
          <Frame width="stretch" align="center" justify="space-between" height="stretch" className="top-0 left-0 z-[50] opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-150" specificStyles={{ position: "absolute" }}>
            
            <Tooltip content="slide right">
               <Button func={scrollLeftHandler} variant="outline" size="xl" isIcon iconName="icon-left" className={`bg-[var(--color-white)] ${shadow2}`} specificStyles={{
              display: `${showLeftButton? "flex" : "none"}`
            }}/>
            </Tooltip>
            <Tooltip content="slide left">
               <Button func={scrollRightHandler} variant="outline" size="xl" isIcon iconName="icon-right" className={`bg-[var(--color-white)] ${shadow2}`} specificStyles={{
              display: `${showRightButton? "flex" : "none"}`
            }}/>
            </Tooltip>
          </Frame>
          <Frame ref={sliderRef} width="stretch" height="hug" scroll="hidden" gap="lg">
            {
              businessesState.map(buisness => <BusinessOverviewCard data={buisness} key={buisness.id}/>)
            }
          </Frame>
        </Section>

        {/* Performance Overview */}
        <Section>
          <Frame width="stretch" align="center" height="hug" justify="space-between" className="mb-[var(--space-md)]">
              <Heading size="md" type="h2">Performance Overview</Heading>
              <Frame width="hug" height="hug" className="gap-[var(--space-sm)]">
                <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
                <Dropdown name="report" size="sm" options={reportDuration}/>
              </Frame>
          </Frame>
          <Chart1 variant={selectedChart}/>
        </Section>


        {/* Performance Ranking */}
        <Section>
            <Frame width="stretch" height="hug" className="justify-between mb-[var(--space-md)]">
              <Heading size="md" type="h2">Performance Ranking</Heading>
              <Frame width="hug" height="hug" gap="sm">
                <Dropdown name="ranking" size="sm" options={businessMetrics}/>
                <Dropdown name="ranking" size="sm" options={reportDuration}/>
              </Frame>
            </Frame>
            <List specificStyles={{overflow: "hidden"}}>
              <MetricsRow data={{name:"Business1"}}/>
              <MetricsRow data={{name:"Business2"}}/>
              <MetricsRow data={{name:"Business3"}}/>
              <MetricsRow data={{name:"Business4"}}/>
            </List>
        </Section>
        <Frame height="hug" width="hug" className="bottom-[var(--space-xl)] right-[var(--space-xxl)]" 
            specificStyles={{ position: "fixed", zIndex:"300"}}>
            <Tooltip position="top" content="add">
              <Button variant="fill" size="xxl" isIcon iconName="icon-plus" iconPosition="left" width="hug" rounded="lg" className={`${shadow1}`}/>
            </Tooltip>
        </Frame>
      </Frame>
    
  )
}
