import { businesses } from "@/src/data/businesses"
import type { LineItem } from "@/src/types/types"
import { roundAmount } from "@/src/utils/amount"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { formatCurrency } from "@/src/utils/formatCurrency"
import { NextResponse } from "next/server"

/*
 * Helpers shared by the mock resource routes that live under
 * /api/businesses/[businessId]. They keep the handlers short and the answers
 * (status codes and message shapes) identical across the resources.
 */

export function findBusiness(businessId: string) {
  return businesses.find((business) => business.id === businessId)
}

export function badRequestResponse(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

export function missingQueryParamResponse(param: string) {
  return NextResponse.json(
    { message: `${param} query parameter is required` },
    { status: 400 },
  )
}

export function businessNotFoundResponse() {
  return NextResponse.json({ message: "Business not found" }, { status: 404 })
}

export function recordNotFoundResponse(resource: string, id: string) {
  return NextResponse.json(
    { message: `${resource} ${id} was not found` },
    { status: 404 },
  )
}

// Reads a JSON body and answers undefined when it is missing or malformed, so a
// handler can reply 400 without a try/catch of its own.
export async function readBody(request: Request): Promise<Record<string, unknown> | undefined> {
  try {
    const body = await request.json()

    return typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : undefined
  } catch {
    return undefined
  }
}

export const toText = (value: unknown) => (typeof value === "string" ? value.trim() : "")

// Every string that is stored is lowercased, so the mock stores hold one casing
// for anything that was typed into a form.
export const normalizeText = (value: unknown) => toText(value).toLowerCase()

// Matches a typed value against the stored choices regardless of casing and
// answers the canonical choice, so "Company", "company" and "COMPANY" all become
// "company" instead of being rejected.
export function matchChoice(value: unknown, choices: readonly string[]) {
  const candidate = normalizeText(value)

  return choices.find((choice) => choice === candidate) ?? null
}

export const toNumber = (value: unknown) => {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
}

export const readQueryParam = (request: Request, param: string) =>
  new URL(request.url).searchParams.get(param)

// Matches the dates stored on the seeded invoices and receipts, e.g. "Aug 12, 2026".
export const toDisplayDate = (date = new Date()) =>
  date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })

// Matches the formatted amounts stored on the seeded invoices and receipts, e.g. "$2,257.50".
export const toDisplayAmount = (currency: string, amount: number) =>
  formatCurrency(roundAmount(amount), getCurrencySymbol(currency))

// Turns the line items a form sends into stored items. The amount is derived from
// the quantity and price whenever it was not sent, matching the create forms which
// treat quantity and price as the source values.
export function normalizeLineItems(items: unknown): LineItem[] {
  if (!Array.isArray(items)) return []

  return items.map((item, index) => {
    const line = (item ?? {}) as Record<string, unknown>
    const quantity = toNumber(line.quantity)
    const price = toNumber(line.price)
    const amount = roundAmount(toNumber(line.amount) || quantity * price)

    return {
      id: toText(line.id) || `item-${index + 1}`,
      name: normalizeText(line.name),
      description: normalizeText(line.description),
      quantity,
      price: roundAmount(price),
      amount,
    }
  })
}

// Reads the first field that carries a value, so a route can accept both the
// stored casing ("Item") and the casing the create form sends ("itemName").
export function readField(body: Record<string, unknown>, ...names: string[]) {
  for (const name of names) {
    const value = toText(body[name])

    if (value) return value
  }

  return ""
}
