import { IconName } from "../components/ui/icon"

type navItem = {
    id: number,
    text:string,
    icon :IconName
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
        text: "Teachers",
        icon: "icon-badge-check",
        link:"/dashboard/teachers"
    },
    {
        id: 2,
        text: "Home",
        icon: "icon-eye",
        link: "/home"
    },
    {
        id: 3,
        text: "Home",
        icon: "icon-user-circle",
        link: "/home"
    },
    {
        id: 4,
        text: "Home",
        icon: "icon-badge-alert",
        link: "/home"
    }
]