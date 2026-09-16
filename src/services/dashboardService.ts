import { BusinessHealth, BusinessKpiResponse, Duration } from "@/src/types/types"
import { kpiResponseToCards } from "@/src/utils/kpiResponseToCards"
import { getBusinessKpis, getBusinesses, getBusinessesHealth, getDashboardKpis } from "./businessService"

export function dashboardSummaryQueryKey(period: Duration) {
  return ["dashboard-summary", period]
}

export function dashboardRankingQueryKey(period: Duration) {
  return ["dashboard-ranking", period]
}

export async function getDashboardSummary(period: Duration) {
  const [businesses, kpis, healthStatus] = await Promise.all([
    getBusinesses(),
    getDashboardKpis(period),
    getBusinessesHealth(period),
  ])

  const businessSummaryKpiList = await Promise.all(
    businesses.map((business) => getBusinessKpis(business.id, period))
  )

  return {
    businesses,
    dashboardKpis: kpiResponseToCards(kpis, "NGN"),
    businessHealth: Object.fromEntries(
      healthStatus.map((item) => [item.businessId, item])
    ) as Record<string, BusinessHealth>,
    businessSummaryKpis: Object.fromEntries(
      businessSummaryKpiList.map((kpi) => [kpi.businessId, kpi])
    ) as Record<string, BusinessKpiResponse>,
  }
}

export async function getDashboardRanking(period: Duration) {
  const businesses = await getBusinesses()
  const businessRankingKpiList = await Promise.all(
    businesses.map((business) => getBusinessKpis(business.id, period))
  )

  return {
    businesses,
    businessRankingKpis: Object.fromEntries(
      businessRankingKpiList.map((kpi) => [kpi.businessId, kpi])
    ) as Record<string, BusinessKpiResponse>,
  }
}
