"use client";

import { useReceiptDraft } from "@/src/store/receiptDraftState";
import { useSelectedBusiness } from "@/src/store/selectedBusinessState";
import { getCurrencySymbol } from "@/src/utils/currencySymbol";
import { EMPTY_VALUE } from "@/src/utils/emptyValue";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { formatDate } from "@/src/utils/formatDate";
import Frame from "@/src/components/base/ui/primitives/frame";
import Paragraph from "@/src/components/base/ui/primitives/paragraph";
import ReceiptTable from "./receiptTable";

export default function Receipt2() {
  const { selectedBusiness } = useSelectedBusiness();
  const draft = useReceiptDraft();
  const currencySymbol = getCurrencySymbol(draft.currency);

  const businessName = selectedBusiness.businessName || EMPTY_VALUE;
  const businessAddress = [selectedBusiness.address, selectedBusiness.state, selectedBusiness.country]
      .filter(Boolean).join(", ") || EMPTY_VALUE;
  const businessPhone = selectedBusiness.phone || EMPTY_VALUE;
  const businessEmail = selectedBusiness.email || EMPTY_VALUE;
  const amount = Number(draft.amount) || 0;

  return (
    <Frame className="mx-auto w-[148mm] min-h-[210mm] flex-col border-2 border-[#32064f] bg-[#ffffff] p-[16mm] shadow-[0_14px_36px_rgba(50,6,79,0.12)]">
      {/* HEADER */}
      <Frame className="w-full items-center justify-center pb-[4mm]">
        <Frame className="flex-col items-center">
          <Paragraph size="xl" weight="semiBold" color="textColor1"
            specificStyle={{ color: "#32064f", letterSpacing: "0.04em" }}>
            {businessName}
          </Paragraph>
          <Paragraph size="xs" weight="normal" color="muted"
            specificStyle={{ color: "#7a7a7a" }}>
            {businessAddress}
          </Paragraph>
          <Paragraph size="xxs" weight="normal" color="muted"
            specificStyle={{ color: "#7a7a7a" }}>
            {businessPhone} | {businessEmail}
          </Paragraph>
        </Frame>
      </Frame>

      {/* RECEIPT TITLE */}
      <Frame className="w-full items-center justify-center py-[4mm]">
        <Frame className="flex-col items-center">
          <Paragraph size="xl" weight="bold" color="accent"
            specificStyle={{ color: "#32064f", fontSize: "22px", letterSpacing: "0.08em" }}>
            PAYMENT RECEIPT
          </Paragraph>
          <Paragraph size="sm" weight="semiBold" color="textColor1"
            specificStyle={{ color: "#1b1b1b" }}>
            #{draft.receiptNo || EMPTY_VALUE}
          </Paragraph>
          <Paragraph size="xs" weight="normal" color="muted"
            specificStyle={{ color: "#7a7a7a" }}>{formatDate(draft.paymentDate, "long")}</Paragraph>
        </Frame>
      </Frame>

      {/* CUSTOMER + DETAILS */}
      <Frame className="mt-[4mm] w-full flex-col gap-[4mm]">
        <Frame className="flex-col gap-[2px]">
          <Paragraph size="sm" weight="bold" color="textColor1"
            specificStyle={{ lineHeight: "2", color: "#1b1b1b" }}>Customer&apos;s Details</Paragraph>
          <Paragraph size="sm" color="textColor1"
            specificStyle={{ color: "#1b1b1b" }}>{draft.customer || EMPTY_VALUE}</Paragraph>
          <Paragraph size="xs" weight="normal" color="muted"
            specificStyle={{ color: "#7a7a7a" }}>{draft.customerEmail || EMPTY_VALUE}</Paragraph>
        </Frame>
      </Frame>

      {/* ITEMS */}
      <Frame className="mt-[6mm] w-full">
        <ReceiptTable />
      </Frame>

      {/* TOTALS */}
      <Frame className="ml-auto mt-[6mm] w-full max-w-[100mm] flex-col gap-[1mm] border-t-2 border-[#32064f] pt-[4mm]">
        <Frame className="w-full items-center justify-between">
          <Paragraph size="sm" weight="semiBold" color="textColor1"
            specificStyle={{ color: "#32064f" }}>TOTAL AMOUNT</Paragraph>
          <Paragraph size="xl" weight="bold" color="accent"
            specificStyle={{ color: "#32064f" }}>{formatCurrency(amount, currencySymbol)}</Paragraph>
        </Frame>
      </Frame>

      {/* FOOTER */}
      <Frame className="mt-auto w-full border-t border-[#32064f] pt-[4mm]">
        <Paragraph size="xs" weight="normal" color="muted"
          specificStyle={{ color: "#7a7a7a" }}>Thank you for your business.</Paragraph>
      </Frame>
    </Frame>
  );
}
