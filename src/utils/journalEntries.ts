import { JournalEntry } from "../types/types";

export const journalEntries: JournalEntry[] = [
  {
    id: "jnl-001",
    title: "Weekly cash flow review",
    business: "Business1",
    date: "Jul 27, 2026",
    summary: "Reviewed payment delays, recurring expenses, and next week's expected receivables.",
    category: "Finance",
    status: "published",
  },
  {
    id: "jnl-002",
    title: "Supplier follow-up notes",
    business: "Business2",
    date: "Jul 24, 2026",
    summary: "Captured vendor pricing changes and pending delivery timelines for inventory planning.",
    category: "Operations",
    status: "draft",
  },
  {
    id: "jnl-003",
    title: "Customer feedback roundup",
    business: "Business3",
    date: "Jul 21, 2026",
    summary: "Logged common product questions from support conversations and sales calls.",
    category: "Customers",
    status: "published",
  },
];
