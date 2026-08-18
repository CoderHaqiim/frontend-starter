import { SupportTicket } from "@/src/types/types";
import { ColorTypes } from "@/src/app/design/colors";
import { priorityColorMap } from "@/src/utils/priorityColorMap";
import Badge from "../ui/composites/badge";
import Button from "../ui/primitives/button";
import Frame from "../ui/primitives/frame";
import Paragraph from "../ui/primitives/paragraph";
import Tooltip from "../ui/composites/tooltip";

type SupportItemProps = {
  ticket: SupportTicket;
}

export default function SupportItem({ ticket }: SupportItemProps) {
  const priorityColor = priorityColorMap(ticket.priority) as ColorTypes;
  const statusColorMap: Record<SupportTicket["status"], ColorTypes> = {
    open: "warning",
    "in-progress": "info",
    resolved: "success",
  };

  return (
    <Frame className="flex w-full flex-col gap-[var(--space-sm)] p-[var(--space-lg)]">
      <Frame className="flex-1 justify-between">
        <Frame className="flex flex-col gap-[var(--space-xs)]">
          <Paragraph color="textColor1" size="md" weight="medium">
            {ticket.subject}
          </Paragraph>

          <Paragraph size="sm">
            {ticket.message}
          </Paragraph>

          <Frame className="flex gap-[var(--space-xs)]">
            <Paragraph weight="light" size="xs">
              {ticket.business}
            </Paragraph>
            <Paragraph weight="light" size="xs">
              -
            </Paragraph>
            <Paragraph weight="light" size="xs">
              {ticket.date}
            </Paragraph>
          </Frame>
        </Frame>

        <Frame className="flex gap-[var(--space-sm)]">
          <Tooltip content="open ticket">
            <Button
              variant="outline"
              size="sm"
              iconName="icon-open"
              isIcon
            />
          </Tooltip>

          <Tooltip content="ticket menu">
            <Button
              variant="outline"
              size="sm"
              iconName="icon-vertival-dots"
              isIcon
            />
          </Tooltip>
        </Frame>
      </Frame>

      <Frame className="flex gap-[var(--space-sm)]">
        <Badge
          text={ticket.priority}
          color={priorityColor}
          size="xxs"
        />
        <Badge
          text={ticket.status}
          color={statusColorMap[ticket.status]}
          size="xxs"
        />
      </Frame>
    </Frame>
  );
}