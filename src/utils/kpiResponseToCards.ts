import { BusinessKpiResponse, kpiObjectProps } from "@/src/types/types"
import { getCurrencySymbol } from "./currencySymbol"

// The figures a KPI card can report, in the order the cards are shown.
export type FinancialMetric = keyof BusinessKpiResponse["financials"]

const metricCards: Record<FinancialMetric, { title: string; meaning: string }> = {
  revenue: {
    title: "Revenue",
    meaning: "Total money the business makes from selling products or services, before deducting expenses.",
  },
  receivables: {
    title: "Receivables",
    meaning: "Income earned by the business that customers have not paid for yet.",
  },
  expenses: {
    title: "Expenses",
    meaning: "Costs and payments the business incurs to operate and deliver products or services.",
  },
  profit: {
    title: "Net Profit",
    meaning: "Money left after subtracting business expenses from revenue.",
  },
  cashBalance: {
    title: "Cash Balance",
    meaning: "Money the business currently has available to use.",
  },
}

const allMetrics: FinancialMetric[] = [
  "revenue",
  "receivables",
  "expenses",
  "profit",
  "cashBalance",
]

// Turns a KPI response into the cards a page shows. A caller that does not report
// every figure passes the ones it does, which is how the dashboard leaves
// receivables to the per-business reports.
export function kpiResponseToCards(
  kpis: BusinessKpiResponse | null,
  currency = "NGN",
  metrics: FinancialMetric[] = allMetrics
): kpiObjectProps[] {
  
  if (!kpis) {
    return []
  }
  
  const currencySymbol = getCurrencySymbol(currency)

  return metrics.map((metric) => {
    const { title, meaning } = metricCards[metric]
    const figures = kpis.financials[metric]

    return {
      title,
      value: `${currencySymbol} ${figures.value}`,
      trend: figures.direction,
      change: figures.change,
      meaning,
    }
  })
}
