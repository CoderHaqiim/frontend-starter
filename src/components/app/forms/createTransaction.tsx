"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  businessTransactionsQueryKey,
  createBusinessTransaction,
} from "@/src/services/transactionService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, Transaction } from "@/src/types/types"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

type CreateTransactionFormProps = {
  businessId: string
}

export default function CreateTransactionForm({ businessId }: CreateTransactionFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)
  // A form opened from a business page always targets that business and the
  // business field is read only there. On the home dashboard there is no
  // business context, so the field stays changeable.
  const contextBusinessId = getBusinessIdFromPathname(pathname)
  const isBusinessContext = Boolean(contextBusinessId)
  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveTransaction = async (values: FormObjectTypes) => {
    const targetBusinessId = String(values.businessId ?? "")

    setIsSaving(true)

    try {
      const { data: createdTransaction } = await createBusinessTransaction(targetBusinessId, {
        ...values,
        amount: Number(values.amount) || 0,
      })

      // The new transaction goes straight into the first page of the list, and
      // every cached query is refreshed so the list, the recent transactions and
      // the KPI cards all pick it up.
      queryClient.setQueryData<Transaction[]>(
        businessTransactionsQueryKey(targetBusinessId, 1),
        (currentTransactions = []) => [
          createdTransaction,
          ...currentTransactions.filter(
            (transaction) => transaction.id !== createdTransaction.id
          ),
        ]
      )
      queryClient.invalidateQueries()

      showToast({
        variant: "success",
        title: "Transaction created",
        message: `${createdTransaction.description} was created successfully.`,
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Create failed",
        message: "The transaction could not be created. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">New Transaction</Heading>
      </Frame>

      <Form onSubmit={saveTransaction}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Description" size="xs" />
            <Input required size="sm" rounded="sm" placeholder="What was this transaction for?" outline border type="text" name="description" variant="default" />
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown
                name="businessId"
                size="sm"
                width="100%"
                defaultValue={businessId}
                disabled={isBusinessContext}
                value={
                  isBusinessContext
                    ? contextBusinessId
                    : undefined
                }
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Customer" size="xs" />
              <Input size="sm" rounded="sm" placeholder="Customer name" outline border type="text" name="customer" variant="default" />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Transaction Type" size="xs" />
              <Dropdown
                name="type"
                size="sm"
                width="100%"
                options={[
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" },
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label required text="Due Date" size="xs" />
              <input required type="date" name="date"
                className="w-full text-[length:var(--bodySize-sm)] h-[var(--elementSize-sm)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
              />
            </Frame>
          </Frame>

          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Amount" size="xs" />
              <Input required size="sm" rounded="sm" placeholder="0.00" outline border type="number" name="amount" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Status" size="xs" />
              <Dropdown
                name="status"
                size="sm"
                width="100%"
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Frame>
          </Frame>

          <Frame className="w-1/2 flex-col">
            <Label text="Category" size="xs" />
            <Input size="sm" rounded="sm" placeholder="e.g. Sales, Utilities" outline border type="text" name="category" variant="default" />
          </Frame>

          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
              {isSaving ? "Creating..." : "Create Transaction"}
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}