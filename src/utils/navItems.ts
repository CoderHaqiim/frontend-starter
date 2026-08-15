import { IconType } from "../components/ui/primitives/icon"

export type navItem = {
    id: string,
    text:string,
    icon :IconType
    link: string
}
export type navItems = navItem[]

export type DashboardView = "performance" | "operations" | "customers" | "team"


export const performanceView: navItems = [
    {
        id: "per-dashboard",
        text: "Overview",
        icon: "icon-dashboard",
        link: "/dashboard/performance"
    },
    {
        id: "per-businesses",
        text: "Businesses", /*change to real page name*/
        icon: "icon-store",
        link:"/dashboard/performance/businesses" /*change to real page link*/
    },
    {
        id: "goals",
        text: "Goals",
        icon: "icon-badge-check",
        link: "/dashboard/performance/goals"
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
        text: "Overview",
        icon: "icon-dashboard",
        link: "/dashboard/operations"
    },
    {
        id: "transactions",
        text: "Transactions",
        icon: "icon-transactions",
        link: "/dashboard/operations/transactions"
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
        id: "invoices",
        text: "Invoices",
        icon: "icon-file-text",
        link: "/dashboard/operations/invoices"
    },
    {
        id: "uploads",
        text: "Uploads",
        icon: "icon-file-upload",
        link: "/dashboard/operations/uploads"
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
        text: "Overview",
        icon: "icon-dashboard",
        link: "/dashboard/customers"
    },
    {
        id: "directory",
        text: "Directory",
        icon: "icon-address-book",
        link: "/dashboard/customers/directory"
    },
    {
        id: "mailing",
        text: "Mailing",
        icon: "icon-mail",
        link: "/dashboard/customers/mailing"
    },
    {
        id: "receivables",
        text: "Receivables",
        icon: "icon-money",
        link: "/dashboard/customers/receivables"
    },
    {
        id: "watch",
        text: "Watchlist",
        icon: "icon-eye",
        link: "/dashboard/customers/watchlist"
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
        text: "Overview",
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
    performance: performanceView,
    operations: operationsView,
    customers: customersView,
    team: teamsView,
}

const DASHBOARD_VIEW_STORAGE_KEY = "dashboard-view"

function getStoredDashboardView(): DashboardView | null {
    if (typeof window === "undefined") return null

    const storedValue = window.sessionStorage.getItem(DASHBOARD_VIEW_STORAGE_KEY)

    if (storedValue === "performance" || storedValue === "operations" || storedValue === "customers" || storedValue === "team") {
        return storedValue
    }

    return null
}

function persistDashboardView(view: DashboardView) {
    if (typeof window === "undefined") return

    window.sessionStorage.setItem(DASHBOARD_VIEW_STORAGE_KEY, view)
}

export function getDashboardViewFromPath(pathname: string): DashboardView {
    if (pathname.startsWith("/dashboard/performance")) {
        persistDashboardView("performance")
        return "performance"
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
        return getStoredDashboardView() ?? "performance"
    }

    return getStoredDashboardView() ?? "performance"
}

export function getNavItemsForPath(pathname: string): navItems {
    return dashboardViewNavItems[getDashboardViewFromPath(pathname)]
}