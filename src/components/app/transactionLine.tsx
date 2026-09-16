"use client"

import { Transaction } from "@/src/types/types";
import Badge from "../base/ui/composites/badge";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";
import { useTheme } from "../providers/themeProvider";

type TransactionItemProps = {
  transaction: Transaction;
}

export default function TransactionLine({ transaction }: TransactionItemProps) {
  const { colors } = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full py-[var(--space-md)] px-[var(--space-lg)] justify-between">
      <Frame className="w-[80px]" >
        <Paragraph size="xs">{transaction.date}</Paragraph>
      </Frame>
      <Frame className="w-[220px]">
        <Paragraph weight="normal" color="textColor1" size="xs">
          {transaction.description}
        </Paragraph>
      </Frame>
      <Frame className="w-[150px]">
        <Paragraph size="xs">{transaction.customer}</Paragraph>
      </Frame>
      <Frame className="flex-col w-[100px]">
        <Badge
          color={isIncome ? "success" : "error"}
          text={transaction.type}
          size="xs"
          className="w-max"
        />
      </Frame>
      <Frame className="flex-col w-[100px]">
        <Badge
          color={
            transaction.status === "completed"
              ? "success"
              : transaction.status === "pending"
                ? "warning"
                : "error"
          }
          text={transaction.status}
          size="xs"
          className="w-max"
        />
      </Frame>
      <Frame className=" items-center w-[120px]">
        <Paragraph size="xs"> {transaction.category}</Paragraph>
      </Frame>
       <Frame className="flex-col items-end w-[100px]">
        <Paragraph weight="medium" color={isIncome ? "success" : "error"} size="xs">{amount}</Paragraph>
      </Frame>
    </Frame>
  );
}