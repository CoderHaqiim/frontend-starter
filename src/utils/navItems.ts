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
        text: "Item-1",
        icon: "icon-dashboard",
        link: "/dashboard"
    },
    {
        id: 1,
        text: "Item-2", /*change to real page name*/
        icon: "icon-badge-check",
        link:"/dashboard/item2" /*change to real page link*/
    },
    {
        id: 2,
        text: "Item3",
        icon: "icon-eye",
        link: "/dashboard/item3"
    },
    {
        id: 3,
        text: "Item-4",
        icon: "icon-user-circle",
        link: "/dashboard/item4"
    },
    {
        id: 4,
        text: "Item-5",
        icon: "icon-badge-alert",
        link: "/dashboard/item5"
    }
]