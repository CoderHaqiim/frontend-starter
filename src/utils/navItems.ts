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
    }
]