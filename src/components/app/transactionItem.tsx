"use client"

import { Transaction } from "@/src/types/types";
import Frame from "../base/ui/primitives/frame";
import Icon from "../base/ui/primitives/icon";
import Paragraph from "../base/ui/primitives/paragraph";
import { useTheme } from "../providers/themeProvider";

type TransactionItemProps = {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { colors } = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full px-[var(--space-lg)] py-[var(--space-md)] flex-col gap-[var(--space-sm)]">
      <Frame className="justify-between flex-1">
        <Frame className="gap-[var(--space-md)] items-center">
          <Icon
            name={isIncome ? "icon-circle-arrow-up" : "icon-circle-arrow-down"}
            size="lg"
            fill={isIncome ? colors["success2"] : colors["error2"]}
            color={isIncome ? "success" : "error"}
          />

          <Frame className="flex-col">
            <Paragraph color="textColor1" size="xs">
              {transaction.description}
            </Paragraph>

            <Frame>
              <Paragraph weight="light" size="xxs">
                {transaction.category}
              </Paragraph>
            </Frame>
          </Frame>
        </Frame>

        <Frame className="gap-[var(--space-md)] items-center">
          <Frame className="flex-col items-end">
            <Paragraph
              weight="medium"
              color={isIncome ? "success" : "error"}
              size="xs"
            >
              {amount}
            </Paragraph>

            <Paragraph size="xxs">
              {transaction.date}
            </Paragraph>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
}