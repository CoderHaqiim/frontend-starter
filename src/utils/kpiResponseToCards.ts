import { BusinessKpiResponse, kpiObjectProps } from "@/src/types/types"
import { getCurrencySymbol } from "./currencySymbol"

export function kpiResponseToCards(
  kpis: BusinessKpiResponse | null,
  currency = "NGN"
): kpiObjectProps[] {
  if (!kpis) {
    return []
  }
  const currencySymbol = getCurrencySymbol(currency)

  return [
    {
      title: "Revenue",
      value: `${currencySymbol} ${kpis.financials.revenue.value}`,
      trend: kpis.financials.revenue.direction,
      change: kpis.financials.revenue.change,
      meaning: "Total money the business makes from selling products or services, before deducting expenses.",
    },
    {
      title: "Expenses",
      value: `${currencySymbol} ${kpis.financials.expenses.value}`,
      trend: kpis.financials.expenses.direction,
      change: kpis.financials.expenses.change,
      meaning: "Costs and payments the business incurs to operate and deliver products or services.",
    },
    {
      title: "Net Profit",
      value: `${currencySymbol} ${kpis.financials.netProfit.value}`,
      trend: kpis.financials.netProfit.direction,
      change: kpis.financials.netProfit.change,
      meaning: "Money left after subtracting business expenses from revenue.",
    },
    {
      title: "Cash Balance",
      value: `${currencySymbol} ${kpis.financials.cashBalance.value}`,
      trend: kpis.financials.cashBalance.direction,
      change: kpis.financials.cashBalance.change,
      meaning: "Money the business currently has available to use.",
    },
  ]
}
