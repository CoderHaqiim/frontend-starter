import { NextResponse } from "next/server";

// const data = [
//   {
//     "name": 'week 0',
//     "total income": 9000,
//     "expenses": 3400,
//     "profit": 5600,
//   },
//   {
//     "name": 'week 1',
//     "total income": 8000,
//     "expenses": 1300,
//     "profit": 6700,
//   },
//   {
//     "name": 'week 2',
//     "total income": 9000,
//     "expenses": 4000,
//     "profit": 5000,
//   },
//   {
//     "name": 'week 3',
//     "total income": 3000,
//     "expenses": 3908,
//     "profit": 908,
//   },
//   {
//     "name": 'week 4',
//     "total income": 1890,
//     "expenses": 4800,
//     "profit": 2181,
//   }
// ];

const data = {
    weekly:[
        {
            day:"sunday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"monday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"tuesday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"wednesday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"thursday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"friday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"saturday",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        }
    ],

    monthly:[
        {
            day:"week1",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"week2",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"week3",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"week4",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        }
    ],

    annual:[
        {
            day:"january",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"february",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"march",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"april",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"may",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"july",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"august",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"september",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"october",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"november",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        },
        {
            day:"december",
            income: 1890,
            expenses: 4800,
            profit: 2181,
        }
    ]
}

const homeDashboard = {
  period: "month",

  summary: {
    totalIncome: 4200000,
    totalExpenses: 1800000,
    netProfit: 2400000,
    cashBalance: 3100000,
  },

  businesses: 4,

  performance: {
    period: "month",
    granularity: "day",

    data: [
      {
        date: "2026-08-01",
        income: 150000,
        expenses: 50000,
        netProfit: 100000,
      },
      {
        date: "2026-08-02",
        income: 220000,
        expenses: 80000,
        netProfit: 140000,
      }
    ],
  },
}

export async function GET(){
    return NextResponse.json(data)
}

