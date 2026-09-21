"use client";

import InvoiceTable from "@/src/components/app/invoiceTable";
import Frame from "@/src/components/base/ui/primitives/frame";
import Paragraph from "@/src/components/base/ui/primitives/paragraph";
import { getItemsSubtotal, useInvoiceDraft } from "@/src/store/invoiceDraftState";
import { useSelectedBusiness } from "@/src/store/selectedBusinessState";
import { getCurrencySymbol } from "@/src/utils/currencySymbol";

// Values populated from the business or the invoice inputs render as a blank
// space when no data is available, instead of placeholder data.
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

export default function Invoice1() {
  const { selectedBusiness } = useSelectedBusiness();
  const invoiceDraft = useInvoiceDraft();
  const currencySymbol = getCurrencySymbol(invoiceDraft.currency);
  const businessName = selectedBusiness.businessName || EMPTY_VALUE;
  const businessTagline = selectedBusiness.tagLine || EMPTY_VALUE;
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
  const businessWebsite = selectedBusiness.website || EMPTY_VALUE;

  const enteredAmount = Number(invoiceDraft.amount);
  const itemsSubtotal = getItemsSubtotal(invoiceDraft.items);
  const subtotal = invoiceDraft.items.length > 0
    ? itemsSubtotal
    : enteredAmount > 0 ? enteredAmount : 0;
  const discountRate = Number(invoiceDraft.discount) || 0;
  const vatRate = Number(invoiceDraft.vat) || 0;
  const discount = subtotal * (discountRate / 100);
  const vat = (subtotal - discount) * (vatRate / 100);
  const total = subtotal - discount + vat;

  return (
      <Frame className="mx-auto w-[210mm] min-h-[297mm] flex-col border border-[var(--color-outline1)] bg-[var(--color-white)] p-[14mm] shadow-[0_12px_32px_rgba(50,6,79,0.08)]">
        <Frame className="w-full items-start justify-between gap-[var(--space-xl)] border-b border-[var(--color-outline1)] pb-[3mm]">
          
          <Frame className="items-center gap-[var(--space-md)]">
            
            <Frame className="relative h-[40px] w-[40px] overflow-hidden items-center justify-center rounded-[var(--radius-xs)] bg-[var(--color-accent)]">
              {selectedBusiness.logo ? (
                <img src={selectedBusiness.logo} alt={`${businessName} logo`} className="h-full w-full object-cover" />
              ) : null}
              
            </Frame>

            <Frame className="flex-col justify-center">
              <Paragraph size="xl" weight="semiBold" color="textColor1" specificStyle={{
                lineHeight:"sm"
              }}>{businessName}</Paragraph>
              <Paragraph size="xs" weight="normal" color="muted">
                {businessTagline}
              </Paragraph>
            </Frame>
          </Frame>

          <Frame className="ml-auto flex-col items-end">
            <Paragraph size="md" weight="bold" color="accent" className="tracking-[-0.06em]">
              INVOICE
            </Paragraph>

            <Frame className="mt-[var(--space-xs)] flex-col items-end gap-[2px]">
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1">Invoice No:</Paragraph>
                <Paragraph size="xs" color="textColor2">{invoiceDraft.invoiceNo || EMPTY_VALUE}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1">Invoice Date:</Paragraph>
                <Paragraph size="xs" color="textColor2">{formatDate(invoiceDraft.issueDate)}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1">Due Date:</Paragraph>
                <Paragraph size="xs" color="textColor2">{formatDate(invoiceDraft.dueDate)}</Paragraph>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        <Frame className="w-full mb-[5mm] flex-col gap-[var(--space-sm)] py-[1.5mm]">
          <Frame className="gap-[var(--space-lg)]">
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]">
              
              <span>{businessAddress}</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]">
              
              <span>{businessPhone}</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]">
              
              <span>{businessEmail}</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]">
              
              <span>{businessWebsite}</span>
            </Paragraph>
          </Frame>

          <Frame className="w-full flex border-t border-b py-[var(--space-lg)] border-[var(--color-outline1)] gap-[4mm]">
            <Frame className="flex-1 flex-col items-start">
              <Paragraph size="sm" weight="bold" color="textColor1" specificStyle={{
                lineHeight:"2"
              }}>Bill To :</Paragraph>
              <Paragraph size="xs" color="textColor1">{invoiceDraft.customer || EMPTY_VALUE}</Paragraph>
              <Paragraph size="xxs" color="textColor2">{invoiceDraft.customerAddress || EMPTY_VALUE}</Paragraph>
              <Paragraph size="xxs" color="textColor2">{invoiceDraft.customerEmail || EMPTY_VALUE}</Paragraph>
            </Frame>

            <Frame className="flex-1 gap-[var(--space-xs)] flex-col">
              <Paragraph size="sm" weight="bold" color="textColor1" specificStyle={{
                lineHeight:"2"
              }}>Payment Details</Paragraph>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]">Bank Name:</Paragraph>
                <Paragraph size="xs" color="textColor2">{EMPTY_VALUE}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]">Account Name:</Paragraph>
                <Paragraph size="xs" color="textColor2">{businessName}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]">Account Number:</Paragraph>
                <Paragraph size="xs" color="textColor2">{EMPTY_VALUE}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]">Sort Code:</Paragraph>
                <Paragraph size="xs" color="textColor2">{EMPTY_VALUE}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]">Reference:</Paragraph>
                <Paragraph size="xs" color="textColor2">{EMPTY_VALUE}</Paragraph>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        <InvoiceTable />

        <Frame className="ml-auto mt-[6mm] w-full max-w-[120mm] flex-col gap-[1mm]">
          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" weight="medium" color="textColor1">Subtotal</Paragraph>
            <Paragraph size="xs" weight="medium" color="textColor1">{formatCurrency(subtotal, currencySymbol)}</Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" color="textColor2">Discount ({discountRate}%)</Paragraph>
            <Paragraph size="xs" color="textColor1">- {formatCurrency(discount, currencySymbol)}</Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" color="textColor2">VAT ({vatRate}%)</Paragraph>
            <Paragraph size="xs" color="textColor1">{formatCurrency(vat, currencySymbol)}</Paragraph>
          </Frame>

          <Frame className="mt-[2px] w-full items-center justify-between rounded-[var(--radius-sm)] bg-[var(--color-accent2)] px-[var(--space-md)] py-[var(--space-md)]">
            <Paragraph size="sm" color="textColor1" weight="bold" >Total</Paragraph>
            <Paragraph size="sm" color="textColor1" weight="bold">{formatCurrency(total, currencySymbol)}</Paragraph>
          </Frame>
        </Frame>

        <Frame className="mt-[8mm] flex-col border-t border-[var(--color-outline1)] pt-[5mm]">
          <Paragraph size="sm" weight="bold" color="textColor1">Notes</Paragraph>
          <Frame className="flex-col gap-[2px]">
            <Paragraph size="xs" color="textColor2">• Payment is due within 14 days from the invoice date.</Paragraph>
            <Paragraph size="xs" color="textColor2">• Please use the invoice number as the payment reference.</Paragraph>
            <Paragraph size="xs" color="textColor2">• For questions, contact us at {businessEmail}.</Paragraph>
          </Frame>
        </Frame>

        <Frame className="mt-[8mm] w-full items-end justify-between border-t border-[var(--color-outline1)] pt-[5mm]">
        </Frame>
      </Frame>
  );
}