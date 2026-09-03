"use client"

import { Transaction } from "@/src/types/types";
import { ColorTypes } from "@/src/app/design/colors";
import Badge from "../ui/composites/badge";
import Button from "../ui/primitives/button";
import Frame from "../ui/primitives/frame";
import Icon from "../ui/primitives/icon";
import Paragraph from "../ui/primitives/paragraph";
import Tooltip from "../ui/composites/tooltip";
import { useTheme } from "../providers/themeProvider";

type TransactionItemProps = {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { colors } = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full p-[var(--space-lg)] flex-col gap-[var(--space-sm)]">
      <Frame className="justify-between flex-1">
        <Frame className="gap-[var(--space-md)] items-center">
          <Icon
            name={isIncome ? "icon-circle-arrow-up" : "icon-circle-arrow-down"}
            size="lg"
            fill={isIncome ? colors["success2"] : colors["error2"]}
            color={isIncome ? "success" : "error"}
          />

          <Frame className="flex-col">
            <Paragraph color="textColor1" size="sm">
              {transaction.description}
            </Paragraph>

            <Frame>
              <Paragraph weight="light" size="xs">
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
              size="sm"
            >
              {amount}
            </Paragraph>

            <Paragraph size="xs">
              {transaction.date}
            </Paragraph>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
}