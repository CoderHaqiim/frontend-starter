"use client";
import Aside from "../layout/aside";
import LinkComponent from "../ui/primitives/navLink";
import { financialView } from "@/src/utils/navItems";
import Frame from "../ui/primitives/frame";
import { space } from "@/src/app/design/spacing";
// import { colorVariable } from "@/src/app/design/colors";
import Button from "../ui/primitives/button";
import { useUserState } from "@/src/store/userState";
import {bodySize} from "@/src/app/design/typograhy";
import Avatar from "../ui/composites/avatar";
import SubscriptionCard from "./cards/subscriptionCard";
import ProfileButton from "./profileButton";
import NavLink from "../ui/primitives/navLink";
import Logo from "./brand/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./themeProvider";
import { getNavItemsForPath } from "@/src/utils/navItems";

export default function LeftAside() {
    const {userState} = useUserState();
    const {colors} = useTheme()
    const pathname = usePathname()
    const navItems = getNavItemsForPath(pathname)

  return (
    <Aside width="260px" className="justify-between items-start" specificStyles={{
            backgroundColor: colors["background3"],
        }}>
        <Frame height="70px" width="hug">
            <Logo/>
        </Frame>
        <Frame width="stretch" justify="space-between" className="flex-1" direction="column">
            <Frame width="stretch" height="hug" direction="column">
                {
                    navItems.map(item =>
                        <NavLink key={item.id} href={item.link} size="md" iconName={item.icon} iconPosition="left">
                            {item.text}
                        </NavLink>
                    )
                }
            </Frame>
            <Frame width="stretch" height="hug" direction="column" specificStyles={{ gap: space["md"]}}>
                {/* <SubscriptionCard/> */}
                <ProfileButton/>
            </Frame>
        </Frame>
    </Aside>
  )
}
