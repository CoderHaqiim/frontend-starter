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
      <Frame width="stretch" height="stretch" justify="center" align="center">
        <Paragraph size="md" weight="light">Journal note not found.</Paragraph>
      </Frame>
    );
  }

  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">{entry.title}</Heading>
          <Paragraph size="sm" weight="light">{entry.business} - {entry.date}</Paragraph>
        </Frame>
        <Frame gap="sm">
          <Button variant="fill" size="sm" iconPosition="left" iconName="icon-pencil">Edit Note</Button>
          <Tooltip content="journal settings">
            <Button variant="outline" isIcon size="sm" iconName="icon-settings"/>
          </Tooltip>
        </Frame>
      </Frame>

      <Section width="stretch" height="hug" className="min-h-[260px]">
        <Frame width="stretch" justify="space-between" align="center" className="pb-[var(--space-md)] border-b border-[var(--color-outline1)]">
          <Frame gap="sm">
            <Badge text={entry.category} color="info" size="xxs"/>
            <Badge text={entry.status} color={statusColorMap[entry.status]} size="xxs"/>
          </Frame>
        </Frame>
        <Frame width="stretch" direction="column" gap="md">
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
