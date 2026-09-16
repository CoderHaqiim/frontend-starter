"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
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

export default function CreateCustomerForm() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

  const closeCreateCustomerForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  return (
    <Card width="550px" padding="xl" height="max-content">
      <Frame className="mb-[var(--space-lg)] max-h-[500px] justify-between">
        <Heading size="md" type="h2">
          Add Customer
        </Heading>
        <Frame>
          <CloseButton func={closeCreateCustomerForm} />
        </Frame>
      </Frame>
      <Form url="/api/post">
        <Frame className="w-full max-h-[380px] px-[var(--space-sm)] flex-col gap-[var(--space-lg)]">
          <Frame className="w-full flex-col">
            <Label required text="Customer Name" size="xs" />
            <Input required size="xs" rounded="sm" placeholder="Customer name" outline border type="text" name="name" variant="default" />
          </Frame>
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Email" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Email address" outline border type="email" name="email" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label required text="Phone" size="xs" />
              <Input required size="xs" rounded="sm" placeholder="Phone number" outline border type="tel" name="phone" variant="default" />
            </Frame>
          </Frame>
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Type" size="xs" />
              <Dropdown name="type" size="xs" width="100%"
                options={[
                  { label: "Individual", value: "individual"},
                  { label: "Company", value: "company" }
                ]}
              />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Company Name" size="xs" />
              <Input size="xs" rounded="sm" outline border type="text" name="companyName" variant="default" />
            </Frame>
          </Frame>
          <CountryStateFields stateName="stateRegion" stateLabel="State / Region" size="xs" />
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="City" size="xs" />
              <Input size="xs" rounded="sm" outline border type="text" name="city" variant="default" />
            </Frame>
            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown name="businessId" size="xs" width="100%"
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
            />
          </Frame>
        </Frame>
        <Frame className="justify-end w-full">
          <Button variant="fill" role="submit" size="md" propagate>
            Add Customer
          </Button>
        </Frame>
      </Form>



    </Card>
  )
}
