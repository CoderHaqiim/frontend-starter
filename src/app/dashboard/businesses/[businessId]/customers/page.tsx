"use client"

import KpiRow from "@/src/components/app/cards/kpiCard"
import KpiLoader from "@/src/components/app/cards/kpiLoader"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import Section from "@/src/components/layout/section"
import Dropdown from "@/src/components/ui/composites/dropdown"
import Table from "@/src/components/ui/composites/table"
import Button from "@/src/components/ui/primitives/button"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import { http } from "@/src/http/client"
import { useBackdropState } from "@/src/store/backdropState"
import { kpiObjectProps, ObjectRecordType } from "@/src/types/types"
import { useEffect, useState } from "react"

type CustomerKpiResponse = {
  kpis: kpiObjectProps[]
  accessCards: ObjectRecordType[]
}

export default function Home() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const [customers, setCustomers] = useState<ObjectRecordType[]>([])
  const [customerKpis, setCustomerKpis] = useState<CustomerKpiResponse>({
    kpis: [],
    accessCards: [],
  })
  const [isCustomerKpisLoading, setIsCustomerKpisLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("All")

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const customers = await http<ObjectRecordType[]>("/api/customers")
      setCustomers(customers)
    } catch {
      setCustomers([])
    }
  }

  fetchCustomers()
}, [])

  useEffect(() => {
    http<CustomerKpiResponse>("/api/customers/kpis")
      .then(setCustomerKpis)
      .catch(() => setCustomerKpis({ kpis: [], accessCards: [] }))
      .finally(() => setIsCustomerKpisLoading(false))
  }, [])

  const filteredCustomers = selectedStatus === "All"
    ? customers
    : customers.filter((customer) => customer.status === selectedStatus)

  const customerDirectoryTableData = filteredCustomers.map((customer) => ({
    "Customer ID": customer.id,
    "Customer name": customer.name,
    "Customer type": customer.customerType,
    "Company name": customer.companyName,
    "Status": customer.status,
    "Date added": customer.dateAdded,
    "Email": customer.email,
    "Phone number": customer.phone,
    "Website": customer.website,
    "Contact method": customer.preferredContactMethod,
    "Billing address": customer.billingAddress,
    "Address": customer.shippingServiceAddress,
    "City": customer.city,
    "State/Region": customer.stateRegion,
    "Country": customer.country,
    "Customer since": customer.customerSince,
    "Assigned to": customer.assignedPersonTeamMember,
    "Tags": customer.tags,
    "Notes": customer.notes,
  }))

  const createCustomer = () => {
    setBackdropOpen(true)
    setBackdropContent("create-customer-form")
  }

  return (
    <Frame className="w-full flex-col h-max gap-[var(--space-lg)]">
      <Frame className="w-full gap-[var(--space-xs)] justify-between h-max">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Customers</Heading>
          <Paragraph weight="light" size="sm">
            Track and manage your customers and their relationships with your business.
          </Paragraph>
        </Frame>
        <Frame>
            <Button variant="outline" iconName="icon-plus" size="sm" func={createCustomer}> Add Customer </Button>
        </Frame>
      </Frame>
      <Section>
        <Frame className="w-full h-[100px] gap-[var(--space-md)]">
          {isCustomerKpisLoading
            ? Array.from({ length: 4 }).map((_, index) => <KpiLoader key={index} />)
            : customerKpis.kpis.map((item) => <KpiRow key={item?.id} kpi={item} />)}
        </Frame>
      </Section>
      <Section width="stretch">
        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Frame className="mb-[var(--space-sm)]">
            <Heading size="md" type="h2">Quick Access Cards</Heading>
          </Frame>
         
            <Frame scroll="hidden" className="gap-[var(--space-md)]">
              {customerKpis.accessCards.map((customer) => ( <QuickAccessCard key={customer.id} entry={customer} />))}
            </Frame>
        </Frame>
      </Section>
      <Section width="stretch">
        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Frame className="mb-[var(--space-sm)] justify-between items-center">
            <Heading size="md" type="h2">Customer Directory</Heading>
            <Dropdown
              name="customerStatus"
              value={selectedStatus}
              options={["All", "Active", "Inactive", "Watchlist"]}
              size="sm"
              width="max-content"
              formFunc={(event) => setSelectedStatus(event.target.value)}
            />
          </Frame>
          <Frame className="w-full h-full" scroll="hidden">
            <Table width="stretch" cellWidth="180px" height="300px" size="sm" data={customerDirectoryTableData}/>
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
