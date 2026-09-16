"use client"

import { SizeType } from "@/src/types/types"
import { Country, State } from "country-state-city"
import { useMemo, useState } from "react"
import Dropdown from "../../base/ui/composites/dropdown"
import Frame from "../../base/ui/primitives/frame"
import Label from "../../base/ui/primitives/label"

type CountryStateFieldsProps = {
  size?: SizeType
  countryName?: string
  stateName?: string
  countryLabel?: string
  stateLabel?: string
  defaultCountry?: string
  defaultState?: string
}

const countries = Country.getAllCountries()

export default function CountryStateFields({
  size = "sm",
  countryName = "country",
  stateName = "state",
  countryLabel = "Country",
  stateLabel = "State / Province",
  defaultCountry = "Nigeria",
  defaultState = "Lagos",
}: CountryStateFieldsProps) {
  const initialCountry = countries.find((country) => country.name === defaultCountry) ?? countries[0]
  const [countryNameValue, setCountryNameValue] = useState(initialCountry?.name ?? "")
  const [stateNameValue, setStateNameValue] = useState(defaultState)

  const states = useMemo(() => {
    const country = countries.find((item) => item.name === countryNameValue)
    return country ? State.getStatesOfCountry(country.isoCode) : []
  }, [countryNameValue])

  const stateOptions = states.length > 0
    ? states.map((state) => ({ label: state.name, value: state.name }))
    : [{ label: "No states available", value: "" }]

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryNameValue(event.target.value)
    setStateNameValue("")
  }

  return (
    <Frame className="gap-[var(--space-md)]">
      <Frame className="w-1/2 flex-col">
        <Label text={countryLabel} size="xs" />
        <Dropdown
          name={countryName}
          size={size}
          width="100%"
          value={countryNameValue}
          formFunc={handleCountryChange}
          options={countries.map((country) => ({ label: country.name, value: country.name }))}
        />
      </Frame>

      <Frame className="w-1/2 flex-col">
        <Label text={stateLabel} size="xs" />
        <Dropdown
          name={stateName}
          size={size}
          width="100%"
          value={stateNameValue}
          options={stateOptions}
          disabled={states.length === 0}
          formFunc={(event) => setStateNameValue(event.target.value)}
        />
      </Frame>
    </Frame>
  )
}
