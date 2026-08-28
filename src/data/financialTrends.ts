type FinancialTrendPoint = {
  date: string
  income: number
  expenses: number
  profit: number
}

type FinancialTrendPeriod = "7d" | "30d" | "12m"

export const financialTrends: Record<FinancialTrendPeriod, FinancialTrendPoint[]> = {
  "7d": [
    {
      date: "2026-08-19",
      income: 450000,
      expenses: 280000,
      profit: 170000,
    },
    {
      date: "2026-08-20",
      income: 520000,
      expenses: 310000,
      profit: 210000,
    },
    {
      date: "2026-08-21",
      income: 380000,
      expenses: 190000,
      profit: 190000,
    },
    {
      date: "2026-08-22",
      income: 610000,
      expenses: 350000,
      profit: 260000,
    },
    {
      date: "2026-08-23",
      income: 490000,
      expenses: 270000,
      profit: 220000,
    },
    {
      date: "2026-08-24",
      income: 720000,
      expenses: 400000,
      profit: 320000,
    },
    {
      date: "2026-08-25",
      income: 550000,
      expenses: 290000,
      profit: 260000,
    },
  ],

  "30d": [
    {
      date: "2026-07-27",
      income: 420000,
      expenses: 240000,
      profit: 180000,
    },
    {
      date: "2026-07-28",
      income: 465000,
      expenses: 275000,
      profit: 190000,
    },
    {
      date: "2026-07-29",
      income: 398000,
      expenses: 218000,
      profit: 180000,
    },
    {
      date: "2026-07-30",
      income: 542000,
      expenses: 312000,
      profit: 230000,
    },
    {
      date: "2026-07-31",
      income: 488000,
      expenses: 266000,
      profit: 222000,
    },
    {
      date: "2026-08-01",
      income: 450000,
      expenses: 280000,
      profit: 170000,
    },
    {
      date: "2026-08-02",
      income: 515000,
      expenses: 301000,
      profit: 214000,
    },
    {
      date: "2026-08-03",
      income: 472000,
      expenses: 248000,
      profit: 224000,
    },
    {
      date: "2026-08-04",
      income: 558000,
      expenses: 322000,
      profit: 236000,
    },
    {
      date: "2026-08-05",
      income: 610000,
      expenses: 350000,
      profit: 260000,
    },
    {
      date: "2026-08-06",
      income: 584000,
      expenses: 333000,
      profit: 251000,
    },
    {
      date: "2026-08-07",
      income: 632000,
      expenses: 374000,
      profit: 258000,
    },
    {
      date: "2026-08-08",
      income: 569000,
      expenses: 319000,
      profit: 250000,
    },
    {
      date: "2026-08-09",
      income: 601000,
      expenses: 342000,
      profit: 259000,
    },
    {
      date: "2026-08-10",
      income: 520000,
      expenses: 290000,
      profit: 230000,
    },
    {
      date: "2026-08-11",
      income: 645000,
      expenses: 371000,
      profit: 274000,
    },
    {
      date: "2026-08-12",
      income: 598000,
      expenses: 348000,
      profit: 250000,
    },
    {
      date: "2026-08-13",
      income: 706000,
      expenses: 402000,
      profit: 304000,
    },
    {
      date: "2026-08-14",
      income: 664000,
      expenses: 377000,
      profit: 287000,
    },
    {
      date: "2026-08-15",
      income: 680000,
      expenses: 390000,
      profit: 290000,
    },
    {
      date: "2026-08-16",
      income: 724000,
      expenses: 418000,
      profit: 306000,
    },
    {
      date: "2026-08-17",
      income: 691000,
      expenses: 386000,
      profit: 305000,
    },
    {
      date: "2026-08-18",
      income: 742000,
      expenses: 431000,
      profit: 311000,
    },
    {
      date: "2026-08-19",
      income: 450000,
      expenses: 280000,
      profit: 170000,
    },
    {
      date: "2026-08-20",
      income: 750000,
      expenses: 420000,
      profit: 330000,
    },
    {
      date: "2026-08-21",
      income: 380000,
      expenses: 190000,
      profit: 190000,
    },
    {
      date: "2026-08-22",
      income: 610000,
      expenses: 350000,
      profit: 260000,
    },
    {
      date: "2026-08-23",
      income: 490000,
      expenses: 270000,
      profit: 220000,
    },
    {
      date: "2026-08-24",
      income: 720000,
      expenses: 400000,
      profit: 320000,
    },
    {
      date: "2026-08-25",
      income: 820000,
      expenses: 450000,
      profit: 370000,
    },
  ],

  "12m": [
    {
      date: "2025-09",
      income: 4200000,
      expenses: 2800000,
      profit: 1400000,
    },
    {
      date: "2025-10",
      income: 4600000,
      expenses: 2900000,
      profit: 1700000,
    },
    {
      date: "2025-11",
      income: 5100000,
      expenses: 3100000,
      profit: 2000000,
    },
    {
      date: "2025-12",
      income: 5800000,
      expenses: 3500000,
      profit: 2300000,
    },
    {
      date: "2026-01",
      income: 4900000,
      expenses: 3000000,
      profit: 1900000,
    },
    {
      date: "2026-02",
      income: 5300000,
      expenses: 3200000,
      profit: 2100000,
    },
    {
      date: "2026-03",
      income: 6100000,
      expenses: 3600000,
      profit: 2500000,
    },
    {
      date: "2026-04",
      income: 6500000,
      expenses: 3800000,
      profit: 2700000,
    },
    {
      date: "2026-05",
      income: 7200000,
      expenses: 4100000,
      profit: 3100000,
    },
    {
      date: "2026-06",
      income: 6800000,
      expenses: 3900000,
      profit: 2900000,
    },
    {
      date: "2026-07",
      income: 7500000,
      expenses: 4200000,
      profit: 3300000,
    },
    {
      date: "2026-08",
      income: 8200000,
      expenses: 4500000,
      profit: 3700000,
    },
  ],
}
