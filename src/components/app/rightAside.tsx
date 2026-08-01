"use client";

import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import TaskManagerCard from "./cards/taskManagerCard";
import SmallBusinessCardList from "./smallBusinessCardList";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import Scheduler from "./cards/schedularCard";
import JournalAsideList from "./journalAsideList";
import { useTheme } from "./themeProvider";

type RightAsideProps = {
  specificStyles?: CSSProperties,
}

export default function RightAside({specificStyles  }: RightAsideProps) {
  const pathname = usePathname();
  const {colors} = useTheme()

  const getAsideConfig = () => {
    switch (true) {
      case pathname.startsWith("/dashboard/businesses"):
        return {
          width: "250px",
          content: <SmallBusinessCardList />,
        };

      case pathname.startsWith("/dashboard/tasks"):
        return {
          width: "390px",
          content: <Scheduler/>,
        };

      case pathname.startsWith("/dashboard/journal"):
        return {
          width: "320px",
          content: <JournalAsideList />,
        };

      case pathname.startsWith("/dashboard/transactions"):
        return null;

      case pathname.startsWith("/dashboard"):
        return {
          width: "380px",
          content: <TaskManagerCard />,
        };

      default:
        return {
          width: "380px",
          content: <TaskManagerCard />,
        };
    }
  };

  const asideConfig = getAsideConfig();

  if (!asideConfig) {
    return null;
  }

  const { width, content } = asideConfig;

  return (
    <Aside 
      width={width} 
      specificStyles={{
         ...specificStyles
      }}>
      <Frame
        width="stretch"
        height="stretch"
        direction="column"
        gap="md"
      >
        {content}
      </Frame>
    </Aside>
  );
}
