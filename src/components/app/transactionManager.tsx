"use client";

import { Transaction } from "@/src/types/types";
import Dropdown from "../ui/composites/dropdown";
import Frame from "../ui/primitives/frame";
import List from "../ui/composites/list";
import Paragraph from "../ui/primitives/paragraph";
import Section from "../layout/section";
import TransactionItem from "./transactionItem";

const transactions: Transaction[] = [
  {
    id: "trn-001",
    description: "Client invoice payment",
    business: "Business1",
    date: "Jul 27, 2026",
    amount: 4000,
    type: "income",
    category: "Sales",
    status: "completed",
  },
  {
    id: "trn-002",
    description: "Office internet subscription",
    business: "Business2",
    date: "Jul 25, 2026",
    amount: 180,
    type: "expense",
    category: "Utilities",
    status: "completed",
  },
  {
    id: "trn-003",
    description: "Supplier deposit",
    business: "Business1",
    date: "Jul 23, 2026",
    amount: 1250,
    type: "expense",
    category: "Inventory",
    status: "pending",
  },
  {
    id: "trn-004",
    description: "Consulting retainer",
    business: "Business3",
    date: "Jul 20, 2026",
    amount: 2200,
    type: "income",
    category: "Services",
    status: "completed",
  },
];

export default function TransactionManager() {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Completed", "Pending", "Cancelled"];
  const types = ["All", "Income", "Expense"];

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <Frame gap="sm" justify="flex-end" width="stretch" height="hug" className="pb-[var(--space-md)] border-b border-[var(--color-outline1)]">
        <Dropdown size="sm" name="Business" options={businesses} />
        <Dropdown size="sm" name="Status" options={statuses} />
        <Dropdown size="sm" name="Type" options={types} />
      </Frame>
      <Frame width="stretch" height="stretch">
        {transactions.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction}/>
            ))}
          </List>
        ) : (
          <Frame width="stretch" height="stretch" justify="center" align="center">
            <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex">
              When you create transactions, they appear here.
            </Paragraph>
          </Frame>
        )}
      </Frame>
    </Section>
  );
}
