import { IconType } from "../components/ui/primitives/icon"

export type navItem = {
    id: string,
    text:string,
    icon :IconType
    link: string
}
export type navItems = navItem[]

export type DashboardView = "finance" | "operations" | "customers" | "team"

export const financialView: navItems = [
    {
        id: "fin-dashboard",
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard/finance"
    },
    {
        id: "fin-businesses",
        text: "Businesses", /*change to real page name*/
        icon: "icon-store",
        link:"/dashboard/finance/businesses" /*change to real page link*/
    },
    {
        id: "transactions",
        text: "Transactions",
        icon: "icon-transactions",
        link: "/dashboard/finance/transactions"
    },
    {
        id: "settings",
        text: "Settings",
        icon: "icon-settings",
        link: "/dashboard/settings"
    },
    {
        id: "support",
        text: "Support",
        icon: "icon-headset",
        link: "/dashboard/support"
    }
]

export const operationsView: navItems = [
     {
        id: "ops-dashboard",
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard/operations"
    },
      {
        id: "tasks",
        text: "Tasks",
        icon: "icon-notes",
        link: "/dashboard/operations/tasks"
    },
      {
        id: "schedules",
        text: "Schedules",
        icon: "icon-calendar-check",
        link: "/dashboard/operations/schedules"
    },
    {
        id: "settings",
        text: "Settings",
        icon: "icon-settings",
        link: "/dashboard/settings"
    },
    {
        id: "support",
        text: "Support",
        icon: "icon-headset",
        link: "/dashboard/support"
    }
]

export const customersView: navItems = [
      {
        id: "cus-dashboard",
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard/customers"
    },
    {
        id: "settings",
        text: "Settings",
        icon: "icon-settings",
        link: "/dashboard/settings"
    },
    {
        id: "support",
        text: "Support",
        icon: "icon-headset",
        link: "/dashboard/support"
    }
]

export const teamsView: navItems = [
      {
        id: "team-dashboard",
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard/team"
    },
    {
        id: "settings",
        text: "Settings",
        icon: "icon-settings",
        link: "/dashboard/settings"
    },
    {
        id: "support",
        text: "Support",
        icon: "icon-headset",
        link: "/dashboard/support"
    }
]

export const dashboardViewNavItems: Record<DashboardView, navItems> = {
    finance: financialView,
    operations: operationsView,
    customers: customersView,
    team: teamsView,
}

const DASHBOARD_VIEW_STORAGE_KEY = "dashboard-view"

function getStoredDashboardView(): DashboardView | null {
    if (typeof window === "undefined") return null

    const storedValue = window.sessionStorage.getItem(DASHBOARD_VIEW_STORAGE_KEY)

    if (storedValue === "finance" || storedValue === "operations" || storedValue === "customers" || storedValue === "team") {
        return storedValue
    }

    return null
}

function persistDashboardView(view: DashboardView) {
    if (typeof window === "undefined") return

    window.sessionStorage.setItem(DASHBOARD_VIEW_STORAGE_KEY, view)
}

export function getDashboardViewFromPath(pathname: string): DashboardView {
    if (pathname.startsWith("/dashboard/finance")) {
        persistDashboardView("finance")
        return "finance"
    }

    if (pathname.startsWith("/dashboard/operations")) {
        persistDashboardView("operations")
        return "operations"
    }

    if (pathname.startsWith("/dashboard/customers")) {
        persistDashboardView("customers")
        return "customers"
    }

    if (pathname.startsWith("/dashboard/team") || pathname.startsWith("/dashboard/teams")) {
        persistDashboardView("team")
        return "team"
    }

    if (pathname.startsWith("/dashboard/settings") || pathname.startsWith("/dashboard/support")) {
        return getStoredDashboardView() ?? "finance"
    }

    return getStoredDashboardView() ?? "finance"
}

export function getNavItemsForPath(pathname: string): navItems {
    return dashboardViewNavItems[getDashboardViewFromPath(pathname)]
}