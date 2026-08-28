import { BusinessKpiResponse, Duration } from "@/src/types/types"

export const businessKpiSummaries: Record<Duration, BusinessKpiResponse[]> = {
  weekly: [
    {
      businessId: "0",
      financials: {
        revenue: {
          value: 250000,
          change: 9,
          direction: "up",
        },
        expenses: {
          value: 160000,
          change: 4,
          direction: "up",
        },
        netProfit: {
          value: 90000,
          change: 13,
          direction: "up",
        },
        cashBalance: {
          value: 5000000,
          change: 2,
          direction: "up",
        },
      },
    },
    {
      businessId: "1",
      financials: {
        revenue: {
          value: 3100000,
          change: 2,
          direction: "up",
        },
        expenses: {
          value: 3550000,
          change: 12,
          direction: "up",
        },
        netProfit: {
          value: -450000,
          change: 7,
          direction: "down",
        },
        cashBalance: {
          value: 8700000,
          change: 1,
          direction: "down",
        },
      },
    },
    {
      businessId: "2",
      financials: {
        revenue: {
          value: 2250000,
          change: 6,
          direction: "up",
        },
        expenses: {
          value: 1600000,
          change: 3,
          direction: "up",
        },
        netProfit: {
          value: 650000,
          change: 8,
          direction: "up",
        },
        cashBalance: {
          value: 7600000,
          change: 2,
          direction: "up",
        },
      },
    },
    {
      businessId: "3",
      financials: {
        revenue: {
          value: 1900000,
          change: 11,
          direction: "up",
        },
        expenses: {
          value: 1020000,
          change: 4,
          direction: "up",
        },
        netProfit: {
          value: 880000,
          change: 12,
          direction: "up",
        },
        cashBalance: {
          value: 6200000,
          change: 3,
          direction: "up",
        },
      },
    },
    {
      businessId: "4",
      financials: {
        revenue: {
          value: 250000,
          change: 1,
          direction: "up",
        },
        expenses: {
          value: 180000,
          change: 3,
          direction: "up",
        },
        netProfit: {
          value: 70000,
          change: 2,
          direction: "up",
        },
        cashBalance: {
          value: 1200000,
          change: 1,
          direction: "down",
        },
      },
    },
  ],
  monthly: [
    {
      businessId: "0",
      financials: {
        revenue: {
          value: 1000000,
          change: 12,
          direction: "up",
        },
        expenses: {
          value: 650000,
          change: 8,
          direction: "up",
        },
        netProfit: {
          value: 350000,
          change: 15,
          direction: "up",
        },
        cashBalance: {
          value: 5000000,
          change: 6,
          direction: "up",
        },
      },
    },
    {
      businessId: "1",
      financials: {
        revenue: {
          value: 12500000,
          change: 4,
          direction: "up",
        },
        expenses: {
          value: 14200000,
          change: 18,
          direction: "up",
        },
        netProfit: {
          value: -1700000,
          change: 11,
          direction: "down",
        },
        cashBalance: {
          value: 8700000,
          change: 3,
          direction: "down",
        },
      },
    },
    {
      businessId: "2",
      financials: {
        revenue: {
          value: 9000000,
          change: 9,
          direction: "up",
        },
        expenses: {
          value: 6500000,
          change: 5,
          direction: "up",
        },
        netProfit: {
          value: 2500000,
          change: 10,
          direction: "up",
        },
        cashBalance: {
          value: 7600000,
          change: 4,
          direction: "up",
        },
      },
    },
    {
      businessId: "3",
      financials: {
        revenue: {
          value: 7600000,
          change: 14,
          direction: "up",
        },
        expenses: {
          value: 4100000,
          change: 6,
          direction: "up",
        },
        netProfit: {
          value: 3500000,
          change: 16,
          direction: "up",
        },
        cashBalance: {
          value: 6200000,
          change: 7,
          direction: "up",
        },
      },
    },
    {
      businessId: "4",
      financials: {
        revenue: {
          value: 1000000,
          change: 2,
          direction: "up",
        },
        expenses: {
          value: 720000,
          change: 5,
          direction: "up",
        },
        netProfit: {
          value: 280000,
          change: 3,
          direction: "up",
        },
        cashBalance: {
          value: 1200000,
          change: 2,
          direction: "down",
        },
      },
    },
  ],
  annual: [
    {
      businessId: "0",
      financials: {
        revenue: {
          value: 12000000,
          change: 18,
          direction: "up",
        },
        expenses: {
          value: 7800000,
          change: 10,
          direction: "up",
        },
        netProfit: {
          value: 4200000,
          change: 22,
          direction: "up",
        },
        cashBalance: {
          value: 5000000,
          change: 9,
          direction: "up",
        },
      },
    },
    {
      businessId: "1",
      financials: {
        revenue: {
          value: 150000000,
          change: 8,
          direction: "up",
        },
        expenses: {
          value: 170400000,
          change: 20,
          direction: "up",
        },
        netProfit: {
          value: -20400000,
          change: 14,
          direction: "down",
        },
        cashBalance: {
          value: 8700000,
          change: 5,
          direction: "down",
        },
      },
    },
    {
      businessId: "2",
      financials: {
        revenue: {
          value: 108000000,
          change: 15,
          direction: "up",
        },
        expenses: {
          value: 78000000,
          change: 9,
          direction: "up",
        },
        netProfit: {
          value: 30000000,
          change: 17,
          direction: "up",
        },
        cashBalance: {
          value: 7600000,
          change: 7,
          direction: "up",
        },
      },
    },
    {
      businessId: "3",
      financials: {
        revenue: {
          value: 91200000,
          change: 21,
          direction: "up",
        },
        expenses: {
          value: 49200000,
          change: 11,
          direction: "up",
        },
        netProfit: {
          value: 42000000,
          change: 24,
          direction: "up",
        },
        cashBalance: {
          value: 6200000,
          change: 10,
          direction: "up",
        },
      },
    },
    {
      businessId: "4",
      financials: {
        revenue: {
          value: 12000000,
          change: 4,
          direction: "up",
        },
        expenses: {
          value: 8640000,
          change: 8,
          direction: "up",
        },
        netProfit: {
          value: 3360000,
          change: 6,
          direction: "up",
        },
        cashBalance: {
          value: 1200000,
          change: 3,
          direction: "down",
        },
      },
    },
  ],
}

export const businessKpis = businessKpiSummaries.monthly

export const getGeneralKpis = (period: Duration = "monthly") => businessKpiSummaries[period].reduce<BusinessKpiResponse>(
  (totals, business) => {
    totals.financials.revenue.value += business.financials.revenue.value
    totals.financials.expenses.value += business.financials.expenses.value
    totals.financials.netProfit.value += business.financials.netProfit.value
    totals.financials.cashBalance.value += business.financials.cashBalance.value

    return totals
  },
  {
    businessId: "all",
    financials: {
      revenue: {
        value: 0,
        change: 12,
        direction: "up",
      },
      expenses: {
        value: 0,
        change: 8,
        direction: "up",
      },
      netProfit: {
        value: 0,
        change: 15,
        direction: "up",
      },
      cashBalance: {
        value: 0,
        change: 6,
        direction: "up",
      },
    },
  }
)

export const generalKpis = getGeneralKpis("monthly")
