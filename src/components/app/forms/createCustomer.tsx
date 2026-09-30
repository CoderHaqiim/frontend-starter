"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  createCustomer,
  customerKpisQueryKey,
  customersQueryKey,
  quickAccessCustomersQueryKey,
  updateCustomer,
} from "@/src/services/customerService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, ObjectRecordType } from "@/src/types/types"
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
import CountryStateFields from "./countryStateFields"

type CreateCustomerFormProps = {
  // The customer being changed. The form opens blank when it is not given, and the
  // values it holds are saved back through the customers route when it is.
  customerToEdit?: ObjectRecordType
}

export default function CreateCustomerForm({ customerToEdit }: CreateCustomerFormProps) {
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
  const isEditing = Boolean(customerToEdit)

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

  const saveCustomer = async (values: FormObjectTypes) => {
    const targetBusinessId = String(values.businessId ?? "") || contextBusinessId || ""

    setIsSaving(true)

    try {
      if (customerToEdit) {
        // An edit travels through the same route as the create, keyed by the
        // customer it changes, and the saved customer replaces the row it came from.
        const { data: savedCustomer } = await updateCustomer(
          targetBusinessId,
          String(customerToEdit.id),
          values,
        )

        queryClient.setQueryData<ObjectRecordType[]>(
          customersQueryKey(targetBusinessId),
          (currentCustomers = []) =>
            currentCustomers.map((customer) =>
              customer.id === savedCustomer.id ? savedCustomer : customer
            )
        )
        queryClient.invalidateQueries({ queryKey: customersQueryKey(targetBusinessId) })
        queryClient.invalidateQueries({ queryKey: customerKpisQueryKey(targetBusinessId) })
        queryClient.invalidateQueries({ queryKey: quickAccessCustomersQueryKey(targetBusinessId) })

        showToast({
          variant: "success",
          title: "Customer updated",
          message: `${savedCustomer.name} was updated successfully.`,
        })

        closeCreateCustomerForm()
        return
      }

      const { data: createdCustomer } = await createCustomer(targetBusinessId, values)

      // The new customer is put straight into the directory, and the directory,
      // the KPI cards and the quick access cards all refetch.
      queryClient.setQueryData<ObjectRecordType[]>(
        customersQueryKey(targetBusinessId),
        (currentCustomers = []) => [
          createdCustomer,
          ...currentCustomers.filter((customer) => customer.id !== createdCustomer.id),
        ]
      )
      queryClient.invalidateQueries({ queryKey: customersQueryKey(targetBusinessId) })
      queryClient.invalidateQueries({ queryKey: customerKpisQueryKey(targetBusinessId) })
      queryClient.invalidateQueries({ queryKey: quickAccessCustomersQueryKey(targetBusinessId) })

      showToast({
        variant: "success",
        title: "Customer added",
        message: `${createdCustomer.name} was added successfully.`,
      })

      closeCreateCustomerForm()
    } catch {
      showToast({
        variant: "error",
        title: isEditing ? "Update failed" : "Create failed",
        message: isEditing
          ? "The customer could not be updated. Please try again."
          : "The customer could not be added. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const closeCreateCustomerForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="550px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeCreateCustomerForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] max-h-[500px] justify-between">
        <Heading size="md" type="h2">
          {isEditing ? "Edit Customer" : "Add Customer"}
        </Heading>
      </Frame>
      <Form onSubmit={saveCustomer}>
        <Frame className="w-full max-h-[380px] px-[var(--space-sm)] flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Customer Name" size="xs" />
            <Input required size="xs" rounded="sm" placeholder="Customer name" outline border type="text" name="name" variant="default" defaultValue={customerToEdit?.name} />
          </Frame>
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Email" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" defaultValue={customerToEdit?.email} />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label required text="Phone" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default" defaultValue={customerToEdit?.phone} />
            </Frame>
          </Frame>
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Type" size="xs" />
              <Dropdown name="type" size="xs" width="100%"
                defaultValue={customerToEdit?.customerType}
                options={[
                  { label: "Individual", value: "individual"},
                  { label: "Company", value: "company" }
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Company Name" size="xs" />
              <Input size="xs" rounded="sm" outline border type="text" name="companyName" variant="default" defaultValue={customerToEdit?.companyName} />
            </Frame>
          </Frame>
          <CountryStateFields
            stateName="stateRegion"
            stateLabel="State / Region"
            size="xs"
            defaultCountry={customerToEdit?.country || undefined}
            defaultState={customerToEdit?.stateRegion || undefined}
          />
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="City" size="xs" />
              <Input size="xs" rounded="sm" outline border type="text" name="city" variant="default" defaultValue={customerToEdit?.city} />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown name="businessId" size="xs" width="100%"
                value={
                  isBusinessContext
                    ? contextBusinessId
                    : undefined
                }
                disabled={isBusinessContext}
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id
                }))}
              />
            </Frame>
          </Frame>
          <Frame className="w-full flex-col">
            <Label text="Address" size="xs" />
            <textarea
              className="w-full text-[length:var(--bodySize-xs)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Customer address"
              name="address"
              rows={1}
              defaultValue={customerToEdit?.address}
            />
          </Frame>
        </Frame>
        <Frame className="justify-end w-full">
          <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Customer"}
          </Button>
        </Frame>
      </Form>



    </Card>
  )
}
