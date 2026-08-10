"use client"

import { fontWeight } from "@/src/app/design/typograhy"
import { bodySize } from "@/src/app/design/typograhy"
import { radius } from "@/src/app/design/radius";
import {XAxis, YAxis,Tooltip, Legend } from 'recharts';
import { useTheme } from "../../app/themeProvider";
import {space} from "@/src/app/design/spacing";


export const useLegend = () =>{
        return (
            <Legend 
                wrapperStyle={{
                    fontSize: bodySize["xxs"],
                    fontWeight: fontWeight["medium"]
                }}
                align="left"
                iconType="square"
                iconSize={5}
                fontSize= "8px"
                verticalAlign="bottom"
            />
        )
    }

export const useTooltip = () => {
    const {colors} = useTheme()
        return (
            <Tooltip
                cursor={{
                    stroke: 'var(--textColor2)'
                }}
                contentStyle={{
                    backgroundColor: colors["background2"],
                    borderColor:  colors["outline2"],
                    borderRadius: radius["sm"],
                    boxShadow:"0px 2px 3px #00000080"
                }}
            />
        )
    }


export const useAxis =( type: "x" | "y" ) => {
    const {colors} = useTheme()
    return(
        type === "x"?
        <XAxis dataKey="name" axisLine={{stroke: colors["outline1"]}}  tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["sm"], fill: colors["textColor2"]}} tickLine={{ stroke: colors["outline1"] }}/>:
        <YAxis width="auto" axisLine={{stroke: colors["outline1"]}} tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["sm"], fill: colors["textColor2"] }} tickLine={{ stroke: colors["outline1"] }}/>
    ) 
}