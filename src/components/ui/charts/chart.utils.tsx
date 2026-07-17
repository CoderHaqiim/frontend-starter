import { fontWeight } from "@/src/app/design/typograhy"
import { bodySize } from "@/src/app/design/typograhy"
import { radius } from "@/src/app/design/radius";
import { colors } from "@/src/app/design/colors";
import {XAxis, YAxis,Tooltip, Legend } from 'recharts';

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
        return (
            <Tooltip
                cursor={{
                    stroke: 'var(--textColor2)'
                }}
                contentStyle={{
                    backgroundColor: colors["white"],
                    borderColor:  colors["outline"],
                    borderRadius: radius["sm"],
                    boxShadow:"0px 2px 3px #00000080"
                }}
            />
        )
    }

export const useAxis = {
    x: () => <XAxis dataKey="name" axisLine={{stroke: colors["outline"]}}  tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["xs"], fill: colors["textColor2"]}} tickLine={{ stroke: colors["outline"] }}/>,
    y: () =>  <YAxis width="auto" axisLine={{stroke: colors["outline"]}} tick={{ fontWeight: fontWeight["normal"], fontSize: bodySize["xs"], fill: colors["textColor2"] }} tickLine={{ stroke: colors["outline"] }}/>
}