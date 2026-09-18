"use client"

import { shadow1, shadow3 } from "@/src/app/design/shadows";
import { statusColorMap } from "@/src/utils/statusColorMap";
import { useState } from "react";
import Badge from "../base/ui/composites/badge";
import Card from "../base/ui/composites/card";
import Frame from "../base/ui/primitives/frame";
import Paragraph from "../base/ui/primitives/paragraph";
import { useTheme } from "../providers/themeProvider";

type createInvoiceType = {
  date: string;
  id: string;
  amount: string;
  customer: {
    id: string;
    name: string;
    paymentStatus: string;
  };
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

  const customer = invoice.customer

  return (
    <Frame className="w-full items-center p-[var(--space-lg)] justify-between bg-[var(--color-white)]">
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
          <Frame
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[length:var(--bodySize-xs)] font-[var(--fontWeight-medium)] text-[var(--color-textColor1)]"
            specificStyles={{
              backgroundColor: recipientBackgrounds[0],
              borderColor: colors["white"],
            }}
          >
            {customer.name.charAt(0).toUpperCase()}
          </Frame>
          <Paragraph size="xs">{customer.name}</Paragraph>
        </Frame>

        {customersOpen && (
          <Card width="200px" height="max-content" padding="lg" className={`bottom-[100%] right-0 z-[200] ${shadow3} ${shadow1}`}
            specificStyles={{ position: "absolute"}}
          >
            <Frame direction="column" scroll="hidden" className="w-full flex-col gap-[var(--space-lg)]" specificStyles={{ maxHeight: "200px" }}>
              <Frame className="w-full items-center justify-between">
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
            </Frame>
          </Card>
        )}
      </Frame>
    </Frame>
  );
}


