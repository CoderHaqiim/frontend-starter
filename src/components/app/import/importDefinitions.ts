import {
  createCustomer,
  customerKpisQueryKey,
  customersQueryKey,
  quickAccessCustomersQueryKey,
} from "@/src/services/customerService"
import { createInventoryItem, inventoryQueryKey } from "@/src/services/inventoryService"
import {
  businessTransactionsPrefixQueryKey,
  createBusinessTransaction,
  recentBusinessTransactionsPrefixQueryKey,
} from "@/src/services/transactionService"
import {
  emailFormat,
  isoDate,
  oneOf,
  phoneFormat,
  positiveAmount,
  skuFormat,
  stripNumberSeparators,
  wholeNumber,
  type ImportDefinition,
  type ImportId,
} from "@/src/utils/importValidation"

// The import system reads its columns, rules and destination from these three
// definitions, so a new import type only has to be described here.

// The choices the create routes accept. A file that uses any other value is
// reported before anything is sent.
const customerTypes = ["individual", "company"]
const customerStatuses = ["active", "watchlist", "inactive"]
const transactionTypes = ["income", "expense"]
const transactionStatuses = ["completed", "pending", "cancelled"]

// The routes store choices lowercase, so the accepted spellings are sent that way.
const lowerCase = (value: string) => value.trim().toLowerCase()

const customersImport: ImportDefinition = {
  id: "customers",
  title: "Customers",
  singular: "customer",
  templateFileName: "customers-import-template",
  worksheetName: "Customers",
  columns: [
    { header: "Customer Name", key: "name", aliases: ["Name"], required: true, example: "John Doe" },
    {
      header: "Customer Type",
      key: "type",
      aliases: ["Type"],
      required: true,
      example: "individual",
      validate: oneOf(customerTypes),
      transform: lowerCase,
    },
    {
      header: "Email",
      key: "email",
      required: true,
      example: "john.doe@example.com",
      validate: emailFormat,
    },
    {
      header: "Phone",
      key: "phone",
      required: true,
      example: "+234 801 234 5678",
      validate: phoneFormat,
    },
    { header: "Company Name", key: "companyName", example: "BrightWorks Ltd" },
    {
      header: "Status",
      key: "status",
      example: "active",
      validate: oneOf(customerStatuses),
      transform: lowerCase,
    },
    { header: "City", key: "city", example: "Lagos" },
    { header: "State / Region", key: "stateRegion", aliases: ["State"], example: "Lagos" },
    { header: "Country", key: "country", example: "Nigeria" },
  ],
  importRow: (businessId, row) => createCustomer(businessId, row),
  // The directory, its KPI cards and the quick access cards all show customers.
  queryKeys: (businessId) => [
    customersQueryKey(businessId),
    customerKpisQueryKey(businessId),
    quickAccessCustomersQueryKey(businessId),
  ],
}

const inventoryImport: ImportDefinition = {
  id: "inventory",
  title: "Inventory",
  singular: "inventory item",
  templateFileName: "inventory-import-template",
  worksheetName: "Inventory",
  columns: [
    {
      header: "Item Name",
      key: "itemName",
      aliases: ["Item", "Name"],
      required: true,
      example: "Premium Coffee Beans",
    },
    { header: "SKU", key: "sku", required: true, example: "COF-001", validate: skuFormat },
    { header: "Category", key: "category", example: "Beverages" },
    {
      header: "Stock",
      key: "stock",
      required: true,
      example: "42",
      validate: wholeNumber,
      transform: stripNumberSeparators,
    },
  ],
  importRow: (businessId, row) => createInventoryItem(businessId, row),
  queryKeys: (businessId) => [inventoryQueryKey(businessId)],
}

const transactionsImport: ImportDefinition = {
  id: "transactions",
  title: "Transactions",
  singular: "transaction",
  templateFileName: "transactions-import-template",
  worksheetName: "Transactions",
  columns: [
    {
      header: "Date",
      key: "date",
      aliases: ["Transaction Date"],
      required: true,
      example: "2026-01-31",
      validate: isoDate,
    },
    { header: "Description", key: "description", required: true, example: "Customer payment" },
    { header: "Customer", key: "customer", example: "John Doe" },
    {
      header: "Type",
      key: "type",
      required: true,
      example: "income",
      validate: oneOf(transactionTypes),
      transform: lowerCase,
    },
    {
      header: "Status",
      key: "status",
      example: "completed",
      validate: oneOf(transactionStatuses),
      transform: lowerCase,
    },
    { header: "Category", key: "category", example: "Sales" },
    {
      header: "Amount",
      key: "amount",
      required: true,
      example: "15000",
      validate: positiveAmount,
      transform: stripNumberSeparators,
    },
  ],
  importRow: (businessId, row) => createBusinessTransaction(businessId, row),
  // Every cached page of the list and the recent transactions card show these.
  queryKeys: (businessId) => [
    businessTransactionsPrefixQueryKey(businessId),
    recentBusinessTransactionsPrefixQueryKey(businessId),
  ],
}

export const importDefinitions: Record<ImportId, ImportDefinition> = {
  customers: customersImport,
  inventory: inventoryImport,
  transactions: transactionsImport,
}

// The headers and the example row a template carries, in column order.
export function getTemplateRows(definition: ImportDefinition) {
  return {
    headers: definition.columns.map((column) => column.header),
    exampleRow: definition.columns.map((column) => column.example ?? ""),
  }
}
