import { IconName } from "../components/ui/icon"

type navItem = {
    id: number,
    text:string,
    icon :IconName
}
type navItems = navItem[]
export const navItems: navItems = [
    {
        id: 0,
        text: "Home",
        icon: "icon-house"
    },
    {
        id: 1,
        text: "Home",
        icon: "icon-badge-check"
    },
    {
        id: 2,
        text: "Home",
        icon: "icon-eye"
    },
    {
        id: 3,
        text: "Home",
        icon: "icon-user-circle"
    },
    {
        id: 4,
        text: "Home",
        icon: "icon-badge-alert"
    },
    {
        id: 5,
        text: "Home",
        icon: "icon-user-circle"
    }
]