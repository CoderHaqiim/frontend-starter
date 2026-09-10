import { ColorTypes } from "@/src/app/design/colors";
import { shadow1 } from "@/src/app/design/shadows";
import { Task } from "@/src/types/types";
import { format } from "date-fns";
import { DragEvent } from "react";
import { useTheme } from "../../providers/themeProvider";
import Badge from "../../ui/composites/badge";
import Button from "../../ui/primitives/button";
import Frame from "../../ui/primitives/frame";
import Heading from "../../ui/primitives/heading";
import Paragraph from "../../ui/primitives/paragraph";

export default function TaskCard({task}:{task: Task}) {
  const {colors} = useTheme()

  const priorityColor = {
    low:"success",
    medium: "warning",
    high: "error"
  };

  const statusColor = {
    "completed":"success",
    "overdue": "error",
    "pending": "warning",
    "in-progress": "info",
  }

  const badgePriorityColor = priorityColor[task.priority] as ColorTypes
  const badgeStatusColor = statusColor[task.status] as ColorTypes

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("taskId", String(task.id));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div draggable onDragStart={handleDragStart} 
    className={`flex h-max max-h-[220px] min-h-[160px] shrink-0 w-[220px] cursor-grab flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--color-outline1)] bg-[var(--color-white)] p-4 transition hover:${shadow1} hover:border-[var(--color-outline2)] active:cursor-grabbing`}>
      <Frame className="flex-1 w-full h-full justify-between flex-col">
        <Frame className="w-full justify-between">
          <Frame className="gap-[var(--space-xs)]">
            <Badge color={badgePriorityColor} size="xxs" text={task.priority + " priority"}/>
          </Frame>
          <Button variant="ghost" size="xxs" iconName="icon-vertival-dots" isIcon />
        </Frame>
        <Frame className="flex flex-col">
          <Frame className="mb-[var(--space-sm)]">
            <Heading size="xs" type="h3" className="font-semiBold">{task.title}</Heading>
          </Frame>
          { 
            task.description && ( <Paragraph size="xs">{task.description}</Paragraph>)
          }
        </Frame>
        <Frame>
          <Badge color="accent" iconName="icon-clock" size="xxs" text={format(new Date(`${task.dueDate}T00:00:00`), "MMM d, yyyy")}/>
        </Frame>
      </Frame>
    </div>
  );
}