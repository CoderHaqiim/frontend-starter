"use client"

import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import { scoreHealthMap } from "@/src/utils/scoreHealthMap"
import Link from "next/link"
import RadialProgress from "../../ui/composites/radialProgress"
import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import { paddingSizes } from "@/src/app/design/sizes"
import { healthMap } from "@/src/utils/healthMap"
import { generateHealthBackground } from "@/src/utils/healthBackground"
import Icon from "../../ui/primitives/icon"
import { useTheme } from "../themeProvider"

type SmallBusinessOverviewProps = {
    data: Business
}



export default function SmallBusinessOverview({data}: SmallBusinessOverviewProps) {
    const {colors} = useTheme()
    const healthBackground =  generateHealthBackground(data.health)

    return (
        <Link href={`/dashboard/performance/businesses/${data.id}`} className="transform transition-transform duration-300 cursor-pointer pointer-events-auto hover:z-20 hover:scale-[0.97]">
          <Card width="250px" height="300px" padding="lg" justify="space-between" specificStyles={{ 
                  position: "relative", 
                  flexShrink: 0,
                  background: `linear-gradient(${colors["white"]} 0%, ${colors["white"]} 70%, ${colors[healthBackground]} 90%)`,
              }}>
                  {/* Business name */}
                  <Frame width="stretch" justify="space-between" height="hug" align="center">
                      <Heading type="h3" size="xs">
                          {shortenText(data?.name, 22)}
                      </Heading>
                  </Frame>

                  {/* Health score */}
                  <Frame width="stretch" gap="sm" direction="column" align="center">
                      <RadialProgress color={healthMap[data.health]} score={data.healthScore} size={125} textSize="xxl" strokeWidth={2}/>
                      <Paragraph weight="semiBold" color={healthMap[data.health]} size="md">{data.health}</Paragraph>
                  </Frame>

                  {/* Financial summary */}
                  <Frame width="stretch"  gap="xl" direction="row" justify="center" className="bg-[]">
                      <Frame direction="column"align="center">
                          <Frame>
                              <Paragraph size="xxs"> Income </Paragraph>
                          </Frame>
                          <Frame>
                              <Paragraph color="textColor1" weight="bold" size="sm"> $4000 </Paragraph>
                          </Frame>
                      </Frame>
                      <Frame direction="column"align="center">
                          <Frame>
                              <Paragraph size="xxs"> Expenses </Paragraph>
                          </Frame>
                          <Frame>
                              <Paragraph weight="bold" color="textColor1" size="sm"> $4000 </Paragraph>
                          </Frame>
                      </Frame>
                      <Frame direction="column"align="center">
                          <Frame>
                              <Paragraph size="xxs"> Net Profit </Paragraph>
                          </Frame>
                          <Frame>
                              <Paragraph weight="bold" color="textColor1" size="sm"> $4000 </Paragraph>
                          </Frame>
                      </Frame>
                  </Frame>
          </Card>
        </Link>
    )
}