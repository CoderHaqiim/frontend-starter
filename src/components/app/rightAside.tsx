"use client";

import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import { colors } from "@/src/app/design/colors";
import TaskManagerCard from "./cards/taskManagerCard";
import SmallBusinessCardList from "./smallBusinessCardList";
import { usePathname } from "next/navigation";
import { FrameSizeType } from "@/src/types/types";
import { Children, CSSProperties, ReactNode } from "react";

type RightAsideProps = {
  specificStyles?: CSSProperties,
}

export default function RightAside({specificStyles  }: RightAsideProps) {
  const pathname = usePathname();

  const getAsideConfig = () => {
    switch (true) {
      case pathname.startsWith("/dashboard/businesses"):
        return {
          width: "220px",
          content: <SmallBusinessCardList />,
        };

      case pathname.startsWith("/dashboard"):
        return {
          width: "350px",
          content: <TaskManagerCard />,
        };

      default:
        return {
          width: "350px",
          content: <TaskManagerCard />,
        };
    }
  };

  const { width, content } = getAsideConfig();

  return (
    <Aside width={width} specificStyles={{borderLeft:`solid 1px ${colors["outline"]}`, ...specificStyles}}>
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