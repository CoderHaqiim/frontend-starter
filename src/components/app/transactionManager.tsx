"use client";

import { Transaction } from "@/src/types/types";
import { useState } from "react";
import Section from "../base/layout/section";
import Dropdown from "../base/ui/composites/dropdown";
import List from "../base/ui/composites/list";
import Button from "../base/ui/primitives/button";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";
import TransactionHeader from "./transactionHeader";
import TransactionLine from "./transactionLine";

type TransactionManagerProps = {
  transactions: Transaction[]
  currentPage?: number
  onPageChange?: (page: number) => void
}

export default function TransactionManager({
  transactions = [],
  currentPage = 1,
  onPageChange,
}: Partial<TransactionManagerProps>) {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Completed", "Pending", "Cancelled"];
  const types = ["All transactions", "Income", "Expense"];
  const statusOptions = ["All", "Completed", "Cancelled", "Pending"];
  const dateSortOptions = ["Newest to oldest", "Oldest to newest"];
  const amountSortOptions = ["Highest to lowest", "Lowest to highest"];
  const categorySortOptions = ["A-Z", "Z-A"];
  const [selectedType, setSelectedType] = useState("All transactions")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedDateSort, setSelectedDateSort] = useState("Newest to oldest")
  const [selectedAmountSort, setSelectedAmountSort] = useState("Highest to lowest")
  const [selectedCategorySort, setSelectedCategorySort] = useState("A-Z")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = selectedType === "All transactions"
      || transaction.type === selectedType.toLowerCase()
    const matchesStatus = selectedStatus === "All"
      || transaction.status === selectedStatus.toLowerCase()

    return matchesType && matchesStatus
  })
  const sortedTransactions = [...filteredTransactions].sort((first, second) => {
    if (sortBy === "amount") {
      return selectedAmountSort === "Lowest to highest"
        ? first.amount - second.amount
        : second.amount - first.amount
    }

    if (sortBy === "category") {
      return selectedCategorySort === "Z-A"
        ? second.category.localeCompare(first.category)
        : first.category.localeCompare(second.category)
    }

    return selectedDateSort === "Oldest to newest"
      ? new Date(first.date).getTime() - new Date(second.date).getTime()
      : new Date(second.date).getTime() - new Date(first.date).getTime()
  })

  return (
    <Section height="hug" className="min-h-[200px]">
      <Frame className="w-full h-max justify-end gap-[var(--space-sm)] pb-[var(--space-md)]">
        <Frame className="gap-[var(--space-sm)]">
         <Dropdown
           width="max-content"
           size="sm"
           name="Date"
           options={dateSortOptions}
           value={selectedDateSort}
           formFunc={(event) => {
             setSelectedDateSort(event.target.value)
             setSortBy("date")
           }}
         />
         <Dropdown
           width="max-content"
           size="sm"
           name="Amount"
           options={amountSortOptions}
           value={selectedAmountSort}
           formFunc={(event) => {
             setSelectedAmountSort(event.target.value)
             setSortBy("amount")
           }}
         />
         <Dropdown
           width="max-content"
           size="sm"
           name="Type"
           options={types}
           value={selectedType}
           formFunc={(event) => setSelectedType(event.target.value)}
         />
         <Dropdown
           width="max-content"
           size="sm"
           name="Status"
           options={statusOptions}
           value={selectedStatus}
           formFunc={(event) => setSelectedStatus(event.target.value)}
         />
         <Dropdown
           width="max-content"
           size="sm"
           name="Category"
           options={categorySortOptions}
           value={selectedCategorySort}
           formFunc={(event) => {
             setSelectedCategorySort(event.target.value)
             setSortBy("category")
           }}
         />
        </Frame>
      </Frame>
      <Frame className="w-full h-full">
        {filteredTransactions.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            <TransactionHeader/>
            {sortedTransactions.map((transaction) => (
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
      <Frame className="w-full gap-[var(--space-sm)] pt-[var(--space-md)]">
        <Button
          variant="outline"
          size="sm"
          isIcon
          iconName="icon-left"
          specificStyles={{
            width: "30px",
            borderRadius: `var(--radius-xs)`,
            height: "30px",
          }}
          func={() => {
            if (currentPage > 1) onPageChange?.(currentPage - 1)
          }}
        />
        {[1, 2].map((page) => (
          <Button
            key={page}
            variant="outline"
            size="sm"
            specificStyles={{
              width: "30px",
              borderRadius: `var(--radius-xs)`,
              height: "30px",
              border: page === currentPage
                ? "1px solid var(--color-accent)"
                : undefined,
            }}
            func={() => onPageChange?.(page)}
          >
            {String(page)}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          isIcon
          iconName="icon-right"
          specificStyles={{
            width: "30px",
            borderRadius: `var(--radius-xs)`,
            height: "30px",
          }}
          func={() => {
            if (currentPage < 2) onPageChange?.(currentPage + 1)
          }}
        />
      </Frame>
    </Section>
  );
}
