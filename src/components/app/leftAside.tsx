"use client";

import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import ProfileButton from "./profileButton";
import NavLink from "../ui/primitives/navLink";
import Logo from "./brand/logo";
import { useUserState } from "@/src/store/userState";
import { usePathname } from "next/navigation";
import { useTheme } from "./themeProvider";
import { getNavItemsForPath } from "@/src/utils/navItems";

export default function LeftAside() {
  const { userState } = useUserState();
  const { colors } = useTheme();
  const pathname = usePathname();
  const navItems = getNavItemsForPath(pathname);

  return (
    <Aside
      width="260px"
      className="items-start justify-between"
      specificStyles={{
        backgroundColor: colors["background3"],
      }}
    >
      <Frame className="flex h-[70px] w-max">
        <Logo />
      </Frame>

      <Frame className="flex w-full flex-1 flex-col justify-between">
        <Frame className="flex h-max w-full flex-col">
          {navItems
            .filter((item) => item.id !== "settings" && item.id !== "support")
            .map((item) => (
              <NavLink
                key={item.id}
                href={item.link}
                size="md"
                iconName={item.icon}
                iconPosition="left"
              >
                {item.text}
              </NavLink>
            ))}

          <Frame className="my-[var(--space-md)] flex h-max w-full flex-col border-t border-t-[var(--color-outline2)] pt-[var(--space-md)]">
            {navItems
              .filter((item) => item.id === "settings" || item.id === "support")
              .map((item) => (
                <NavLink
                  key={item.id}
                  href={item.link}
                  size="md"
                  iconName={item.icon}
                  iconPosition="left"
                >
                  {item.text}
                </NavLink>
              ))}
          </Frame>
        </Frame>

        <Frame className="flex h-max w-full flex-col gap-[var(--space-md)]">
          <ProfileButton />
        </Frame>
      </Frame>
    </Aside>
  );
}