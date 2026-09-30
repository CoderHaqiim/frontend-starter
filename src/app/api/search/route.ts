import { NextResponse } from "next/server"
import { account } from "@/src/data/account"
import { businesses } from "@/src/data/businesses"
import { businessCustomers, customers } from "@/src/data/customers"
import { inventoryByBusinessId } from "@/src/data/inventory"
import { invoices } from "@/src/data/invoices"
import { receipts } from "@/src/data/receipts"
import { schedules } from "@/src/data/schedules"
import { helpCategories } from "@/src/data/supportHelp"
import { tasks } from "@/src/data/tasks"
import { transactions } from "@/src/data/transactions"
import { badRequestResponse } from "@/src/utils/mockApi"

/*
 * The one search route Aiki calls, scoped by the page it is used on: `q` is the
 * query and `page` names the data that page lists, so a search only ever looks
 * at the records belonging to the page it was made from and never at the rest
 * of the app. It follows the rest of the mock backend — the route reads the data
 * arrays the app already keeps and filters them inline, with no extra layers
 * between the request and the store.
 *
 * A page that keeps no store of its own (mailing holds its records in the page
 * itself) is not listed below and answers with no results rather than widening
 * the search to another page's data.
 */
type SearchScope = {
  records: unknown[]
  fields: string[]
}

// The fields each page's records are searched on — every one of them a field the
// store actually holds.
const businessFields = [
  "businessName",
  "tagLine",
  "description",
  "email",
  "phone",
  "industry",
  "country",
  "state",
]
const transactionFields = ["description", "customer", "category", "type", "status"]
const taskFields = ["title", "description", "priority", "status"]

function getSearchScope(page: string): SearchScope | null {
  switch (page) {
    // The General page lists the businesses the dashboard reports on, with the
    // calendar of schedules beside them.
    case "general":
      return {
        records: [...businesses, ...schedules],
        fields: [...businessFields, "title", "location"],
      }
    // The overview page is built around one business record and lists the
    // business's recent transactions and tasks beside its figures.
    case "overview":
      return {
        records: [...businesses, ...transactions, ...tasks],
        fields: [...businessFields, ...transactionFields, "title", "priority"],
      }
    case "businesses":
      return { records: businesses, fields: businessFields }
    case "customers":
      return {
        records: [...customers, ...Object.values(businessCustomers).flat()],
        fields: ["name", "email", "phone", "companyName", "customerType", "status", "city"],
      }
    case "transactions":
      return { records: transactions, fields: transactionFields }
    case "tasks":
      return { records: tasks, fields: taskFields }
    case "inventory":
      return {
        records: Object.values(inventoryByBusinessId).flat(),
        fields: ["Item", "SKU", "Category"],
      }
    case "invoices":
      return {
        records: invoices,
        fields: ["id", "customer.name", "customer.email", "customer.paymentStatus"],
      }
    case "receipts":
      return {
        records: receipts,
        fields: ["id", "customer.name", "customer.email", "customer.paymentStatus"],
      }
    case "schedules":
      return {
        records: schedules,
        fields: ["title", "description", "type", "status", "location"],
      }
    // The support page lists its categories and the articles inside them.
    case "support":
      return {
        records: [...helpCategories, ...helpCategories.flatMap((category) => category.articles)],
        fields: ["title", "description"],
      }
    // The settings page shows the profile of the signed in user.
    case "settings":
      return {
        records: [account],
        fields: ["userName", "firstName", "lastName", "email", "phone"],
      }
    default:
      return null
  }
}

// Reads the field a record carries, following a dotted path into a nested
// record such as an invoice's customer.
function readField(record: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (typeof value !== "object" || value === null) {
      return undefined
    }

    return (value as Record<string, unknown>)[key]
  }, record)
}

// Matching is case-insensitive, so john, John and JoHn answer the same records.
function matchesQuery(value: unknown, query: string): boolean {
  if (value === null || value === undefined) {
    return false
  }

  return String(value).toLowerCase().includes(query)
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const query = (searchParams.get("q") ?? "").trim()
  const page = searchParams.get("page") ?? ""

  if (!query) {
    return badRequestResponse("q is required")
  }

  const scope = getSearchScope(page)
  const lowerCasedQuery = query.toLowerCase()

  const results = scope
    ? scope.records.filter((record) =>
        scope.fields.some((field) => matchesQuery(readField(record, field), lowerCasedQuery))
      )
    : []

  return NextResponse.json({
    message: "Search results retrieved successfully",
    data: results,
  })
}