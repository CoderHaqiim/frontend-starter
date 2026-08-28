"use client";

import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import TaskManagerCard from "./cards/taskManagerCard";
import SmallBusinessCardList from "./smallBusinessCardList";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import Calendar from "./cards/calendar";
import JournalAsideList from "./journalAsideList";
import CustomersDirectory from "./customers/CustomersDirectory";
import GoalsCard from "./cards/goalsCard";
import OpenAside from "./openAside";
import MailGroupCard from "./cards/mailGroupCard";
import { useTheme } from "../providers/themeProvider";

type RightAsideProps = {
  specificStyles?: CSSProperties,
}

export default function RightAside({specificStyles  }: RightAsideProps) {
  const pathname = usePathname();
  const {colors} = useTheme()

  const getAsideConfig = () => {
    switch (true) {
      case pathname === "/dashboard":
        return {
          content: <TaskManagerCard/>,
        };

      case pathname.startsWith("/dashboard/businesses"):
        return {
          content: <SmallBusinessCardList/>,
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
        //  backgroundColor: colors["background2"]
      }}>
      <Frame className="w-max h-full h-full flex-col gap-var(--space-md)">
        {content}
      </Frame>
    </Aside>
  );
}
