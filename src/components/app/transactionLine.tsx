"use client"

import { Transaction } from "@/src/types/types";
import { shortenText } from "@/src/utils/shortenText";
import Badge from "../base/ui/composites/badge";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";
import { useTheme } from "../providers/themeProvider";
import RowActions from "./rowActions";

type TransactionItemProps = {
  transaction: Transaction;
  onDelete: (transactionId: string) => void;
}

export default function TransactionLine({ transaction, onDelete }: TransactionItemProps) {
  const { colors } = useTheme()
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}$${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full py-[var(--space-md)] align-center px-[var(--space-md)] justify-between">
      <Frame className="w-[80px]" >
        <Paragraph size="xs">{transaction.date}</Paragraph>
      </Frame>
      <Frame className="w-[200px]">
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
      <Frame className=" items-center w-[100px]">
        <Paragraph size="xs"> {shortenText(transaction.category, 20)}</Paragraph>
      </Frame>
       <Frame className="flex-col items-end w-[100px]">
        <Paragraph weight="medium" color={isIncome ? "success" : "error"} size="xs">{amount}</Paragraph>
      </Frame>
      <Frame className="w-[40px] justify-end">
        <RowActions onDelete={() => onDelete(transaction.id)} />
      </Frame>
    </Frame>
  );
}