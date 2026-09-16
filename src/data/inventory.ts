import { ObjectRecordType } from "@/src/types/types"

export const inventoryByBusinessId: Record<string, ObjectRecordType[]> = {
  "0": [
    { Item: "Premium Coffee Beans", SKU: "COF-001", Category: "Beverages", Stock: "42", Status: "In stock" },
    { Item: "Organic Green Tea", SKU: "TEA-014", Category: "Beverages", Stock: "8", Status: "Low stock" },
    { Item: "Ceramic Mug", SKU: "MUG-008", Category: "Accessories", Stock: "6", Status: "In stock" },
    { Item: "Gift Box - Medium", SKU: "GFT-021", Category: "Packaging", Stock: "0", Status: "Out of stock" },
    { Item: "Vanilla Syrup", SKU: "SYR-006", Category: "Ingredients", Stock: "14", Status: "Low stock" },
  ],
  "1": [
    { Item: "Cement 50kg", SKU: "CEM-050", Category: "Cement", Stock: "860", Status: "In stock" },
    { Item: "Concrete Blocks", SKU: "BLK-100", Category: "Building materials", Stock: "120", Status: "Low stock" },
    { Item: "Rebar 12mm", SKU: "REB-012", Category: "Steel", Stock: "0", Status: "Out of stock" },
  ],
  "2": [
    { Item: "Wireless Keyboard", SKU: "KEY-101", Category: "Accessories", Stock: "35", Status: "In stock" },
    { Item: "Wireless Mouse", SKU: "MOU-202", Category: "Accessories", Stock: "7", Status: "Low stock" },
    { Item: "Laptop Stand", SKU: "STD-303", Category: "Hardware", Stock: "18", Status: "In stock" },
  ],
  "3": [
    { Item: "Maize Seed", SKU: "SEED-001", Category: "Seeds", Stock: "74", Status: "In stock" },
    { Item: "Organic Fertilizer", SKU: "FERT-014", Category: "Fertilizer", Stock: "9", Status: "Low stock" },
    { Item: "Irrigation Hose", SKU: "HOSE-008", Category: "Equipment", Stock: "0", Status: "Out of stock" },
  ],
  "4": [
    { Item: "Cotton T-Shirt", SKU: "TSH-001", Category: "Clothing", Stock: "58", Status: "In stock" },
    { Item: "Denim Jeans", SKU: "JNS-014", Category: "Clothing", Stock: "11", Status: "Low stock" },
    { Item: "Canvas Sneakers", SKU: "SNK-008", Category: "Footwear", Stock: "24", Status: "In stock" },
  ],
}
