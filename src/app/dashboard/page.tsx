"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/user"
import Card from "@/src/components/ui/composites/card"
import { space } from "../design/spacing"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import { colors } from "../design/colors"
import { fontWeight } from "../design/typograhy"
import Dropdown from "@/src/components/ui/composites/dropdown"
import Chart1 from "@/src/components/ui/charts/chart1" 
import Modal from "@/src/components/ui/composites/modal"
import { useState } from "react"

export default function Home() {
  const {userState} = useUserState()
  const reportOptions = ["This week", "This month", "This year"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<"Line chart" | "Bar chart">("Line chart")

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as "Line chart" | "Bar chart";
    setSelectedChart(selectedValue);
  };

  return (
    <Frame width="stretch" direction="column" height="hug"
      specificStyles={{
        gap: space["lg"]
      }}> 
      <Frame width="hug" height="hug" direction="column">
        <Heading size="xl" type="h1" text={`Welcome back, ${userState.username}.`}/>
        <Paragraph size="md">
          Here's what's happening today.
        </Paragraph>
      </Frame>
      <Frame width="stretch" height="100px" 
        specificStyles={{
          gap: space["md"]
        }}>
        <Card width="stretch" height="stretch" padding="lg" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Active Businesses" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["normal"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            3
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="lg" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Total Income" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["normal"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $4000
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="lg" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Total Expenses" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["normal"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $500
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="lg" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Net Profit" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["normal"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $3500
          </Paragraph>
        </Card>
      </Frame>
       <Frame 
      width="stretch" 
      height="hug"
      specificStyles={{
        gap: space["md"]
      }}
      >
        <Card width="stretch" height="stretch" padding="lg" rounded="sm">
          <Frame width="stretch" height="hug" 
          specificStyles={{
            justifyContent:"space-between",
            marginBottom: space["md"]
          }}>
            <Heading 
              size="md" 
              type="h2" 
              text="Performance Overview"
            />
            <Frame 
              width="hug" 
              height="hug" 
              specificStyles={{
                gap: space["sm"]
              }}>
              <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler}/>
              <Dropdown name="report" size="sm" options={reportOptions}/>
            </Frame>
          </Frame>
          <Chart1 variant={selectedChart}/>
        </Card>
      </Frame>
      <Frame 
      width="stretch" 
      height="250px"
      specificStyles={{
        gap: space["md"]
      }}
      >
        <Card width="stretch" height="stretch" padding="md" rounded="sm">
          <Frame width="stretch" height="hug" 
          specificStyles={{
            justifyContent:"space-between"
          }}>
            <Heading 
              size="md" 
              type="h2" 
              text="Business Overview"
            />
          </Frame>
        </Card>
      </Frame>
    </Frame>
  )
}
