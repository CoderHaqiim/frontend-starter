import { IconType } from "../components/ui/primitives/icon"

type navItem = {
    id: string,
    text:string,
    icon :IconType
    link: string
}
type navItems = navItem[]

export const navItems: navItems = [
    {
        id: "dashboard",
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard"
    },
    {
        id: "businesses",
        text: "Businesses", /*change to real page name*/
        icon: "icon-store",
        link:"/dashboard/businesses" /*change to real page link*/
    },
    {
        id: "transactions",
        text: "Transactions",
        icon: "icon-transactions",
        link: "/dashboard/transactions"
    },
    {
        id: "tasks",
        text: "Tasks & Schedules",
        icon: "icon-calendar-check",
        link: "/dashboard/tasks"
    },
    {
        id: "journal",
        text: "Journal",
        icon: "icon-notes",
        link: "/dashboard/journal"
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