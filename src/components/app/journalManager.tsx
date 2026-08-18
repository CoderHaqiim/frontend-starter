"use client";

import { journalEntries } from "@/src/utils/journalEntries";
import Dropdown from "../ui/composites/dropdown";
import Frame from "../ui/primitives/frame";
import JournalItem from "./journalItem";
import List from "../ui/composites/list";
import Paragraph from "../ui/primitives/paragraph";
import Section from "../layout/section";

export default function JournalManager() {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Published", "Draft", "Archived"];
  const categories = ["All", "Finance", "Operations", "Customers"];

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <Frame
        className="
          w-full h-max flex
          gap-[var(--space-sm)]
          justify-end
          pb-[var(--space-md)]
          border-b border-[var(--color-outline1)]
        "
      >
        <Dropdown size="sm" name="Business" options={businesses} />
        <Dropdown size="sm" name="Status" options={statuses} />
        <Dropdown size="sm" name="Category" options={categories} />
      </Frame>

      <Frame className="w-full h-full">
        {journalEntries.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            {journalEntries.map((entry) => (
              <JournalItem key={entry.id} entry={entry} />
            ))}
          </List>
        ) : (
          <Frame className="w-full h-full flex justify-center items-center">
            <Paragraph
              size="md"
              weight="light"
              className="text-center w-full h-[100px] flex"
            >
              When you create journal entries, they appear here.
            </Paragraph>
          </Frame>
        )}
      </Frame>
    </Section>
  );
}