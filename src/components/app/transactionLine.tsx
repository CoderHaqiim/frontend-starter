"use client"

import { Transaction } from "@/src/types/types";
import { shortenText } from "@/src/utils/shortenText";
import Badge from "../base/ui/composites/badge";
import Popup from "../base/ui/composites/popup";
import Button from "../base/ui/primitives/button";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";

const transactionTypes: Transaction["type"][] = ["income", "expense"]

type TransactionItemProps = {
  transaction: Transaction;
  onChangeStatus: (transactionId: string, status: Transaction["status"]) => void;
  onChangeType: (transactionId: string, type: Transaction["type"]) => void;
}

export default function TransactionLine({ transaction, onChangeStatus, onChangeType }: TransactionItemProps) {
  const isIncome = transaction.type === "income";
  const amount = `${isIncome ? "+" : "-"}${transaction.amount.toLocaleString()}`;

  return (
    <Frame className="w-full py-[var(--space-md)] px-[var(--space-md)] justify-between">
      <Frame className="w-[80px] items-center" >
        <Paragraph size="xs">{transaction.date}</Paragraph>
      </Frame>
      <Frame className="w-[200px] items-center">
        <Paragraph weight="normal" color="textColor1" size="xs">
          {transaction.description}
        </Paragraph>
      </Frame>
      <Frame className="w-[150px] items-center">
        <Paragraph size="xs">{transaction.customer}</Paragraph>
      </Frame>
      <Frame className="w-[80px] items-center">
        <Badge
          color={isIncome ? "success" : "error"}
          text={transaction.type}
          size="xs"
          className="w-max"
        />
      </Frame>
      <Frame className="w-[80px] items-center">
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
      <Frame className=" items-center w-[80px] items-center">
        <Paragraph size="xs"> {shortenText(transaction.category, 20)}</Paragraph>
      </Frame>
       <Frame className="justify-end w-[100px] items-center">
        <Paragraph weight="medium" color={isIncome ? "success" : "error"} size="xs">{amount}</Paragraph>
      </Frame>

      {/* The row menu sits at the end of the row: the status and type changes only
          act once the button is clicked. */}
      <Frame className="w-[60px] items-center justify-end">
        <Popup
          gap={20}
          width="210px"
          content={
            <TransactionLinePopup
              transaction={transaction}
              onChangeStatus={(status) => onChangeStatus(transaction.id, status)}
              onChangeType={(type) => onChangeType(transaction.id, type)}
            />
          }
        >
          <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
        </Popup>
      </Frame>
    </Frame>
  );
}


type TransactionLinePopupProps = {
  transaction: Transaction;
  onChangeStatus: (status: Transaction["status"]) => void;
  onChangeType: (type: Transaction["type"]) => void;
}

function TransactionLinePopup({ transaction, onChangeStatus, onChangeType }: TransactionLinePopupProps) {
  const isCompleted = transaction.status === "completed"

  return (
    <Frame className="gap-[var(--space-sm)] flex-col">
      <Frame className="w-full flex-col gap-[var(--space-xxs)]">
        <Frame className="w-full gap-[var(--space-xs)] rounded-[var(--radius-sm)] bg-[var(--color-background1)] border border-[var(--color-outline1)] p-[var(--space-sm)]">
          {
            transactionTypes.map((type) => (
              <Button key={type} variant="ghost" size="xxs" rounded="xs"
                className="flex-1"
                specificStyles={{
                  backgroundColor: transaction.type === type ? "var(--color-accent2)" : "transparent",
                  color: transaction.type === type ? "var(--color-accent)" : "var(--color-textColor1)",
                  border: "border 1px var(--color-outline1)",
                }}
                func={() => onChangeType(type)}
              >
                {type}
              </Button>
            ))
          }
        </Frame>
      </Frame>
      {/* The status action comes first. A completed transaction has settled, so the
          badge stands where the button would be. */}
      <Button variant="outline" size="xs" rounded="sm"
        specificStyles={{
          width: "100%",
          backgroundColor: "var(--color-error2)",
          color: "var(--color-error)",
        }}
        func={() => onChangeStatus("cancelled")}
      >
        Cancel transaction
      </Button>

        {
        isCompleted ? 
        <Badge color="success" size="xs" iconName="icon-badge-check" text="completed" className="w-max" />:
        <Button variant="fill" size="xs" rounded="sm"
          func={() => onChangeStatus("completed")}
          specificStyles={{width: "100%"}}
        >
          Mark complete
        </Button>
      }

    </Frame>
  )
}
