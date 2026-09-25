import { ObjectRecordType } from "@/src/types/types"
import { createMockStore } from "@/src/utils/mockStore"

export const getInventoryStatus = (stock: string | number): string => {
  const parsedStock = Number(stock)

  if (Number.isNaN(parsedStock)) return "in stock"
  if (parsedStock === 0) return "out of stock"
  if (parsedStock < 10) return "low stock"

  return "in stock"
}

const seedInventoryByBusinessId: Record<string, ObjectRecordType[]> = {
  "0": [
    { Item: "Premium Coffee Beans", SKU: "COF-001", Category: "Beverages", Stock: "42" },
    { Item: "Organic Green Tea", SKU: "TEA-014", Category: "Beverages", Stock: "8" },
    { Item: "Ceramic Mug", SKU: "MUG-008", Category: "Accessories", Stock: "6" },
    { Item: "Gift Box - Medium", SKU: "GFT-021", Category: "Packaging", Stock: "0" },
    { Item: "Vanilla Syrup", SKU: "SYR-006", Category: "Ingredients", Stock: "14" },
  ],
  "1": [
    { Item: "Cement 50kg", SKU: "CEM-050", Category: "Cement", Stock: "860" },
    { Item: "Concrete Blocks", SKU: "BLK-100", Category: "Building materials", Stock: "120" },
    { Item: "Rebar 12mm", SKU: "REB-012", Category: "Steel", Stock: "0" },
  ],
  "2": [
    { Item: "Wireless Keyboard", SKU: "KEY-101", Category: "Accessories", Stock: "35" },
    { Item: "Wireless Mouse", SKU: "MOU-202", Category: "Accessories", Stock: "7" },
    { Item: "Laptop Stand", SKU: "STD-303", Category: "Hardware", Stock: "18" },
  ],
  "3": [
    { Item: "Maize Seed", SKU: "SEED-001", Category: "Seeds", Stock: "74" },
    { Item: "Organic Fertilizer", SKU: "FERT-014", Category: "Fertilizer", Stock: "9" },
    { Item: "Irrigation Hose", SKU: "HOSE-008", Category: "Equipment", Stock: "0" },
  ],
  "4": [
    { Item: "Cotton T-Shirt", SKU: "TSH-001", Category: "Clothing", Stock: "58" },
    { Item: "Denim Jeans", SKU: "JNS-014", Category: "Clothing", Stock: "11" },
    { Item: "Canvas Sneakers", SKU: "SNK-008", Category: "Footwear", Stock: "24" },
  ],
}

// One shared copy of the store per server process, so every inventory route reads
// and mutates the same arrays.
export const inventoryByBusinessId = createMockStore(
  "inventoryByBusinessIdStore",
  seedInventoryByBusinessId
)
