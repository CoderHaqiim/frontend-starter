"use client"

import { statusColorMap } from "@/src/utils/statusColorMap";
import Badge from "../base/ui/composites/badge";
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

      <Frame className="w-[120px] items-start justify-start">
        <Badge
          color={statusColorMap(
            customer.paymentStatus === "paid"
              ? "completed"
              : customer.paymentStatus === "pending"
                ? "pending"
                : "overdue"
          ) as "error" | "success" | "warning" | "muted"}
          size="xxs"
          text={customer.paymentStatus}
        />
      </Frame>

      <Frame className="w-[200px] items-center gap-[var(--space-xs)]">
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
    </Frame>
  );
}


