"use client";
import Aside from "../layout/aside";
import LinkComponent from "../ui/primitives/navLink";
import { operationsView } from "@/src/utils/navItems";
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
                    navItems
                        .filter(item => item.id !== "settings" && item.id !== "support")
                        .map(item =>
                            <NavLink key={item.id} href={item.link} size="md" iconName={item.icon} iconPosition="left">
                                {item.text}
                            </NavLink>
                        )
                }
                <Frame direction="column" width="stretch" height="hug" className="my-[var(--space-md)] border-t-[1px] border-t-[var(--color-outline2)] pt-[var(--space-md)]">
                    {
                        navItems
                            .filter(item => item.id === "settings" || item.id === "support")
                            .map(item =>
                                <NavLink key={item.id} href={item.link} size="md" iconName={item.icon} iconPosition="left">
                                    {item.text}
                                </NavLink>
                        )
                    }
                </Frame>
            </Frame>
            <Frame width="stretch" height="hug" gap="md" direction="column">
                <ProfileButton/>
            </Frame>
        </Frame>
    </Aside>
  )
}
