"use client";

import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import TaskManagerCard from "./cards/taskManagerCard";
import SmallBusinessCardList from "./smallBusinessCardList";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import Scheduler from "./cards/schedularCard";
import JournalAsideList from "./journalAsideList";
import CustomersDirectory from "./customers/CustomersDirectory";
import GoalsCard from "./cards/goalsCard";
import OpenAside from "./openAside";
import { nullable } from "zod";

type RightAsideProps = {
  specificStyles?: CSSProperties,
}

export default function RightAside({specificStyles  }: RightAsideProps) {
  const pathname = usePathname();

  const getAsideConfig = () => {
    switch (true) {
      case pathname.startsWith("/dashboard/performance/businesses"):
        return {
          content: <SmallBusinessCardList />,
        };

      case pathname === "/dashboard/tasks":
        return {
          content: <Scheduler/>,
        };

      case pathname === "/dashboard/journal":
        return {
          content: <JournalAsideList />,
        };

      case pathname === "/dashboard/performance":
        return {
          content: <GoalsCard/>,
        };

      case pathname === "/dashboard/operations":
        return {
          content: <TaskManagerCard />,
        };

      case pathname === "/dashboard/customers":
        return {
          content: <CustomersDirectory />,
        };

      case pathname === "/dashboard/customers/directory":
        return null
        
      default:
        return {
          content: <OpenAside/>
        }
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
         ...specificStyles
      }}>
      <Frame
        width="hug"
        height="stretch"
        direction="column"
        gap="md"
      >
        {content}
      </Frame>
    </Aside>
  );
}
