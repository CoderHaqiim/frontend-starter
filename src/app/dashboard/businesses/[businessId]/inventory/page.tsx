"use client"

import { useMemo, useState } from "react"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Button from "@/src/components/ui/primitives/button"
import Section from "@/src/components/layout/section"
import Table from "@/src/components/ui/composites/table"
import KpiRow from "@/src/components/ui/composites/kpiRow"
import Dropdown from "@/src/components/ui/composites/dropdown"
import { ObjectRecordType } from "@/src/types/types"

const inventoryKpis = [
  { id: "items", title: "Total items", value: "128", meaning: "Items currently tracked" },
  { id: "value", title: "Inventory value", value: "$42,680", meaning: "Estimated stock value" },
  { id: "lowStock", title: "Low stock", value: "9", meaning: "Items needing attention" },
  { id: "outOfStock", title: "Out of stock", value: "3", meaning: "Items unavailable" },
]

const inventoryItems:ObjectRecordType[] = [
  { Item: "Premium Coffee Beans", SKU: "COF-001", Category: "Beverages", Stock: "42", "Reorder level": "15", Status: "In stock" },
  { Item: "Organic Green Tea", SKU: "TEA-014", Category: "Beverages", Stock: "8", "Reorder level": "12", Status: "Low stock" },
  { Item: "Ceramic Mug", SKU: "MUG-008", Category: "Accessories", Stock: "6", "Reorder level": "20", Status: "In stock" },
  { Item: "Gift Box - Medium", SKU: "GFT-021", Category: "Packaging", Stock: "0", "Reorder level": "10", Status: "Out of stock" },
  { Item: "Vanilla Syrup", SKU: "SYR-006", Category: "Ingredients", Stock: "14", "Reorder level": "15", Status: "Low stock" },
]

export default function InventoryPage() {
  const [selectedInventoryFilter, setSelectedInventoryFilter] = useState("all")

  const filteredItems = useMemo(() => {
    if (selectedInventoryFilter === "all") return inventoryItems

    return inventoryItems.filter(
      (item) => item.Status.toLowerCase().replace(" ", "-") === selectedInventoryFilter
    )
  }, [selectedInventoryFilter])

  const handleInventoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInventoryFilter(event.target.value)
  }

  return (
    <Frame className="w-full h-max flex flex-col gap-[var(--space-lg)]">
      <Frame className="w-full h-max flex justify-between">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Inventory</Heading>
          <Paragraph size="sm" weight="light">
            Track stock levels, inventory value and items that need attention.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            Add inventory item
          </Button>
        </Frame>
      </Frame>

      <KpiRow kpis={inventoryKpis} />

      <Section width="stretch">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="lg" type="h2">Inventory items</Heading>

            <Dropdown
              name="inventoryFilter"
              defaultValue="all"
              value={selectedInventoryFilter}
              options={["all", "in-stock", "low-stock", "out-of-stock"]}
              size="sm"
              formFunc={handleInventoryFilterChange}
            />
          </Frame>

          <Frame className="w-full h-full overflow-hidden">
            <Table
              width="stretch"
              cellWidth="180px"
              height="hug"
              size="sm"
              data={filteredItems}
            />
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}