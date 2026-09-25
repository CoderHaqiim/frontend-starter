"use client";

import { getNavItemsForPath } from "@/src/utils/navItems";
import { usePathname } from "next/navigation";
import Aside from "../base/layout/aside";
import Frame from "../base/ui/primitives/frame";
import NavLink from "../base/ui/primitives/navLink";
import { useTheme } from "../providers/themeProvider";
import Logo from "./brand/logo";
import ProfileButton from "./profileButton";

export default function LeftAside() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const navItems = getNavItemsForPath(pathname);

  if (pathname.startsWith("/dashboard/tasks")) {
    return null;
  }

  return (
    <Aside
      width="240px"
      className="items-start border-r border-r-[var(--color-outline1)] justify-between"
      specificStyles={{
        backgroundColor: colors["background1"],
      }}
    >
      <Frame className="flex h-[70px] w-max">
        <Logo />
      </Frame>

      <Frame className="flex w-full flex-1 flex-col">
        <Frame className="flex h-max w-full flex-col pb-[var(--space-md)]">
          {navItems
            .filter((item)=> item.id !== "settings" && item.id !== "support")
            .map((item) => (
              <NavLink
                key={item.id}
                href={item.link}
                size="sm"
                iconName={item.icon}
                iconPosition="left"
              >
                {item.text}
              </NavLink>
            ))}
        </Frame>
        <Frame className="flex h-max w-full flex-col border-t-[1px] border-t-[var(--color-outline1)] pt-[var(--space-md)] mb-[var(--space-lg)]">
          {navItems
            .filter((item)=> item.id == "settings" || item.id == "support")
            .map((item) => (
              <NavLink
                key={item.id}
                href={item.link}
                size="sm"
                iconName={item.icon}
                iconPosition="left"
              >
                {item.text}
              </NavLink>
            ))}
        </Frame>
      </Frame>
      <Frame className="flex w-full h-max flex-col gap-[var(--space-md)]">
        <ProfileButton/>
      </Frame>
    </Aside>
  );
}