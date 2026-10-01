"use client";

import { Transaction } from "@/src/types/types";
import { useState } from "react";
import Section from "../base/layout/section";
import Dropdown from "../base/ui/composites/dropdown";
import EmptyState from "../base/ui/composites/emptyState";
import List from "../base/ui/composites/list";
import Button from "../base/ui/primitives/button";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";
import TransactionHeader from "./transactionHeader";
import TransactionLine from "./transactionLine";

type TransactionManagerProps = {
  transactions: Transaction[]
  currentPage?: number
  // The pages the list really holds, worked out from the total count rather
  // than fixed, so every transaction stays reachable.
  totalPages?: number
  onPageChange?: (page: number) => void
  onChangeStatus?: (transactionId: string, status: Transaction["status"]) => void
  onChangeType?: (transactionId: string, type: Transaction["type"]) => void
}

export default function TransactionManager({
  transactions = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onChangeStatus,
  onChangeType,
}: Partial<TransactionManagerProps>) {
  const businesses = ["All Businesses", "Business1", "Business2", "Business3"];
  const statuses = ["All", "Completed", "Pending", "Cancelled"];
  const types = ["All transactions", "Income", "Expense"];
  const statusOptions = ["All", "Pending", "Completed", "Cancelled"];
  const dateSortOptions = ["Newest to oldest", "Oldest to newest"];
  const amountSortOptions = ["Highest to lowest", "Lowest to highest"];
  const categorySortOptions = ["A-Z", "Z-A"];
  // The filter control carries the type, status and category filters at once, so
  // every option is marked with the field it belongs to. The marked value is what
  // the handlers read back, while the label is what the dropdown shows.
  const typeFilterMark = "type:";
  const statusFilterMark = "status:";
  const categoryFilterMark = "category:";
  const [selectedType, setSelectedType] = useState("All transactions")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDateSort, setSelectedDateSort] = useState("Newest to oldest")
  const [selectedAmountSort, setSelectedAmountSort] = useState("Highest to lowest")
  const [selectedCategorySort, setSelectedCategorySort] = useState("A-Z")
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date")

  // The date, amount and category sorts share one control, so the sort the user
  // picks decides both the field that is sorted and the direction it is sorted in.
  const sortOptions = [...dateSortOptions, ...amountSortOptions, ...categorySortOptions]
  const selectedSort = sortBy === "amount"
    ? selectedAmountSort
    : sortBy === "category"
      ? selectedCategorySort
      : selectedDateSort

  const sortTransactions = (sort: string) => {
    if (amountSortOptions.includes(sort)) {
      setSelectedAmountSort(sort)
      setSortBy("amount")
      return
    }

    if (categorySortOptions.includes(sort)) {
      setSelectedCategorySort(sort)
      setSortBy("category")
      return
    }

    setSelectedDateSort(sort)
    setSortBy("date")
  }

  // The categories the listed transactions already use are the ones the filter
  // offers, so its menu only holds categories this business records.
  const transactionCategories = Array.from(
    new Set(transactions.map((transaction) => transaction.category))
  ).sort((first, second) => first.localeCompare(second))
  const filterOptions = [
    ...types.map((type) => ({
      // "All transactions" is the value the type filter checks for, so the option
      // keeps it and shows the shorter "Type: All" label.
      label: `Type: ${type === "All transactions" ? "All" : type}`,
      value: `${typeFilterMark}${type}`,
    })),
    ...statusOptions.map((status) => ({
      label: `Status: ${status}`,
      value: `${statusFilterMark}${status}`,
    })),
    ...["All", ...transactionCategories].map((category) => ({
      label: `Category: ${category}`,
      value: `${categoryFilterMark}${category}`,
    })),
  ]
  // One control holds three filters, so its button shows the filter the user is
  // most specific about: an active category first, then the status, then the type.
  const selectedFilter = selectedCategory !== "All"
    ? `${categoryFilterMark}${selectedCategory}`
    : selectedStatus !== "All"
      ? `${statusFilterMark}${selectedStatus}`
      : `${typeFilterMark}${selectedType}`

  const filterTransactions = (filter: string) => {
    if (filter.startsWith(typeFilterMark)) {
      setSelectedType(filter.slice(typeFilterMark.length))
      return
    }

    if (filter.startsWith(statusFilterMark)) {
      setSelectedStatus(filter.slice(statusFilterMark.length))
      return
    }

    setSelectedCategory(filter.slice(categoryFilterMark.length))
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = selectedType === "All transactions"
      || transaction.type === selectedType.toLowerCase()
    const matchesStatus = selectedStatus === "All"
      || transaction.status === selectedStatus.toLowerCase()
    const matchesCategory = selectedCategory === "All"
      || transaction.category === selectedCategory

    return matchesType && matchesStatus && matchesCategory
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

  console.log(transactions)

  // The page buttons follow the pages the list really holds: the first, the last
  // and the ones around the page being viewed, with a gap marker between the
  // groups, so a long list does not fill the row with buttons.
  const visiblePages = (() => {
    const candidates = [1, totalPages, currentPage - 1, currentPage, currentPage + 1]
    const pages = Array.from(
      new Set(candidates.filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages))
    ).sort((first, second) => first - second)

    return pages.reduce<(number | "gap")[]>((visible, pageNumber, index) => {
      if (index > 0 && pageNumber - pages[index - 1] > 1) visible.push("gap")
      visible.push(pageNumber)
      return visible
    }, [])
  })()

  return (
    <Section height="hug" className="min-h-[200px]">
      <Frame className="w-full h-max justify-end gap-[var(--space-sm)]">
        <Frame className="gap-[var(--space-sm)]">
         <Dropdown
           width="max-content"
           size="xs"
           name="Sort"
           prefix="Sort:"
           menuAlign="right"
           options={sortOptions}
           value={selectedSort}
           formFunc={(event) => sortTransactions(event.target.value)}
         />
         <Dropdown
           width="max-content"
           size="xs"
           name="Filter"
           menuAlign="right"
           options={filterOptions}
           value={selectedFilter}
           formFunc={(event) => filterTransactions(event.target.value)}
         />
         
        </Frame>
      </Frame>
      <Frame className="w-full h-full">
        {filteredTransactions.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            <TransactionHeader/>
            {sortedTransactions.map((transaction) => (
              <TransactionLine
                key={transaction.id}
                transaction={transaction}
                onChangeStatus={onChangeStatus ?? (() => undefined)}
                onChangeType={onChangeType ?? (() => undefined)}
              />
            ))}
          </List>
        ) : (
          <EmptyState message="When you create transactions, they appear here." />
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
        {visiblePages.map((pageNumber, index) =>
          pageNumber === "gap" ? (
            <Frame key={`page-gap-${index}`} className="w-[30px] justify-center items-center">
              <Paragraph size="sm" color="textColor2">…</Paragraph>
            </Frame>
          ) : (
            <Button
              key={pageNumber}
              variant="outline"
              size="sm"
              specificStyles={{
                width: "30px",
                borderRadius: `var(--radius-xs)`,
                height: "30px",
                border: pageNumber === currentPage
                  ? "1px solid var(--color-accent)"
                  : undefined,
              }}
              func={() => onPageChange?.(pageNumber)}
            >
              {String(pageNumber)}
            </Button>
          )
        )}
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
            if (currentPage < totalPages) onPageChange?.(currentPage + 1)
          }}
        />
      </Frame>
    </Section>
  );
}
