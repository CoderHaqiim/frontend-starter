"use client";

import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import Calendar from "./cards/calendar";
import QuickActions from "./cards/quickActions";
import TaskManagerCard from "./cards/taskManagerCard";

type RightAsideProps = {
  specificStyles?: CSSProperties,
}

export default function RightAside({specificStyles  }: RightAsideProps) {
  const pathname = usePathname();

  const getAsideConfig = () => {
    switch (true) {
      case pathname === "/dashboard":
        return {
          content: (
            <Frame className="w-max h-full flex-col gap-[var(--space-md)]">
              <QuickActions />
              <Calendar />
            </Frame>
          ),
        };

      case pathname.startsWith("/dashboard/businesses/") && pathname.endsWith("/overview"):
        return {
          content: (
            <Frame className="w-max h-full flex-col gap-[var(--space-md)]">
              <TaskManagerCard />
            </Frame>
          ),
        };

      default:
        return null
    }
  };

  const asideConfig = getAsideConfig();

  if (!asideConfig) {
    return null;
  }

  const { content } = asideConfig;

  return (
    <Aside 
      width="hug"
      specificStyles={{
         ...specificStyles,
        paddingLeft: 0,
        //  backgroundColor: colors["background2"]
      }}>
      <Frame className="w-max h-full h-full flex-col gap-var(--space-md)">
        {content}
      </Frame>
    </Aside>
  );
}
