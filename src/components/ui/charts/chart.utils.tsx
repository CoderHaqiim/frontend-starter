"use client"

import { fontWeight } from "@/src/app/design/typograhy"
import { bodySize } from "@/src/app/design/typograhy"
import { radius } from "@/src/app/design/radius";
import {XAxis, YAxis,Tooltip, Legend } from 'recharts';
import { useTheme } from "../../app/themeProvider";


export const useLegend = () =>{
        return (
            <Legend 
                wrapperStyle={{
                    fontSize: bodySize["sm"],
                    fontWeight: fontWeight["medium"],
                }}
                align="left"
                iconType="square"
                iconSize={5}
                fontSize= "8px"
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
                    backgroundColor: colors["white"],
                    borderColor:  colors["outline1"],
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
        <XAxis dataKey="name" axisLine={{stroke: colors["outline1"]}}  tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["xs"], fill: colors["textColor2"]}} tickLine={{ stroke: colors["outline1"] }}/>:
        <YAxis width="auto" axisLine={{stroke: colors["outline1"]}} tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["xs"], fill: colors["textColor2"] }} tickLine={{ stroke: colors["outline1"] }}/>
    ) 
}