import { IconType } from "../components/ui/icon"

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
        link:"/dashboard/item2" /*change to real page link*/
    },
    {
        id: 2,
        text: "Transactions",
        icon: "icon-transactions",
        link: "/dashboard/item3"
    },
    {
        id: 3,
        text: "Tasks",
        icon: "icon-todo",
        link: "/dashboard/item4"
    },
    {
        id: 4,
        text: "Journal",
        icon: "icon-note",
        link: "/dashboard/item5"
    }
]