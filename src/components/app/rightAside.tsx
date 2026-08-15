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

      case pathname === "/dashboard/customers/receivables":
      case pathname === "/dashboard/customers/directory":
      case pathname === "/dashboard/operations/transactions":
        return null

      case pathname === "/dashboard/customers/mailing":
        return {
          content: <MailGroupCard />,
        };

      case pathname === "/dashboard/operations/schedules":
        return {
          content: <Calendar/>,
        };

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
