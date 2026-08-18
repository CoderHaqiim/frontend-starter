"use client"
import { LineChart, Line, BarChart, Bar, CartesianGrid} from 'recharts';
import { useLegend, useTooltip, useAxis} from './chart.utils';
import { useTheme } from '../../app/themeProvider';
import Frame from '../primitives/frame';

// #region Sample data
const data = [
  {
    name: 'week 0',
    "total income": 9000,
    "expenses": 3400,
    "profit": 5600,
  },
  {
    name: 'week 1',
    "total income": 8000,
    "expenses": 1300,
    "profit": 6700,
  },
  {
    name: 'week 2',
    "total income": 9000,
    "expenses": 4000,
    "profit": 5000,
  },
  {
    name: 'week 3',
    "total income": 3000,
    "expenses": 3908,
    "profit": 908,
  },
  {
    name: 'week 4',
    "total income": 1890,
    "expenses": 4800,
    "profit": 2181,
  }
];

type ChartProps = {
  variant: "Line chart" | "Bar chart"
}
// #endregion

export default function Chart1({variant}: ChartProps) {
    const {colors} = useTheme()

    const chartStyle = {
        width: '100%',
        maxWidth: 'none',
        height: '100%',
        maxHeight: '400px',
        aspectRatio: 2,
        outline: "none",
        backgroundColor: colors["white"],
        padding: "var(--space-md)",
        boxSizing: "border-box" as const,
    }

  return (
    <Frame className=" w-full rounded-[var(--radius-md)] p-[var(--space-lg)] border-[1px] border-[var(--color-outline2)] bg-[var(--color-white)]">
      {variant === "Line chart" ? (
      <LineChart
        style={chartStyle}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" stroke={colors["outline1"]} />
      {useAxis("x")}
      {useAxis("y")}
      {useTooltip()}
      {useLegend()}
      <Line
        type="monotone"
        dataKey="total income"
        stroke={colors["accent"]}
        dot={{
          fill: colors["accent"],
        }}
        activeDot={{ r: 5, stroke: colors["accent"] }}
      />
      <Line
        type="monotone"
        dataKey="expenses"
        stroke = {colors["error"]}
        dot={{
          fill: colors["error"],
        }}
        activeDot={{ r: 5, stroke: colors["error"] }}
      />
      <Line
        type="monotone"
        dataKey="profit"
        stroke = {colors["success"]}
        dot={{
          fill: "#217cc7",
        }}
        activeDot={{ r: 5, stroke: colors["success"] }}
      />
    </LineChart>
  ) : (
    <BarChart
      style={chartStyle}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {useAxis("x")}
      {useAxis("y")}
      { useTooltip()}
      {useLegend()}
      <Bar dataKey="total income" fill={colors["accent"]} activeBar={{ fill:colors["accent"]}} radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" fill= {colors["error"]} activeBar={{ fill:colors["error"] }} radius={[4, 4, 0, 0]} />
      <Bar dataKey="profit" fill={colors["success"]} activeBar={{ fill:colors["success"]}} radius={[4, 4, 0, 0]} />
    </BarChart>
    )}
    </Frame>
)}
    