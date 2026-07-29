"use client";

import { SupportTicket } from "@/src/types/types";
import Dropdown from "../ui/composites/dropdown";
import Frame from "../ui/primitives/frame";
import List from "../ui/composites/list";
import Paragraph from "../ui/primitives/paragraph";
import Section from "../layout/section";
import SupportItem from "./supportItem";

const supportTickets: SupportTicket[] = [
  {
    id: "sup-001",
    subject: "Payment reconciliation issue",
    business: "Business1",
    date: "Jul 27, 2026",
    message: "A client payment was recorded twice and needs to be reviewed before month-end reports.",
    priority: "high",
    status: "open",
  },
  {
    id: "sup-002",
    subject: "Invite a new team member",
    business: "Business2",
    date: "Jul 25, 2026",
    message: "The operations lead needs access to tasks, transactions, and journal notes.",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "sup-003",
    subject: "Export settings question",
    business: "Business3",
    date: "Jul 22, 2026",
    message: "Asked how to export transaction history for the last quarter.",
    priority: "low",
    status: "resolved",
  },
];

export default function SupportManager() {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Open", "In progress", "Resolved"];
  const priorities = ["All", "High", "Medium", "Low"];

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <Frame gap="sm" justify="flex-end" width="stretch" height="hug" className="pb-[var(--space-md)] border-b border-[var(--color-outline1)]">
        <Dropdown size="sm" name="Business" options={businesses} />
        <Dropdown size="sm" name="Status" options={statuses} />
        <Dropdown size="sm" name="Priority" options={priorities} />
      </Frame>
      <Frame width="stretch" height="stretch">
        {supportTickets.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            {supportTickets.map((ticket) => (
              <SupportItem key={ticket.id} ticket={ticket}/>
            ))}
          </List>
        ) : (
          <Frame width="stretch" height="stretch" justify="center" align="center">
            <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex">
              When support tickets are created, they appear here.
            </Paragraph>
          </Frame>
        )}
      </Frame>
    </Section>
  );
}
