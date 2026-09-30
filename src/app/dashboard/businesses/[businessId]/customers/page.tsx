"use client"

import KpiLoader from "@/src/components/app/cards/kpiLoader"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import CreateCustomerForm from "@/src/components/app/forms/createCustomer"
import ImportModal from "@/src/components/app/import/importModal"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import EmptyState from "@/src/components/base/ui/composites/emptyState"
import KpiRow from "@/src/components/base/ui/composites/kpiRow"
import Table from "@/src/components/base/ui/composites/table"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { customerKpisQueryKey, customersQueryKey, deleteCustomer, getCustomerKpis, getCustomers, getQuickAccessCustomers, quickAccessCustomersQueryKey } from "@/src/services/customerService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { ObjectRecordType } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const { businessId } = useParams<{ businessId: string }>()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const queryClient = useQueryClient()

  const { data: customers = [] } = useQuery({
    queryKey: customersQueryKey(businessId),
    queryFn: () => getCustomers(businessId),
  })
  const { data: quickAccessCustomers = [], isLoading: isCustomerQuickAccessLoading } = useQuery({
    queryKey: quickAccessCustomersQueryKey(businessId),
    queryFn: () => getQuickAccessCustomers(businessId),
  })
  const { data: customerKpis = [], isLoading: isCustomerKpisLoading } = useQuery({
    queryKey: customerKpisQueryKey(businessId),
    queryFn: () => getCustomerKpis(businessId),
    // The route answers with the cards under `kpis`, the same shape the invoice and
    // receipt KPI queries unwrap.
    select: (response) => response.kpis,
  })
  const [selectedStatus, setSelectedStatus] = useState("all")

  // The directory table is built from the displayed columns, so a row is linked
  // back to its customer through the name and email it shows.
  const findCustomer = (row: ObjectRecordType) =>
    customers.find(
      (customer) => customer.name === row["Customer name"] && customer.email === row["Email"]
    )

  // The directory, the KPI cards and the quick access cards all follow a change to
  // one of the customers.
  const refreshCustomerViews = () => {
    queryClient.invalidateQueries({ queryKey: customersQueryKey(businessId) })
    queryClient.invalidateQueries({ queryKey: customerKpisQueryKey(businessId) })
    queryClient.invalidateQueries({ queryKey: quickAccessCustomersQueryKey(businessId) })
  }

  // Edit opens the form the create opens, filled in with the customer, and saving it
  // travels through the customers route as a change to that customer.
  const handleEditCustomer = (row: ObjectRecordType) => {
    const customer = findCustomer(row)

    if (!customer) {
      showToast({
        variant: "error",
        title: "Edit failed",
        message: "The customer could not be found. Please try again.",
      })

      return
    }

    setBackdropContent(<CreateCustomerForm customerToEdit={customer} />)
    setBackdropOpen(true)
  }

  const handleDeleteCustomer = async (row: ObjectRecordType) => {
    const customer = findCustomer(row)

    if (!customer) {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The customer could not be found. Please try again.",
      })

      return
    }

    try {
      await deleteCustomer(businessId, String(customer.id))

      // The row leaves the cached directory straight away, and the directory, the
      // KPI cards and the quick access cards all refetch.
      queryClient.setQueryData<ObjectRecordType[]>(customersQueryKey(businessId), (currentCustomers = []) =>
        currentCustomers.filter((entry) => entry.id !== customer.id)
      )
      refreshCustomerViews()

      showToast({
        variant: "success",
        title: "Customer deleted",
        message: `${customer.name} was deleted successfully.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The customer could not be deleted. Please try again.",
      })
    }
  }

  const filteredCustomers = selectedStatus === "all"? 
  customers : customers.filter((customer) => customer.status === selectedStatus)

  const customerDirectoryTableData = filteredCustomers.map((customer) => ({
    "Customer name": customer.name,
    "Customer type": customer.customerType,
    "Company name": customer.companyName,
    "Status": customer.status,
    "Date added": customer.dateAdded,
    "Email": customer.email,
    "Phone number": customer.phone,
    "City": customer.city,
    "State/Region": customer.stateRegion,
    "Country": customer.country,
    "Customer since": customer.customerSince,
  }))

  const createCustomer = () => {
    setBackdropOpen(true)
    setBackdropContent("create-customer-form")
  }

  const importCustomers = () => {
    setBackdropOpen(true)
    setBackdropContent(<ImportModal definitionId="customers" businessId={businessId} />)
  }

  return (
    <Frame className="w-full flex-col h-max">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Customers</Heading>
            <Paragraph weight="light" size="sm">
              Track and manage your customers and their relationships with your business.
            </Paragraph>
          </Frame>
          <Frame className="gap-[var(--space-sm)]">
            <Button variant="outline" size="sm" iconName="icon-download" iconColor="accent" func={importCustomers}
              specificStyles={{
                color: "var(--color-accent)",
                borderColor: "var(--color-accent)",
              }}
            >
              Import Customers
            </Button>
            <Button variant="fill" size="sm" iconPosition="left" iconName="icon-plus" func={createCustomer}>
              Add Customer
            </Button>
          </Frame>
        </Frame>
      </Section>

      <Section>
        <KpiRow kpis={customerKpis} isLoading={isCustomerKpisLoading} itemsCount={4} />
      </Section>

      <Section>
        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Frame>
            <Heading size="md" type="h2">Quick Access Cards</Heading>
          </Frame>
            <Frame scroll="hidden" className="gap-[var(--space-md)]">
              {isCustomerQuickAccessLoading
                ? Array.from({ length: 3 }).map((_, index) => <KpiLoader key={index} />)
                : quickAccessCustomers.map((customer) => (
                  <QuickAccessCard key={customer.id} entry={customer} />
                ))}
            </Frame>
        </Frame>
      </Section>

      <Section>
        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Frame className="mb-[var(--space-sm)] justify-between items-center">
            <Heading size="md" type="h2">Customer Directory</Heading>
            <Dropdown
              name="customerStatus"
              value={selectedStatus}
              options={["all", "active", "inactive", "watchlist"]}
              size="sm"
              width="max-content"
              formFunc={(event) => setSelectedStatus(event.target.value)}
            />
          </Frame>
          <Frame className="w-full h-max">
            {customerDirectoryTableData.length > 0 ? (
              <Table
                width="stretch"
                cellWidth="180px"
                height="hug"
                size="sm"
                data={customerDirectoryTableData}
                isCustomerData
                onEditRow={handleEditCustomer}
                onDeleteRow={handleDeleteCustomer}
              />
            ) : (
              // The surface mirrors the directory table frame above, so the box
              // keeps its shape while the directory is empty.
              <EmptyState
                message="When you add customers, they appear here."
                surface="border-[0.5px] border-[var(--color-outline1)] bg-[var(--color-white)]"
              />
            )}
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
