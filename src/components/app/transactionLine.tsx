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
  const isCancelled = transaction.status === "cancelled";

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
      {/* A cancelled transaction is a record of something that did not happen, so
          every badge on the row drops the income/expense colouring and reads in the
          plain text colour: whether the money came in or went out no longer carries
          a meaning, because the transaction itself never took effect. */}
      <Frame className="w-[80px] items-center">
        <Badge
          color={isCancelled ? "textColor1" : isIncome ? "success" : "error"}
          bg={isCancelled ? "muted2" : undefined}
          text={transaction.type}
          size="xs"
          className="w-max"
        />
      </Frame>
      <Frame className="w-[80px] items-center">
        <Badge
          color={
            isCancelled
              ? "textColor1"
              : transaction.status === "completed"
                ? "success"
                : transaction.status === "pending"
                  ? "warning"
                  : "error"
          }
          bg={isCancelled ? "muted2" : undefined}
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

      {/* The row menu sits at the end of the row: the type and status changes only
          act once the button is clicked, and each travels through the transactions
          route. A transaction is never deleted, so the menu carries no delete. */}
      <Frame className="w-[60px] items-center justify-end">
        <Popup
          gap={20}
          width="210px"
          closeOnContentClick
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
  const isCancelled = transaction.status === "cancelled"
  // A completed or a cancelled transaction has settled, and the route refuses to
  // change either one. The menu therefore offers no actions at all for a settled
  // transaction, so it never shows a control that would come back as an error.
  const isSettled = isCompleted || isCancelled

  return (
    <Frame className="gap-[var(--space-sm)] flex-col">
      {/* The type switch is an edit like any other, so it is only offered while the
          transaction can still be changed. */}
      {!isSettled && (
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
      )}

      {/* A settled transaction has no action left, so it shows its two statuses as
          the badges they are: the cancelled one in the plain text colour, since a
          cancelled transaction is a record of something that did not happen rather
          than a failure, and the completed one in success with its check. */}
      {isSettled ? (
        <Frame className="w-full flex-col gap-[var(--space-xs)]">
          <Badge color="textColor1" bg="muted2" size="xs" text={transaction.type} className="w-max" />
          {isCompleted ? (
            <Badge color="success" size="xs" iconName="icon-badge-check" text="completed" className="w-max" />
          ) : (
            <Badge color="textColor1" bg="muted2" size="xs" text="cancelled" className="w-max" />
          )}
        </Frame>
      ) : (
        <>
          {/* The status actions come first, while the transaction is still open and
              either of them can still be taken. */}
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

          <Button variant="fill" size="xs" rounded="sm"
            func={() => onChangeStatus("completed")}
            specificStyles={{width: "100%"}}
          >
            Mark complete
          </Button>
        </>
      )}

    </Frame>
  )
}
