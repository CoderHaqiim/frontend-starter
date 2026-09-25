import { getInventoryStatus, inventoryByBusinessId } from "@/src/data/inventory"
import { ObjectRecordType } from "@/src/types/types"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
  missingQueryParamResponse,
  normalizeText,
  readBody,
  readField,
  readQueryParam,
  recordNotFoundResponse,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

// Inventory rows are plain records keyed by their column names:
// { Item, SKU, Category, Stock }. The SKU identifies an item, so update and delete
// read it from the `sku` query parameter, and the status column is always derived
// from the stock rather than stored.
const withStatus = (item: ObjectRecordType) => ({
  ...item,
  Status: getInventoryStatus(item.Stock),
})

// Creates the bucket for a business the first time an item is added to it.
const getBusinessInventory = (businessId: string) => {
  if (!inventoryByBusinessId[businessId]) {
    inventoryByBusinessId[businessId] = []
  }

  return inventoryByBusinessId[businessId]
}

const findItemIndex = (businessId: string, sku: string) =>
  (inventoryByBusinessId[businessId] ?? []).findIndex(
    (item) => item.SKU.toLowerCase() === sku.toLowerCase()
  )

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json((inventoryByBusinessId[businessId] ?? []).map(withStatus))
}

// Adds an item to a business. The create form sends itemName, sku, category and
// stock, while the stored records use Item, SKU, Category and Stock, so both
// casings are accepted.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const item = normalizeText(readField(body, "Item", "itemName", "item"))
  const sku = normalizeText(readField(body, "SKU", "sku"))

  if (!item) {
    return badRequestResponse("Item name is required")
  }

  if (!sku) {
    return badRequestResponse("SKU is required")
  }

  if (findItemIndex(businessId, sku) !== -1) {
    return NextResponse.json(
      { message: `An item with SKU ${sku} already exists for this business` },
      { status: 409 }
    )
  }

  const createdItem: ObjectRecordType = {
    Item: item,
    SKU: sku,
    Category: normalizeText(readField(body, "Category", "category")),
    Stock: readField(body, "Stock", "stock") || "0",
  }

  getBusinessInventory(businessId).push(createdItem)

  return NextResponse.json(
    { message: `Item ${sku} created successfully`, data: withStatus(createdItem) },
    { status: 201 }
  )
}

// Updates an item for a business. The item is identified by the `sku` query
// parameter, and the SKU itself can be renamed as long as the new one is unused.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const sku = readQueryParam(request, "sku")

  if (!sku) {
    return missingQueryParamResponse("sku")
  }

  const itemIndex = findItemIndex(businessId, sku)

  if (itemIndex === -1) {
    return recordNotFoundResponse("Item", sku)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const item = inventoryByBusinessId[businessId][itemIndex]
  const nextSku = normalizeText(readField(body, "SKU", "sku"))

  if (nextSku && nextSku.toLowerCase() !== item.SKU.toLowerCase()) {
    if (findItemIndex(businessId, nextSku) !== -1) {
      return NextResponse.json(
        { message: `An item with SKU ${nextSku} already exists for this business` },
        { status: 409 }
      )
    }

    item.SKU = nextSku
  }

  const nextItem = normalizeText(readField(body, "Item", "itemName", "item"))
  const nextCategory = normalizeText(readField(body, "Category", "category"))
  const nextStock = readField(body, "Stock", "stock")

  if (nextItem) item.Item = nextItem
  if (nextCategory) item.Category = nextCategory
  if (nextStock) item.Stock = nextStock

  return NextResponse.json({
    message: `Item ${item.SKU} updated successfully`,
    data: withStatus(item),
  })
}

// Removes an item from a business. The item is identified by the `sku` query
// parameter.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const sku = readQueryParam(request, "sku")

  if (!sku) {
    return missingQueryParamResponse("sku")
  }

  const itemIndex = findItemIndex(businessId, sku)

  if (itemIndex === -1) {
    return recordNotFoundResponse("Item", sku)
  }

  const [deletedItem] = inventoryByBusinessId[businessId].splice(itemIndex, 1)

  return NextResponse.json({
    message: `Item ${sku} deleted successfully`,
    data: withStatus(deletedItem),
  })
}
