"use client";

import { useParams } from "next/navigation";
import { journalEntries } from "@/src/utils/journalEntries";
import Badge from "@/src/components/ui/composites/badge";
import Button from "@/src/components/ui/primitives/button";
import Frame from "@/src/components/ui/primitives/frame";
import Heading from "@/src/components/ui/primitives/heading";
import Paragraph from "@/src/components/ui/primitives/paragraph";
import Section from "@/src/components/layout/section";
import Tooltip from "@/src/components/ui/composites/tooltip";
import { ColorTypes } from "@/src/app/design/colors";
import { JournalEntry } from "@/src/types/types";

export default function JournalNotePage() {
  const { journalId } = useParams();
  const entry = journalEntries.find((item) => item.id === journalId);

  const statusColorMap: Record<JournalEntry["status"], ColorTypes> = {
    draft: "warning",
    published: "success",
    archived: "muted",
  };

  if (!entry) {
    return (
      <Frame className="w-full h-full flex justify-center items-center">
        <Paragraph size="md" weight="light">
          Journal note not found.
        </Paragraph>
      </Frame>
    );
  }

  return (
    <Frame className="w-full h-max flex flex-col gap-[var(--space-lg)]">
      <Frame className="w-full h-max flex justify-between">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">
            {entry.title}
          </Heading>

          <Paragraph size="sm" weight="light">
            {entry.business} - {entry.date}
          </Paragraph>
        </Frame>

        <Frame className="flex gap-[var(--space-sm)]">
          <Button
            variant="fill"
            size="sm"
            iconPosition="left"
            iconName="icon-pencil"
          >
            Edit Note
          </Button>

          <Tooltip content="journal settings">
            <Button
              variant="outline"
              isIcon
              size="sm"
              iconName="icon-settings"
            />
          </Tooltip>
        </Frame>
      </Frame>

      <Section
        width="stretch"
        height="hug"
        className="min-h-[260px]"
      >
        <Frame className="w-full flex items-center justify-between pb-[var(--space-md)] border-b border-[var(--color-outline1)]">
          <Frame className="flex gap-[var(--space-sm)]">
            <Badge
              text={entry.category}
              color="info"
              size="xxs"
            />

            <Badge
              text={entry.status}
              color={statusColorMap[entry.status]}
              size="xxs"
            />
          </Frame>
        </Frame>

        <Frame className="w-full flex flex-col gap-[var(--space-md)]">
          <Paragraph color="textColor1" size="md">
            {entry.summary}
          </Paragraph>

          <Paragraph size="sm">
            This note captures the important operating context for the business. Use this space for follow-ups, decisions, and observations that should stay attached to the journal record.
          </Paragraph>
        </Frame>
      </Section>
    </Frame>
  );
}