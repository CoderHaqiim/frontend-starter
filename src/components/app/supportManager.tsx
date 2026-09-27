"use client";

import { SupportTicket } from "@/src/types/types";
import Section from "../base/layout/section";
import Dropdown from "../base/ui/composites/dropdown";
import EmptyState from "../base/ui/composites/emptyState";
import List from "../base/ui/composites/list";
import Frame from "../base/ui/primitives/frame";
import SupportItem from "./supportItem";

const supportTickets: SupportTicket[] = [
  {
    id: "sup-001",
    subject: "Payment reconciliation issue",
    business: "Business1",
    date: "Jul 27, 2026",
    message:
      "A client payment was recorded twice and needs to be reviewed before month-end reports.",
    priority: "high",
    status: "open",
  },
  {
    id: "sup-002",
    subject: "Invite a new team member",
    business: "Business2",
    date: "Jul 25, 2026",
    message:
      "The operations lead needs access to tasks, transactions, and journal notes.",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "sup-003",
    subject: "Export settings question",
    business: "Business3",
    date: "Jul 22, 2026",
    message:
      "Asked how to export transaction history for the last quarter.",
    priority: "low",
    status: "resolved",
  },
];

export default function SupportManager() {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Open", "In progress", "Resolved"];
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <Section
      height="hug"
      className="min-h-[200px]"
    >
      <Frame
        className="
          flex
          w-full
          h-max
          justify-end
          gap-[var(--space-sm)]
          pb-[var(--space-md)]
          border-b
          border-[var(--color-outline1)]
        "
      >
        <Dropdown
          size="sm"
          name="Business"
          options={businesses}
        />
        <Dropdown
          size="sm"
          name="Status"
          options={statuses}
        />
        <Dropdown
          size="sm"
          name="Priority"
          options={priorities}
        />
      </Frame>

      <Frame className="flex w-full h-full">
        {supportTickets.length > 0 ? (
          <List
            width="stretch"
            height="stretch"
            scroll="hidden"
          >
            {supportTickets.map((ticket) => (
              <SupportItem
                key={ticket.id}
                ticket={ticket}
              />
            ))}
          </List>
        ) : (
          <EmptyState message="When support tickets are created, they appear here." />
        )}
      </Frame>
    </Section>
  );
}