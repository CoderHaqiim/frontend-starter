"use client";

import { Transaction } from "@/src/types/types";
import Dropdown from "../ui/composites/dropdown";
import Frame from "../ui/primitives/frame";
import List from "../ui/composites/list";
import Paragraph from "../ui/primitives/paragraph";
import Section from "../layout/section";
import TransactionItem from "./transactionItem";
import TransactionLine from "./transactionLine";

type TransactionManagerProps = {
  transactions: Transaction[]
}

export default function TransactionManager({ transactions = [] }: Partial<TransactionManagerProps>) {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Completed", "Pending", "Cancelled"];
  const types = ["All", "Income", "Expense"];

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <Frame className="w-full h-max justify-end gap-[var(--space-sm)] pb-[var(--space-md)]">
        <Dropdown size="sm" name="Business" options={businesses} />
        <Dropdown size="sm" name="Status" options={statuses} />
        <Dropdown size="sm" name="Type" options={types} />
      </Frame>
      <Frame className="w-full h-full">
        {transactions.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            {transactions.map((transaction) => (
              <TransactionLine key={transaction.id} transaction={transaction}/>
            ))}
          </List>
        ) : (
          <Frame className="w-full h-full jusityf-center items-center ">
            <Paragraph size="md" weight="light" className="text-center w-full h-[100px] flex">
              When you create transactions, they appear here.
            </Paragraph>
          </Frame>
        )}
      </Frame>
    </Section>
  );
}
