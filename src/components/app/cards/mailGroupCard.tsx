"use client"

import { customers } from "@/src/data/customers"
import { useMailGroupState } from "@/src/store/mailGroupState"
import { useState } from "react"
import Badge from "../../ui/composites/badge"
import Card from "../../ui/composites/card"
import List from "../../ui/composites/list"
import Button from "../../ui/primitives/button"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"

export default function MailGroupCard() {
  const { mailGroups, addMailGroup } = useMailGroupState()
  const [groupName, setGroupName] = useState("")
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])

  function toggleCustomer(customerId: string) {
    setSelectedCustomerIds((customerIds) =>
      customerIds.includes(customerId)
        ? customerIds.filter((id) => id !== customerId)
        : [...customerIds, customerId]
    )
  }

  function createGroup() {
    const trimmedName = groupName.trim()

    if (!trimmedName || selectedCustomerIds.length === 0) {
      return
    }

    addMailGroup({
      id: `group-${Date.now()}`,
      name: trimmedName,
      customerIds: selectedCustomerIds,
    })
    setGroupName("")
    setSelectedCustomerIds([])
  }

  return (
    <Card
      width="320px"
      height="hug"
      padding="lg"
    >
      <Frame className="flex w-full flex-col gap-[var(--space-md)]">
        <Frame className="flex w-full items-center justify-between">
          <Heading size="sm" type="h2">
            Create Mail Group
          </Heading>
        </Frame>

        <Frame className="flex w-full flex-col gap-[var(--space-xs)]">
          <input
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            placeholder="Group name"
            className="h-9 rounded-[var(--radius-sm)] border border-[var(--color-outline1)] px-3 text-[length:var(--bodySize-xs)] outline-none hover:border-[var(--color-accent)]"
          />
        </Frame>

        <Frame className="flex w-full items-center justify-between">
          <Paragraph
            size="sm"
            weight="normal"
            color="textColor1"
          >
            Selected Customers
          </Paragraph>

          <Badge
            color="accent"
            size="xs"
            text={String(selectedCustomerIds.length)}
          />
        </Frame>

        <Frame
          className="flex h-[200px] w-full flex-col gap-[var(--space-xs)] pr-1"
        >
          <List scroll="hidden">
            {customers.map((customer) => (
              <Frame
                key={customer.id}
                className="flex items-center justify-between p-[var(--space-md)]"
              >
                <span className="min-w-0">
                  <Paragraph
                    size="xs"
                    weight="medium"
                    color="textColor1"
                  >
                    {customer.email}
                  </Paragraph>

                  <Paragraph size="xxs">
                    {customer.name}
                  </Paragraph>
                </span>

                <input
                  type="checkbox"
                  checked={selectedCustomerIds.includes(customer.id)}
                  onChange={() => toggleCustomer(customer.id)}
                />
              </Frame>
            ))}
          </List>
        </Frame>

        <Button
          variant="outline"
          size="sm"
          width="stretch"
          func={createGroup}
        >
          Create Group
        </Button>
      </Frame>
    </Card>
  )
}