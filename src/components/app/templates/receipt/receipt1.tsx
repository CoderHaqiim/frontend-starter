"use client";

import Frame from "@/src/components/base/ui/primitives/frame";
import Paragraph from "@/src/components/base/ui/primitives/paragraph";
import { useReceiptDraft } from "@/src/store/receiptDraftState";
import { useSelectedBusiness } from "@/src/store/selectedBusinessState";
import { getCurrencySymbol } from "@/src/utils/currencySymbol";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import ReceiptTable from "./receiptTable";

const EMPTY_VALUE = " ";

const formatCurrency = (amount: number, symbol: string) =>
  `${symbol}${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: string) => {
  if (!date) return EMPTY_VALUE;
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

export default function Receipt1() {
  const { selectedBusiness } = useSelectedBusiness();
  const draft = useReceiptDraft();
  const currencySymbol = getCurrencySymbol(draft.currency);

  const businessName = selectedBusiness.businessName || EMPTY_VALUE;
  const businessAddress =
    [
      selectedBusiness.address,
      selectedBusiness.state,
      selectedBusiness.country,
    ]
      .filter(Boolean)
      .join(", ") || EMPTY_VALUE;
  const businessPhone = selectedBusiness.phone || EMPTY_VALUE;
  const businessEmail = selectedBusiness.email || EMPTY_VALUE;

  const amount = Number(draft.amount) || 0;

  return (
    <Frame className="mx-auto w-[148mm] min-h-[210mm] flex-col border border-[#dfe3ea] bg-[#ffffff] p-[10mm] pt-[20mm] shadow-[0_12px_32px_rgba(50,6,79,0.08)]">
      {/* HEADER */}
      <Frame className="w-full top-0 left-0 h-full opacity-[0.3] justify-center items-center" specificStyles={{
        position: "absolute"
      }}>
        <BadgeCheck width="500px" stroke="white" height="500" fill="var(--color-success2)"/>
      </Frame>
      <Frame className="w-full items-start z-[2] justify-between gap-[var(--space-xl)] border-b border-[#dfe3ea] pb-[3mm]">
        <Frame className="items-center gap-[var(--space-md)]">

        {selectedBusiness.logo ? (
          <Frame className="relative h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-[var(--radius-xs)] bg-[#32064f]">
            
              <Image
                src={selectedBusiness.logo}
                alt={`${businessName} logo`}
                width= {40}
                height={40}
                className="h-full w-full object-cover"
              />
          </Frame>
        ) : null}

          <Frame className="flex-col justify-center">
            <Paragraph
              size="xxl"
              weight="semiBold"
              color="textColor1"
            >
              {businessName}
            </Paragraph>
            <Paragraph
              size="xs"
              weight="normal"
              color="muted"
              specificStyle={{ color: "#7a7a7a" }}
            >
              {businessAddress}
            </Paragraph>
          </Frame>
        </Frame>

        <Frame className="ml-auto flex-col items-end gap-[var(--space-xs)]">
          <Paragraph
            size="md"
            weight="semiBold"
            color="accent"
            specificStyle={{ color: "#32064f", fontSize: "18px" }}
          >
            Receipt
          </Paragraph>
          <Paragraph
            size="xs"
            weight="medium"
            color="textColor1"
            specificStyle={{ color: "#1b1b1b" }}
          >
            {draft.receiptNo || EMPTY_VALUE}
          </Paragraph>
          <Paragraph
            size="xxs"
            weight="normal"
            color="muted"
            specificStyle={{ color: "#7a7a7a" }}
          >
            {formatDate(draft.paymentDate)}
          </Paragraph>
        </Frame>
      </Frame>

            
      {/* CUSTOMER + DETAILS */}
      <Frame className="mt-[6mm] z-[2] w-full flex-col gap-[1mm]">
        <Frame className="flex-col">
          <Paragraph
            size="sm"
            weight="bold"
            color="textColor1"
            specificStyle={{
              lineHeight: "2",
              color: "#1b1b1b",
            }}
          >
            Customer&apos;s Details
          </Paragraph>
          <Paragraph
            size="sm"
            color="textColor1"
            specificStyle={{ color: "#1b1b1b" }}
          >
            {draft.customer || EMPTY_VALUE}
          </Paragraph>
          <Paragraph
            size="xs"
            weight="normal"
            color="muted"
            specificStyle={{ color: "#7a7a7a" }}
          >
            {draft.customerEmail || EMPTY_VALUE}
          </Paragraph>
        </Frame>
      </Frame>

      {/* ITEMS */}
      <Frame className="relative z-[70] mt-[6mm] w-full">
        <ReceiptTable />
      </Frame>

      {/* TOTALS */}
      <Frame className="relative z-[2] ml-auto mt-[6mm] w-full max-w-[100mm] flex-col gap-[1mm]">
        <Frame className="w-full items-center justify-end gap-[var(--space-md)]">
          <Paragraph
            size="sm"
            weight="semiBold"
            color="textColor2"
          >
            Total:
          </Paragraph>
          <Paragraph
            size="sm"
            weight="semiBold"
            color="textColor1"
          >
            {formatCurrency(amount, currencySymbol)}
          </Paragraph>
        </Frame>
      </Frame>

      {/* FOOTER */}
      <Frame className="mt-[8mm] z-[2] w-full items-end justify-between border-t border-[#dfe3ea] pt-[5mm]">
        <Frame className="flex-col gap-[2px]">
          <Paragraph
            size="sm"
            weight="semiBold"
            color="accent"
            specificStyle={{ color: "#32064f" }}
          >
            Thank You
          </Paragraph>
          <Paragraph
            size="xxs"
            weight="medium"
            color="muted"
            className="tracking-[0.12em] uppercase"
            specificStyle={{ color: "#7a7a7a" }}
          >
            For Your Trust
          </Paragraph>
        </Frame>

        <Frame className="flex-col items-end gap-[2px]">
          <Paragraph
            size="xxs"
            weight="normal"
            color="muted"
            specificStyle={{ color: "#7a7a7a" }}
          >
            {businessPhone}
          </Paragraph>
          <Paragraph
            size="xxs"
            weight="normal"
            color="muted"
            specificStyle={{ color: "#7a7a7a" }}
          >
            {businessEmail}
          </Paragraph>
        </Frame>
      </Frame>
    </Frame>
  );
}

