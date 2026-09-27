import { ColorTypes } from "@/src/app/design/colors";
import { shadow1 } from "@/src/app/design/shadows";
import { Task } from "@/src/types/types";
import { format } from "date-fns";
import { DragEvent } from "react";
import Badge from "../../base/ui/composites/badge";
import Popup from "../../base/ui/composites/popup";
import Button from "../../base/ui/primitives/button";
import Frame from "../../base/ui/primitives/frame";
import Heading from "../../base/ui/primitives/heading";
import Paragraph from "../../base/ui/primitives/paragraph";
import { useTheme } from "../../providers/themeProvider";

export default function TaskCard({task, onDelete}:{task: Task, onDelete?: (taskId: string) => void}) {
  const {colors} = useTheme()

  const priorityColor = {
    low:"success",
    medium: "warning",
    high: "error",
    urgent: "error"
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
          {onDelete ? (
            // The card menu opens to the left of the dots button, so the delete
            // action always takes a second click before the task is removed.
            <Popup
              gap={12}
              content={
                <Button
                  variant="ghost"
                  size="sm"
                  rounded="sm"
                  iconName="icon-delete"
                  iconColor="error"
                  justify="start"
                  className="w-full px-[var(--space-sm)] py-[var(--space-xs)] text-[13px]"
                  specificStyles={{
                    backgroundColor: "var(--color-error2)",
                    color: "var(--color-error)",
                  }}
                  func={() => onDelete(String(task.id))}
                >
                  Delete
                </Button>
              }
            >
              <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
            </Popup>
          ) : (
            <Button variant="ghost" size="xxs" iconName="icon-vertival-dots" isIcon />
          )}
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