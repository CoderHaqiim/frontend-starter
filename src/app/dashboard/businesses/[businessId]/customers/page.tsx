"use client"

import KpiRow from "@/src/components/app/cards/kpiCard"
import KpiLoader from "@/src/components/app/cards/kpiLoader"
import QuickAccessCard from "@/src/components/app/cards/quickAccess"
import RowActions from "@/src/components/app/rowActions"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import Table from "@/src/components/base/ui/composites/table"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { customerKpisQueryKey, customersQueryKey, deleteCustomer, getCustomerKpis, getCustomers, getQuickAccessCustomers, quickAccessCustomersQueryKey } from "@/src/services/customerService"
import { useBackdropState } from "@/src/store/backdropState"
import { useToastState } from "@/src/store/toastState"
import { ObjectRecordType, ToastType } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const { businessId } = useParams<{ businessId: string }>()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { toastState, setToastState } = useToastState()
  const queryClient = useQueryClient()

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  // The directory table is built from the displayed columns, so a row is linked
  // back to its customer through the name and email it shows.
  const handleDeleteCustomer = async (row: ObjectRecordType) => {
    const customer = customers.find(
      (entry) => entry.name === row["Customer name"] && entry.email === row["Email"]
    )

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
      queryClient.invalidateQueries({ queryKey: customersQueryKey(businessId) })
      queryClient.invalidateQueries({ queryKey: customerKpisQueryKey(businessId) })
      queryClient.invalidateQueries({ queryKey: quickAccessCustomersQueryKey(businessId) })

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
  const { data: customers = [] } = useQuery({
    queryKey: customersQueryKey(businessId),
    queryFn: () => getCustomers(businessId),
  })
  const { data: quickAccessCustomers = [], isLoading: isCustomerQuickAccessLoading } = useQuery({
    queryKey: quickAccessCustomersQueryKey(businessId),
    queryFn: () => getQuickAccessCustomers(businessId),
  })
  const { data: customerKpis = { kpis: [] }, isLoading: isCustomerKpisLoading } = useQuery({
    queryKey: customerKpisQueryKey(businessId),
    queryFn: () => getCustomerKpis(businessId),
  })
  const [selectedStatus, setSelectedStatus] = useState("all")

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
          <Frame>
            <Button variant="fill" iconName="icon-plus" size="sm" func={createCustomer}> Add Customer </Button>
          </Frame>
        </Frame>
      </Section>

      <Section>
        <Frame className="w-full h-[100px] gap-[var(--space-md)]">
          {isCustomerKpisLoading
            ? Array.from({ length: 4 }).map((_, index) => <KpiLoader key={index} />)
            : customerKpis.kpis.map((item) => <KpiRow key={item?.id} kpi={item} />)}
        </Frame>
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
            <Table
              width="stretch"
              cellWidth="180px"
              height="hug"
              size="sm"
              data={customerDirectoryTableData}
              isCustomerData
              rowActions={(row) => (
                <RowActions onDelete={() => handleDeleteCustomer(row)} />
              )}
            />
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
