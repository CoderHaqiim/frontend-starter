"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { journalEntries } from "@/src/utils/journalEntries";
import Frame from "../ui/primitives/frame";
import Paragraph from "../ui/primitives/paragraph";

export default function JournalAsideList() {
  const { journalId } = useParams();

  return (
    <Frame width="stretch" height="stretch" scroll="hidden" direction="column" className="pt-[var(--space-md)]">
      {journalEntries.map((entry) => {
        const isSelected = journalId === entry.id;

        return (
          <Link
            key={entry.id}
            href={`/dashboard/journal/${entry.id}`}
            className={`block w-full border-b border-[var(--color-outline1)] px-[var(--space-md)] py-[var(--space-md)] ${
              isSelected ? "bg-[var(--color-background3)]" : "hover:bg-[var(--color-background1)]"
            }`}
          >
            <Frame direction="column" gap="xs">
              <Paragraph color="textColor1" size="sm" weight="medium">
                {entry.title}
              </Paragraph>
              <Frame justify="space-between" gap="sm">
                <Paragraph size="xs" weight="light">{entry.business}</Paragraph>
                <Paragraph size="xs" weight="light">{entry.date}</Paragraph>
              </Frame>
            </Frame>
          </Link>
        );
      })}
    </Frame>
  );
}
