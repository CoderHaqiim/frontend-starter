import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { colors } from '@/src/app/design/colors';
import { bodySize, fontWeight } from '@/src/app/design/typograhy';

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

    const chartStyle = {
        width: '100%',
        maxWidth: '600px',
        height: '100%',
        maxHeight: '300px',
        aspectRatio: 1.618
    }

    const useLegend = () =>{
        return (
            <Legend 
                align='left'
                iconType="square"
                iconSize={5}
            />
        )
    }

  return (

    variant === "Line chart" ? (
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
      <CartesianGrid strokeDasharray="3 3" stroke={colors["outline"]} />
      <XAxis dataKey="name" axisLine={{stroke: colors["textColor1"]}}  tick={{ fontWeight: fontWeight["medium"], fontSize: bodySize["xs"], fill: colors["textColor2"]}} tickLine={{ stroke: colors["textColor1"] }}/>
      <YAxis width="auto" axisLine={{stroke: colors["textColor1"]}} tick={{ fontWeight: fontWeight["medium"], fontSize: bodySize["xs"], fill: colors["textColor2"] }} tickLine={{ stroke: colors["textColor1"] }}/>
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'white',
          borderColor: 'var(--color-border-2)',
        }}
      />
      {useLegend()}
      <Line
        type="monotone"
        dataKey="total income"
        stroke="#4615a9"
        dot={{
          fill: colors["textColor2"],
        }}
        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
      />
      <Line
        type="monotone"
        dataKey="expenses"
        stroke="#d64528"
        dot={{
          fill: colors["textColor2"],
        }}
        activeDot={{ stroke: 'var(--color-surface-base)' }}
      />
      <Line
        type="monotone"
        dataKey="profit"
        stroke="#217cc7"
        dot={{
          fill: colors["textColor2"],
        }}
        activeDot={{ stroke: 'var(--color-surface-base)' }}
      />
    </LineChart>
  ) : (<BarChart
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
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      {useLegend()}
      <Bar dataKey="total income" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="expenses" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="profit" fill="#217cc7" activeBar={{ fill: 'lightblue', stroke: 'darkblue' }} radius={[10, 10, 0, 0]} />
    </BarChart>
    )
)}
    