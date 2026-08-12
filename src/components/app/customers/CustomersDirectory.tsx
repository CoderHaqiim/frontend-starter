"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import List from "@/src/components/ui/composites/list"
import Card from "@/src/components/ui/composites/card"
import { customers } from "./customerData"

export default function CustomersDirectory() {
  return (
    <Card padding="lg" rounded="md" width="300px" height="hug">
      <Frame width="stretch" height="hug" direction="column" gap="md">
        <Frame justify="space-between" align="center" width="stretch">
          <Heading type="h2" size="sm">Top Customers</Heading>
          <Paragraph size="xs" color="textColor1">{customers.length} profiles</Paragraph>
        </Frame>
        <List width="stretch" height="stretch" scroll="hidden">
          {customers.slice(0, 4).map((customer) => (
            <Frame
              key={customer.id}
              width="stretch"
              direction="column"
              padding="sm"
              gap="xs"
              rounded="sm"
            >
              <Paragraph size="sm" weight="medium">{customer.name}</Paragraph>
              <Paragraph size="xs" color="textColor1">{customer.email}</Paragraph>
              <Frame width="stretch" justify="space-between" align="center">
                <Paragraph size="xxs" color="textColor1">{customer.phone}</Paragraph>
                <Paragraph size="xxs" color="textColor1">{customer.address}</Paragraph>
              </Frame>
            </Frame>
          ))}
        </List>
      </Frame>
    </Card>
  )
}
