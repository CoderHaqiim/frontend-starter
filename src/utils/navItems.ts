import { IconType } from "../components/ui/primitives/icon"

type navItem = {
    id: number,
    text:string,
    icon :IconType
    link: string
}
type navItems = navItem[]

export const navItems: navItems = [
    {
        id: 0,
        text: "Dashboard",
        icon: "icon-dashboard",
        link: "/dashboard"
    },
    {
        id: 1,
        text: "Businesses", /*change to real page name*/
        icon: "icon-store",
        link:"/dashboard/businesses" /*change to real page link*/
    },
    {
        id: 2,
        text: "Transactions",
        icon: "icon-transactions",
        link: "/dashboard/transactions"
    },
    {
        id: 3,
        text: "Journal",
        icon: "icon-notes",
        link: "/dashboard/journal"
    },
    {
        id: 4,
        text: "Settings",
        icon: "icon-settings",
        link: "/dashboard/settings"
    }
]