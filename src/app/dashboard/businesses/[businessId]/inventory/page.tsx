"use client"

import ImportModal from "@/src/components/app/import/importModal"
import InventoryHeader from "@/src/components/app/inventoryHeader"
import InventoryLine from "@/src/components/app/inventoryLine"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import EmptyState from "@/src/components/base/ui/composites/emptyState"
import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { deleteInventoryItem, getInventory, inventoryQueryKey } from "@/src/services/inventoryService"
import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { ObjectRecordType, ToastType } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function InventoryPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const [selectedInventoryFilter, setSelectedInventoryFilter] = useState("all")
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const queryClient = useQueryClient()

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const handleDeleteInventoryItem = async (sku: string) => {
    try {
      await deleteInventoryItem(businessId, sku)

      // The row leaves the cached table straight away, and the table and the KPI
      // cards refetch.
      queryClient.setQueryData<ObjectRecordType[]>(inventoryQueryKey(businessId), (currentItems = []) =>
        currentItems.filter((item) => item.SKU !== sku)
      )
      queryClient.invalidateQueries({ queryKey: inventoryQueryKey(businessId) })

      showToast({
        variant: "success",
        title: "Item deleted",
        message: `Item ${sku} was deleted successfully.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The item could not be deleted. Please try again.",
      })
    }
  }
  const { data: inventoryItems = [], isLoading: isInventoryLoading } = useQuery({
    queryKey: inventoryQueryKey(businessId),
    queryFn: () => getInventory(businessId),
    enabled: Boolean(businessId),
  })
  const availableInventoryItems = inventoryItems

  const inventoryKpis = useMemo(() => {
    const totalStockUnits = availableInventoryItems.reduce((total, item) => total + Number(item.Stock), 0)
    const lowStockItems = availableInventoryItems.filter((item) => item.Status === "low stock")
    const outOfStockItems = availableInventoryItems.filter((item) => item.Status === "out of stock")

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

  const importInventory = () => {
    setBackdropOpen(true)
    setBackdropContent(<ImportModal definitionId="inventory" businessId={businessId} />)
  }

  return (
    <Frame className="w-full h-max flex flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Inventory</Heading>
            <Paragraph size="sm" weight="light">
              Track stock levels, inventory value and items that need attention.
            </Paragraph>
          </Frame>

          <Frame className="gap-[var(--space-sm)]">
            <Button variant="outline" size="sm" iconName="icon-download" iconColor="accent" func={importInventory}
              specificStyles={{
                color: "var(--color-accent)",
                borderColor: "var(--color-accent)",
              }}
            >
              Import Inventory
            </Button>
            <Button variant="fill" size="sm" iconPosition="left" iconName="icon-plus" func={createInventoryItem}>
              Add inventory item
            </Button>
          </Frame>
        </Frame>
      </Section>

      <Section>
        <KpiRow kpis={inventoryKpis} isLoading={isInventoryLoading} itemsCount={4} />
      </Section>

      <Section>
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
            {filteredItems.length > 0 ? (
              <List width="stretch" height="stretch" scroll="hidden">
                <InventoryHeader />
                {filteredItems.map((item) => (
                  <InventoryLine
                    key={item.SKU}
                    item={item}
                    onDelete={handleDeleteInventoryItem}
                  />
                ))}
              </List>
            ) : (
              <EmptyState message="When you add inventory items, they appear here." />
            )}
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
