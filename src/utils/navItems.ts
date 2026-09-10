import { IconType } from "../components/ui/primitives/icon"

export type navItem = {
    id: string
    text: string
    icon: IconType
    link: string
}

export type navItems = navItem[]

export type DashboardView = "home" | "business"

export const HomeView: navItems = [
    {
        id: "home",
        text: "Home",
        icon: "icon-dashboard",
        link: "/dashboard"
    },
    {
        id: "businesses",
        text: "Businesses",
        icon: "icon-store",
        link: "/dashboard/businesses"
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

export function getBusinessView(businessId: string): navItems {
    return [
        {
            id: "bus-overview",
            text: "Overview",
            icon: "icon-dashboard",
            link: `/dashboard/businesses/${businessId}/overview`
        },
        {
            id: "transactions",
            text: "Transactions",
            icon: "icon-transactions",
            link: `/dashboard/businesses/${businessId}/transactions`
        },
        {
            id: "inventory",
            text: "Inventory",
            icon: "icon-pile",
            link: `/dashboard/businesses/${businessId}/inventory`
        },
        {
            id: "invoice",
            text: "Invoices",
            icon: "icon-invoice",
            link: `/dashboard/businesses/${businessId}/invoices`
        },
        {
            id: "receipts",
            text: "Receipts",
            icon: "icon-receipt",
            link: `/dashboard/businesses/${businessId}/receipts`
        },
        {
            id: "tasks",
            text: "Tasks",
            icon: "icon-double-check",
            link: `/dashboard/businesses/${businessId}/tasks`
        },
        {
            id: "customers",
            text: "Customers",
            icon: "icon-users-round",
            link: `/dashboard/businesses/${businessId}/customers`
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
}

const DASHBOARD_VIEW_STORAGE_KEY = "dashboard-view"

function getStoredDashboardView(): DashboardView | null {
    if (typeof window === "undefined") return null

    const storedValue = window.sessionStorage.getItem(
        DASHBOARD_VIEW_STORAGE_KEY
    )

    if (storedValue === "home" || storedValue === "business") {
        return storedValue
    }

    return null
}

function persistDashboardView(view: DashboardView) {
    if (typeof window === "undefined") return

    window.sessionStorage.setItem(
        DASHBOARD_VIEW_STORAGE_KEY,
        view
    )
}

export function getBusinessIdFromPath(pathname: string): string | null {
    const match = pathname.match(
        /^\/dashboard\/businesses\/([^/]+)/
    )

    return match?.[1] ?? null
}

export function getDashboardViewFromPath(
    pathname: string
): DashboardView {
    // A specific business:
    // /dashboard/businesses/:id
    // /dashboard/businesses/:id/tasks
    // /dashboard/businesses/:id/inventory
    if (pathname.startsWith("/dashboard/businesses/")) {
        persistDashboardView("business")
        return "business"
    }

    // Global dashboard pages
    if (pathname.startsWith("/dashboard")) {
        persistDashboardView("home")
        return "home"
    }

    return getStoredDashboardView() ?? "home"
}

export function getNavItemsForPath(
    pathname: string
): navItems {
    const view = getDashboardViewFromPath(pathname)

    if (view === "business") {
        const businessId = getBusinessIdFromPath(pathname)

        if (!businessId) {
            return HomeView
        }

        return getBusinessView(businessId)
    }

    return HomeView
}