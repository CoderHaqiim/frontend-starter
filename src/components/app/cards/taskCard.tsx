import { ColorTypes } from "@/src/app/design/colors";
import { shadow1 } from "@/src/app/design/shadows";
import { Task } from "@/src/types/types";
import { priorityColorMap } from "@/src/utils/priorityColorMap";
import { statusColorMap } from "@/src/utils/statusColorMap";
import { format } from "date-fns";
import { DragEvent } from "react";
import Badge from "../../base/ui/composites/badge";
import Popup from "../../base/ui/composites/popup";
import RowActionsMenu from "../../base/ui/composites/rowActionsMenu";
import Button from "../../base/ui/primitives/button";
import Frame from "../../base/ui/primitives/frame";
import Heading from "../../base/ui/primitives/heading";
import Paragraph from "../../base/ui/primitives/paragraph";

export default function TaskCard({task, onEdit, onDelete}:{task: Task, onEdit?: (taskId: string) => void, onDelete?: (taskId: string) => void}) {
  // The badges take the colours the shared maps give them, so a task reads the same
  // on the board as it does in the today card.
  const badgePriorityColor = priorityColorMap(task.priority) as ColorTypes
  const badgeStatusColor = statusColorMap(task.status) as ColorTypes

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
            <Badge color={badgeStatusColor} size="xxs" text={task.status}/>
          </Frame>
          {onEdit || onDelete ? (
            // The card menu is the same menu a transaction row carries: it opens to the
            // left of the dots button, and the edit and the delete only act on a
            // second click, so the task is never changed by opening the menu.
            <Popup
              gap={12}
              width="160px"
              closeOnContentClick
              content={
                <RowActionsMenu
                  onEdit={onEdit ? () => onEdit(String(task.id)) : undefined}
                  onDelete={onDelete ? () => onDelete(String(task.id)) : undefined}
                />
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