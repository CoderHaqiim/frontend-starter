"use client";

import InvoiceTable from "@/src/components/app/invoiceTable";
import Frame from "@/src/components/base/ui/primitives/frame";
import Paragraph from "@/src/components/base/ui/primitives/paragraph";
import { getItemsSubtotal, useInvoiceDraft } from "@/src/store/invoiceDraftState";
import { useSelectedBusiness } from "@/src/store/selectedBusinessState";

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: string, fallback: string) => {
  if (!date) return fallback;

  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

export default function Invoice1() {
  const { selectedBusiness } = useSelectedBusiness();
  const invoiceDraft = useInvoiceDraft();
  const businessName = selectedBusiness.businessName || "Your Company";

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
      <Frame className="mx-auto w-[210mm] min-h-[297mm] flex-col border border-[#dfe3ea] bg-[#ffffff] p-[14mm] shadow-[0_12px_32px_rgba(50,6,79,0.08)]">
        <Frame className="w-full items-start justify-between gap-[var(--space-xl)] border-b border-[#dfe3ea] pb-[3mm]">
          
          <Frame className="items-center gap-[var(--space-md)]">
            
            <Frame className="relative h-[40px] w-[40px] items-center justify-center rounded-[var(--radius-xs)] bg-[#32064f]">
              
            </Frame>

            <Frame className="flex-col justify-center">
              <Paragraph size="xl" weight="semiBold" color="textColor1" specificStyle={{
                lineHeight:"sm",
                color: '#1b1b1b'
              }}>{businessName}</Paragraph>
              <Paragraph size="xs" weight="normal" color="muted" specificStyle={{ color: '#7a7a7a' }}>
                business tagline
              </Paragraph>
            </Frame>
          </Frame>

          <Frame className="ml-auto flex-col items-end">
            <Paragraph size="md" weight="bold" color="accent" className="tracking-[-0.06em]" specificStyle={{ color: '#32064f' }}>
              INVOICE
            </Paragraph>

            <Frame className="mt-[var(--space-xs)] flex-col items-end gap-[2px]">
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>Invoice No:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>invoice-number</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>Issue Date:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>{formatDate(invoiceDraft.issueDate, "Issue Date")}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-xs)]">
                <Paragraph size="xs" weight="medium" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>Due Date:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>{formatDate(invoiceDraft.dueDate, "Due Date")}</Paragraph>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        <Frame className="w-full mb-[5mm] flex-col gap-[var(--space-sm)] py-[1.5mm]">
          <Frame className="gap-[var(--space-lg)]">
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]" specificStyle={{ color: '#4f4f4f' }}>
              <span>123 Business Street, Lagos, Nigeria</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]" specificStyle={{ color: '#4f4f4f' }}>
              <span>+234 801 234 5678</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]" specificStyle={{ color: '#4f4f4f' }}>
              <span>hello@yourcompany.com</span>
            </Paragraph>
            <Paragraph size="xxs" color="textColor2" className="items-center gap-[var(--space-xs)]" specificStyle={{ color: '#4f4f4f' }}>
              <span>www.yourcompany.com</span>
            </Paragraph>
          </Frame>

          <Frame className="w-full flex border-t border-b py-[var(--space-lg)] border-[#dfe3ea] gap-[4mm]">
            <Frame className="flex-1 flex-col items-start">
              <Paragraph size="sm" weight="bold" color="textColor1" specificStyle={{
                lineHeight:"2",
                color: '#1b1b1b'
              }}>Bill To :</Paragraph>
              <Paragraph className="customer" size="sm" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>{invoiceDraft.customer || "Client's Name"}</Paragraph>
              <Paragraph className="address" size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>{invoiceDraft.customerAddress || "Client's address"}</Paragraph>
              <Paragraph className="email" size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>{invoiceDraft.customerEmail || "Client's email"}</Paragraph>
            </Frame>

            <Frame className="flex-1 gap-[var(--space-xs)] flex-col">
              <Paragraph size="sm" weight="bold" color="textColor1" specificStyle={{
                lineHeight:"2",
                color: '#1b1b1b'
              }}>Payment Details</Paragraph>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]" specificStyle={{ color: '#1b1b1b' }}>Bank Name:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>Your bank name</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]" specificStyle={{ color: '#1b1b1b' }}>Account Name:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>{businessName}</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]" specificStyle={{ color: '#1b1b1b' }}>Account Number:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>0123456789</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]" specificStyle={{ color: '#1b1b1b' }}>Sort Code:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>044</Paragraph>
              </Frame>
              <Frame className="gap-[var(--space-lg)]">
                <Paragraph size="xs" color="textColor1" className="w-[100px]" specificStyle={{ color: '#1b1b1b' }}>Reference:</Paragraph>
                <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>INV-2025-001</Paragraph>
              </Frame>
            </Frame>
          </Frame>
        </Frame>

        <InvoiceTable />

        <Frame className="ml-auto mt-[6mm] w-full max-w-[120mm] flex-col gap-[1mm]">
          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" weight="medium" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>Subtotal</Paragraph>
            <Paragraph size="xs" weight="medium" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>{formatCurrency(subtotal)}</Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>Discount ({discountRate}%)</Paragraph>
            <Paragraph size="xs" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>- {formatCurrency(discount)}</Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>VAT ({vatRate}%)</Paragraph>
            <Paragraph size="xs" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>{formatCurrency(vat)}</Paragraph>
          </Frame>

          <Frame className="mt-[2px] w-full items-center justify-between rounded-[var(--radius-sm)] bg-[#32064f] px-[var(--space-md)] py-[var(--space-md)]">
            <Paragraph size="sm" color="textColor1" weight="bold" specificStyle={{ color: '#ffffff' }}>Total</Paragraph>
            <Paragraph size="sm" color="textColor1" weight="bold" specificStyle={{ color: '#ffffff' }}>{formatCurrency(total)}</Paragraph>
          </Frame>
        </Frame>

        <Frame className="mt-[8mm] flex-col border-t border-[#dfe3ea] pt-[5mm]">
          <Paragraph size="sm" weight="bold" color="textColor1" specificStyle={{ color: '#1b1b1b' }}>Notes</Paragraph>
          <Frame className="flex-col gap-[2px]">
            <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>• Payment is due within 14 days from the invoice date.</Paragraph>
            <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>• Please use the invoice number as the payment reference.</Paragraph>
            <Paragraph size="xs" color="textColor2" specificStyle={{ color: '#4f4f4f' }}>• For questions, contact us at hello@yourcompany.com.</Paragraph>
          </Frame>
        </Frame>

        <Frame className="mt-[8mm] w-full items-end justify-between border-t border-[#dfe3ea] pt-[5mm]">
          <Frame className="flex-col gap-[2px]">
            <Paragraph size="sm" weight="semiBold" color="accent" specificStyle={{ color: '#32064f' }}>Thank You</Paragraph>
            <Paragraph size="xxs" weight="medium" color="muted" className="tracking-[0.12em] uppercase" specificStyle={{ color: '#7a7a7a' }}>For Your Trust</Paragraph>
          </Frame>
        </Frame>
      </Frame>
  );
}