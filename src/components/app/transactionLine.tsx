"use client"

import { Transaction } from "@/src/types/types";
import Frame from "../ui/primitives/frame";
import Icon from "../ui/primitives/icon";
import Paragraph from "../ui/primitives/paragraph";
import { useTheme } from "../providers/themeProvider";

type TransactionItemProps = {
  transaction: Transaction;
}

export default function TransactionLine({ transaction }: TransactionItemProps) {
  const { colors } = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between">
      <Frame className="w-[80px]" >
        <Paragraph size="xs">{transaction.date}</Paragraph>
      </Frame>
      <Frame className="w-[350px]">
        <Paragraph color="textColor1" size="sm">
          {transaction.description}
        </Paragraph>
      </Frame>
      <Frame className="flex-col w-[100px]">
        <Paragraph weight="medium" color={isIncome ? "success" : "error"} size="sm">{amount}</Paragraph>
      </Frame>
      <Frame className=" items-center w-[150px]">
        <Paragraph weight="light" size="xs"> {transaction.category}</Paragraph>
      </Frame>
    </Frame>
  );
}