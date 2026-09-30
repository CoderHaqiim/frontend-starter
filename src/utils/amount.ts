import type { LineItem } from "@/src/types/types"

/*
 * The money helpers the invoice and receipt drafts, the routes that store them
 * and the documents that print them all share. Keeping the arithmetic in one
 * place means a total worked out on a form, on a route and on a document always
 * agrees.
 */

// Money is kept to two decimals wherever it is derived, so a stored figure
// always matches the amount the forms and documents show.
export const roundAmount = (amount: number) => Math.round(amount * 100) / 100

// Reads a formatted amount such as "₦2,257.50" back into a number, so a stored
// total can be worked on again.
export const parseAmount = (amount: string) =>
  Number(amount.replace(/[^0-9.-]+/g, ""))

// The amount of a line item. Quantity and price are the source values, so the
// amount is never typed in by hand.
export const getItemAmount = (item: Pick<LineItem, "quantity" | "price">) =>
  item.quantity * item.price

// The subtotal of a set of line items, which is the sum of their amounts.
export const sumLineItems = (items: Pick<LineItem, "amount">[]) =>
  roundAmount(items.reduce((total, item) => total + item.amount, 0))
