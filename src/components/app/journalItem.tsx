import { JournalEntry } from "@/src/types/types";
import { ColorTypes } from "@/src/app/design/colors";
import Badge from "../ui/composites/badge";
import Button from "../ui/primitives/button";
import Frame from "../ui/primitives/frame";
import Paragraph from "../ui/primitives/paragraph";
import Tooltip from "../ui/composites/tooltip";

type JournalItemProps = {
  entry: JournalEntry;
}

export default function JournalItem({ entry }: JournalItemProps) {
  const statusColorMap: Record<JournalEntry["status"], ColorTypes> = {
    draft: "warning",
    published: "success",
    archived: "muted",
  };

  return (
    <Frame className="flex w-full flex-col gap-[var(--space-sm)] p-[var(--space-lg)]">
      <Frame className="flex-1 justify-between">
        <Frame className="flex flex-col gap-[var(--space-xs)]">
          <Paragraph color="textColor1" size="md" weight="medium">
            {entry.title}
          </Paragraph>

          <Paragraph size="sm">
            {entry.summary}
          </Paragraph>

          <Frame className="flex gap-[var(--space-xs)]">
            <Paragraph weight="light" size="xs">{entry.business}</Paragraph>
            <Paragraph weight="light" size="xs">-</Paragraph>
            <Paragraph weight="light" size="xs">{entry.date}</Paragraph>
          </Frame>
        </Frame>

        <Frame>
          <Tooltip content="journal menu">
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
        <Badge text={entry.category} color="info" size="xxs" />
        <Badge
          text={entry.status}
          color={statusColorMap[entry.status]}
          size="xxs"
        />
      </Frame>
    </Frame>
  );
}