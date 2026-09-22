"use client";

import InvoiceTable from "@/src/components/app/invoiceTable";
import Frame from "@/src/components/base/ui/primitives/frame";
import Paragraph from "@/src/components/base/ui/primitives/paragraph";
import { getItemsSubtotal, useInvoiceDraft } from "@/src/store/invoiceDraftState";
import { useSelectedBusiness } from "@/src/store/selectedBusinessState";
import { getCurrencySymbol } from "@/src/utils/currencySymbol";

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

export default function Invoice2() {
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

  const subtotal =
    invoiceDraft.items.length > 0
      ? itemsSubtotal
      : enteredAmount > 0
        ? enteredAmount
        : 0;

  const discountRate = Number(invoiceDraft.discount) || 0;
  const vatRate = Number(invoiceDraft.vat) || 0;

  const discount = subtotal * (discountRate / 100);
  const vat = (subtotal - discount) * (vatRate / 100);
  const total = subtotal - discount + vat;

  return (
    <Frame className="mx-auto w-[210mm] min-h-[297mm] flex-col border border-[#dfe3ea] bg-[#ffffff] px-[13mm] py-[12mm]">

      {/* HEADER */}
      <Frame className="w-full items-start justify-between">

        <Frame className="items-center gap-[var(--space-md)]">

          <Frame className="relative h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-[var(--radius-xs)] bg-[#32064f]">
            {selectedBusiness.logo ? (
              <img
                src={selectedBusiness.logo}
                alt={`${businessName} logo`}
                className="h-full w-full object-cover"
              />
            ) : null}
          </Frame>

          <Frame className="flex-col">
            <Paragraph
              size="xl"
              weight="semiBold"
              color="textColor1"
              specificStyle={{
                lineHeight: "sm",
                color: "#1b1b1b",
              }}
            >
              {businessName}
            </Paragraph>

            <Paragraph
              size="xs"
              weight="normal"
              color="muted"
              specificStyle={{ color: "#7a7a7a" }}
            >
              {businessTagline}
            </Paragraph>
          </Frame>
        </Frame>

        <Frame className="flex-col items-end">

          <Paragraph
            size="md"
            weight="bold"
            color="accent"
            className="tracking-[-0.06em]"
            specificStyle={{ color: "#32064f" }}
          >
            INVOICE
          </Paragraph>

          <Frame className="mt-[var(--space-xs)] flex-col items-end gap-[2px]">

            <Frame className="gap-[var(--space-xs)]">
              <Paragraph
                size="xs"
                weight="medium"
                color="textColor1"
                specificStyle={{ color: "#1b1b1b" }}
              >
                Invoice No:
              </Paragraph>

              <Paragraph
                size="xs"
                color="textColor2"
                specificStyle={{ color: "#4f4f4f" }}
              >
                {invoiceDraft.invoiceNo || EMPTY_VALUE}
              </Paragraph>
            </Frame>

            <Frame className="gap-[var(--space-xs)]">
              <Paragraph
                size="xs"
                weight="medium"
                color="textColor1"
                specificStyle={{ color: "#1b1b1b" }}
              >
                Issue Date:
              </Paragraph>

              <Paragraph
                size="xs"
                color="textColor2"
                specificStyle={{ color: "#4f4f4f" }}
              >
                {formatDate(invoiceDraft.issueDate)}
              </Paragraph>
            </Frame>

            <Frame className="gap-[var(--space-xs)]">
              <Paragraph
                size="xs"
                weight="medium"
                color="textColor1"
                specificStyle={{ color: "#1b1b1b" }}
              >
                Due Date:
              </Paragraph>

              <Paragraph
                size="xs"
                color="textColor2"
                specificStyle={{ color: "#4f4f4f" }}
              >
                {formatDate(invoiceDraft.dueDate)}
              </Paragraph>
            </Frame>

          </Frame>
        </Frame>
      </Frame>

      {/* PURPLE ACCENT LINE */}
      <Frame className="mt-[4mm] h-[2px] w-full bg-[#32064f]" />

      {/* BUSINESS CONTACT INFORMATION */}
      <Frame className="w-full items-center gap-[var(--space-lg)] py-[2.5mm]">

        <Paragraph
          size="xxs"
          color="textColor2"
          specificStyle={{ color: "#4f4f4f" }}
        >
          {businessAddress}
        </Paragraph>

        <Paragraph
          size="xxs"
          color="textColor2"
          specificStyle={{ color: "#4f4f4f" }}
        >
          {businessPhone}
        </Paragraph>

        <Paragraph
          size="xxs"
          color="textColor2"
          specificStyle={{ color: "#4f4f4f" }}
        >
          {businessEmail}
        </Paragraph>

        <Paragraph
          size="xxs"
          color="textColor2"
          specificStyle={{ color: "#4f4f4f" }}
        >
          {businessWebsite}
        </Paragraph>

      </Frame>

      {/* CUSTOMER / PAYMENT SECTION */}
      <Frame className="w-full border border-[#dfe3ea]">

        <Frame className="w-full">

          {/* BILL TO */}
          <Frame className="flex-1 flex-col border-r border-[#dfe3ea] px-[4mm] py-[3mm]">

            <Paragraph
              size="xxs"
              weight="bold"
              color="accent"
              specificStyle={{ color: "#32064f" }}
            >
              BILL TO
            </Paragraph>

            <Paragraph
              size="sm"
              color="textColor1"
              weight="semiBold"
              specificStyle={{
                color: "#1b1b1b",
                lineHeight: "sm",
              }}
            >
              {invoiceDraft.customer || EMPTY_VALUE}
            </Paragraph>

            <Paragraph
              size="xs"
              color="textColor2"
              specificStyle={{ color: "#4f4f4f" }}
            >
              {invoiceDraft.customerEmail || EMPTY_VALUE}
            </Paragraph>

            <Paragraph
              size="xs"
              color="textColor2"
              specificStyle={{ color: "#4f4f4f" }}
            >
              {invoiceDraft.customerAddress || EMPTY_VALUE}
            </Paragraph>

          </Frame>

          {/* PAYMENT DETAILS */}
          <Frame className="w-[80mm] flex-col px-[4mm] py-[3mm]">

            <Paragraph
              size="xxs"
              weight="bold"
              color="accent"
              specificStyle={{ color: "#32064f" }}
            >
              PAYMENT DETAILS
            </Paragraph>

            <Frame className="mt-[1mm] flex-col gap-[1px]">

              <Frame className="gap-[var(--space-md)]">
                <Paragraph
                  size="xs"
                  weight="medium"
                  color="textColor1"
                  className="w-[28mm]"
                  specificStyle={{ color: "#1b1b1b" }}
                >
                  Bank Name:
                </Paragraph>

                <Paragraph
                  size="xs"
                  color="textColor2"
                  specificStyle={{ color: "#4f4f4f" }}
                >
                  {EMPTY_VALUE}
                </Paragraph>
              </Frame>

              <Frame className="gap-[var(--space-md)]">
                <Paragraph
                  size="xs"
                  weight="medium"
                  color="textColor1"
                  className="w-[28mm]"
                  specificStyle={{ color: "#1b1b1b" }}
                >
                  Account Name:
                </Paragraph>

                <Paragraph
                  size="xs"
                  color="textColor2"
                  specificStyle={{ color: "#4f4f4f" }}
                >
                  {businessName}
                </Paragraph>
              </Frame>

              <Frame className="gap-[var(--space-md)]">
                <Paragraph
                  size="xs"
                  weight="medium"
                  color="textColor1"
                  className="w-[28mm]"
                  specificStyle={{ color: "#1b1b1b" }}
                >
                  Account Number:
                </Paragraph>

                <Paragraph
                  size="xs"
                  color="textColor2"
                  specificStyle={{ color: "#4f4f4f" }}
                >
                  {EMPTY_VALUE}
                </Paragraph>
              </Frame>

              <Frame className="gap-[var(--space-md)]">
                <Paragraph
                  size="xs"
                  weight="medium"
                  color="textColor1"
                  className="w-[28mm]"
                  specificStyle={{ color: "#1b1b1b" }}
                >
                  Sort Code:
                </Paragraph>

                <Paragraph
                  size="xs"
                  color="textColor2"
                  specificStyle={{ color: "#4f4f4f" }}
                >
                  {EMPTY_VALUE}
                </Paragraph>
              </Frame>

              <Frame className="gap-[var(--space-md)]">
                <Paragraph
                  size="xs"
                  weight="medium"
                  color="textColor1"
                  className="w-[28mm]"
                  specificStyle={{ color: "#1b1b1b" }}
                >
                  Reference:
                </Paragraph>

                <Paragraph
                  size="xs"
                  color="textColor2"
                  specificStyle={{ color: "#4f4f4f" }}
                >
                  {EMPTY_VALUE}
                </Paragraph>
              </Frame>

            </Frame>
          </Frame>

        </Frame>
      </Frame>

      {/* ITEMS */}
      <Frame className="mt-[5mm] w-full">
        <InvoiceTable />
      </Frame>

      {/* BOTTOM AREA */}
      <Frame className="mt-[5mm] w-full items-start justify-between">

        {/* NOTES */}
        <Frame className="flex-col pr-[8mm]">

          <Paragraph
            size="sm"
            weight="bold"
            color="textColor1"
            specificStyle={{ color: "#1b1b1b" }}
          >
            Notes
          </Paragraph>

          <Paragraph
            size="xs"
            color="textColor2"
            specificStyle={{ color: "#4f4f4f" }}
          >
            Payment is due within 14 days from the invoice date.
          </Paragraph>

          <Paragraph
            size="xs"
            color="textColor2"
            specificStyle={{ color: "#4f4f4f" }}
          >
            Please use the invoice number as the payment reference.
          </Paragraph>

          <Paragraph
            size="xs"
            color="textColor2"
            specificStyle={{ color: "#4f4f4f" }}
          >
            For questions, contact us at {businessEmail}.
          </Paragraph>

        </Frame>

        {/* TOTALS */}
        <Frame className="w-[70mm] flex-col">

          <Frame className="w-full items-center justify-between">
            <Paragraph
              size="xs"
              weight="medium"
              color="textColor1"
              specificStyle={{ color: "#1b1b1b" }}
            >
              Subtotal
            </Paragraph>

            <Paragraph
              size="xs"
              weight="medium"
              color="textColor1"
              specificStyle={{ color: "#1b1b1b" }}
            >
              {formatCurrency(subtotal, currencySymbol)}
            </Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph
              size="xs"
              color="textColor2"
              specificStyle={{ color: "#4f4f4f" }}
            >
              Discount ({discountRate}%)
            </Paragraph>

            <Paragraph
              size="xs"
              color="textColor1"
              specificStyle={{ color: "#1b1b1b" }}
            >
              - {formatCurrency(discount, currencySymbol)}
            </Paragraph>
          </Frame>

          <Frame className="w-full items-center justify-between">
            <Paragraph
              size="xs"
              color="textColor2"
              specificStyle={{ color: "#4f4f4f" }}
            >
              VAT ({vatRate}%)
            </Paragraph>

            <Paragraph
              size="xs"
              color="textColor1"
              specificStyle={{ color: "#1b1b1b" }}
            >
              {formatCurrency(vat, currencySymbol)}
            </Paragraph>
          </Frame>

          <Frame className="mt-[2mm] w-full items-center justify-between border-t-2 border-[#32064f] pt-[2mm]">

            <Paragraph
              size="md"
              weight="bold"
              color="accent"
              specificStyle={{ color: "#32064f" }}
            >
              Total
            </Paragraph>

            <Paragraph
              size="md"
              weight="bold"
              color="accent"
              specificStyle={{ color: "#32064f" }}
            >
              {formatCurrency(total, currencySymbol)}
            </Paragraph>

          </Frame>

        </Frame>

      </Frame>

      {/* FOOTER */}
      <Frame className="mt-[6mm] w-full items-center justify-between border-t border-[#dfe3ea] pt-[3mm]">

        <Paragraph
          size="xxs"
          color="muted"
          specificStyle={{ color: "#7a7a7a" }}
        >
          Thank you for your business.
        </Paragraph>

        <Paragraph
          size="xxs"
          weight="medium"
          color="accent"
          className="uppercase tracking-[0.12em]"
          specificStyle={{ color: "#32064f" }}
        >
          {businessName}
        </Paragraph>

      </Frame>

    </Frame>
  );
}