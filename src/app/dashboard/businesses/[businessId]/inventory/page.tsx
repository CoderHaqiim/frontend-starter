"use client"

import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import Table from "@/src/components/base/ui/composites/table"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { getInventory, inventoryQueryKey } from "@/src/services/inventoryService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function InventoryPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const [selectedInventoryFilter, setSelectedInventoryFilter] = useState("all")
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { data: inventoryItems = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: inventoryQueryKey(businessId),
    queryFn: () => getInventory(businessId),
    enabled: Boolean(businessId),
  })
  const availableInventoryItems = inventoryItems

  const inventoryKpis = useMemo(() => {
    const totalStockUnits = availableInventoryItems.reduce((total, item) => total + Number(item.Stock), 0)
    const lowStockItems = availableInventoryItems.filter((item) => item.Status === "Low stock")
    const outOfStockItems = availableInventoryItems.filter((item) => item.Status === "Out of stock")

    return [
      {
        id: "items",
        title: "Total items",
        value: String(availableInventoryItems.length),
        meaning: "Items currently tracked",
      },
      {
        id: "stockUnits",
        title: "Stock units",
        value: String(totalStockUnits),
        meaning: "Total units currently in stock",
      },
      {
        id: "lowStock",
        title: "Low stock",
        value: String(lowStockItems.length),
        meaning: "Items needing attention",
      },
      {
        id: "outOfStock",
        title: "Out of stock",
        value: String(outOfStockItems.length),
        meaning: "Items unavailable",
      },
    ]
  }, [availableInventoryItems])

  const filteredItems = useMemo(() => {
    if (selectedInventoryFilter === "all") return availableInventoryItems

    return availableInventoryItems.filter(
      (item) => item.Status.toLowerCase().replace(" ", "-") === selectedInventoryFilter
    )
  }, [availableInventoryItems, selectedInventoryFilter])

  const handleInventoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInventoryFilter(event.target.value)
  }

  const createInventoryItem = () => {
    setBackdropOpen(true)
    setBackdropContent("create-inventory-item-form")
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
            func={createInventoryItem}
          >
            Add inventory item
          </Button>
        </Frame>
      </Frame>

    <Section>
      <KpiRow kpis={inventoryKpis} isLoading={isInventoryLoading} itemsCount={4} />
    </Section>

      <Section width="stretch">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="lg" type="h2">Inventory items</Heading>

            <Dropdown
              name="inventoryFilter"
              defaultValue="all"
              width="110px"
              value={selectedInventoryFilter}
              options={["all", "in-stock", "low-stock", "out-of-stock"]}
              size="sm"
              formFunc={handleInventoryFilterChange}
            />
          </Frame>

          <Frame className="w-full h-max">
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
