import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { colors } from '@/src/app/design/colors';
import { bodySize } from '@/src/app/design/typograhy';
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
    "profit": -908,
  },
  {
    name: 'week 4',
    "total income": 1890,
    "expenses": 4800,
    "profit": 2181,
  }
];
// #endregion

export default function Chart1() {
  return (
    <LineChart
      style={{ width: '100%', maxWidth: '600px', height: '100%', maxHeight: '300px', aspectRatio: 1.618 }}
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
      <XAxis dataKey="name" axisLine={{stroke: colors["textColor2"]}}  tick={{ fontSize: bodySize["sm"], fill: colors["textColor1"] }}/>
      <YAxis width="auto" axisLine={{stroke: colors["textColor2"]}} tick={{ fontSize: bodySize["sm"], fill: colors["textColor1"] }}/>
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'white',
          borderColor: 'var(--color-border-2)',
        }}
      />
      <Legend />
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
  );
}