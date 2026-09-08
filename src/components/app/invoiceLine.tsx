"use client"

import { shadow1, shadow3 } from "@/src/app/design/shadows";
import { statusColorMap } from "@/src/utils/statusColorMap";
import { useState } from "react";
import { useTheme } from "../providers/themeProvider";
import Badge from "../ui/composites/badge";
import Card from "../ui/composites/card";
import Tooltip from "../ui/composites/tooltip";
import Frame from "../ui/primitives/frame";
import Paragraph from "../ui/primitives/paragraph";

type createInvoiceType = {
  date: string;
  id: string;
  amount: string;
  sentTo: {
    id: string;
    name: string;
    paymentStatus: string;
  }[];
}

type invoiceTypeProps = {
  invoice: createInvoiceType;
}

export default function InvoiceLine({ invoice }: invoiceTypeProps) {
  const { colors } = useTheme()
  const [customersOpen, setCustomersOpen] = useState(false)

  const recipientBackgrounds = [
  "#5B8DEF", // Soft blue
  "#D977A8", // Dusty pink
  "#5FBF9F", // Soft teal
  "#D6A84F", // Muted amber
  "#9B7BC7", // Soft purple
]

  const visibleRecipients = invoice.sentTo.slice(0, 4)
  const remainingRecipients = invoice.sentTo.length - visibleRecipients.length
  return (
    <Frame className="w-full p-[var(--space-lg)] justify-between bg-[var(--color-white)]">
      <Frame className="w-[100px]" >
        <Paragraph size="xs">{invoice.date}</Paragraph>
      </Frame>
      <Frame className="w-[80px]">
        <Paragraph size="xs">
          {invoice.id}
        </Paragraph>
      </Frame>
      <Frame className="flex-col items-end w-[100px]">
        <Paragraph size="xs">{invoice.amount}</Paragraph>
      </Frame>
      <Frame
        className="w-[200px] cursor-pointer items-center"
        onClick={() => setCustomersOpen((open) => !open)}
        onMouseLeave={() => setCustomersOpen(false)}
      >
        <Frame className="items-center gap-[var(--space-xs)]">
          {visibleRecipients.map((customer, index) => (
            <Tooltip key={customer.id} content={customer.name}>
              <Frame
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[length:var(--bodySize-xs)] font-[var(--fontWeight-medium)] text-[var(--color-textColor1)]"
                specificStyles={{
                  backgroundColor: recipientBackgrounds[index % recipientBackgrounds.length],
                  borderColor: colors["white"],
                  marginLeft: index === 0 ? undefined : "-12px",
                  zIndex: visibleRecipients.length - index,
                }}
              >
                {customer.name.charAt(0).toUpperCase()}
              </Frame>
            </Tooltip>
          ))}
          {remainingRecipients > 0 && (
            <Paragraph size="xs">and {remainingRecipients} other(s)</Paragraph>
          )}
        </Frame>

        {customersOpen && (
          <Card width="200px" height="max-content" padding="lg" className={`bottom-[100%] right-0 z-[200] ${shadow3} ${shadow1}`}
            specificStyles={{ position: "absolute"}}
          >
            <Frame direction="column" scroll="hidden" className="w-full flex-col gap-[var(--space-lg)]" specificStyles={{ maxHeight: "200px" }}>
              {invoice.sentTo.map((customer) => (
                <Frame key={customer.id} className="w-full items-center justify-between">
                  <Paragraph size="xs" color="textColor1" weight="medium">
                    {customer.name}
                  </Paragraph>
                  <Badge
                    color={statusColorMap(
                      (customer.paymentStatus === "paid"
                        ? "completed"
                        : customer.paymentStatus) as "completed" | "overdue" | "pending"
                    ) as "error" | "success" | "warning"}
                    size="xxs"
                    text={customer.paymentStatus}
                  />
                </Frame>
              ))}
            </Frame>
          </Card>
        )}
      </Frame>
    </Frame>
  );
}


