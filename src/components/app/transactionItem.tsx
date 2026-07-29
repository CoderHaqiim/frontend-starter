"use client"

import { Transaction } from "@/src/types/types";
import { ColorTypes } from "@/src/app/design/colors";
import Badge from "../ui/composites/badge";
import Button from "../ui/primitives/button";
import Frame from "../ui/primitives/frame";
import Icon from "../ui/primitives/icon";
import Paragraph from "../ui/primitives/paragraph";
import Tooltip from "../ui/composites/tooltip";
import { useTheme } from "./themeProvider";

type TransactionItemProps = {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const {colors} = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;
  const statusColorMap: Record<Transaction["status"], ColorTypes> = {
    completed: "success",
    pending: "warning",
    cancelled: "muted",
  };

  return (
    <Frame width="stretch" padding="lg" direction="column" gap="sm">
      <Frame justify="space-between" className="flex-1">
        <Frame gap="md" align="center">
          <Icon
            name={isIncome ? "icon-circle-arrow-up" : "icon-circle-arrow-down"}
            size="xxl"
            fill={isIncome ? colors["success2"] : colors["error2"]}
            color={isIncome ? "success" : "error"}
          />
          <Frame direction="column">
            <Paragraph color="textColor1" size="md">
              {transaction.description}
            </Paragraph>
            <Frame>
              <Paragraph weight="light" size="xs">{transaction.business}</Paragraph>
            </Frame>
          </Frame>
        </Frame>
        <Frame gap="md" align="center">
          <Frame direction="column" align="flex-end">
            <Paragraph weight="medium" color={isIncome ? "success" : "error"} size="md">
              {amount}
            </Paragraph>
            <Paragraph size="xs">{transaction.date}</Paragraph>
          </Frame>
          <Tooltip content="transaction menu">
            <Button variant="outline" size="sm" iconName="icon-vertival-dots" isIcon/>
          </Tooltip>
        </Frame>
      </Frame>
      <Frame gap="sm">
        <Badge text={transaction.category} color={isIncome ? "success" : "error"} size="xxs"/>
        <Badge text={transaction.status} color={statusColorMap[transaction.status]} size="xxs"/>
      </Frame>
    </Frame>
  );
}
