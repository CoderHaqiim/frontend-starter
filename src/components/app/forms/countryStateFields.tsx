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

// Stored values are lowercase, so the dataset names are matched without regard to
// casing and the dataset's own casing is used for the values that get submitted.
const findCountry = (name?: string) =>
  countries.find(
    (country) => country.name.toLowerCase() === (name ?? "").trim().toLowerCase()
  )

const findState = (isoCode: string | undefined, name?: string) => {
  if (!isoCode) return undefined

  return State.getStatesOfCountry(isoCode).find(
    (state) => state.name.toLowerCase() === (name ?? "").trim().toLowerCase()
  )?.name
}

export default function CountryStateFields({
  size = "sm",
  countryName = "country",
  stateName = "state",
  countryLabel = "Country",
  stateLabel = "State / Province",
  defaultCountry = "Nigeria",
  defaultState = "Lagos",
}: CountryStateFieldsProps) {
  const initialCountry = findCountry(defaultCountry) ?? countries[0]
  const [countryNameValue, setCountryNameValue] = useState(initialCountry?.name ?? "")
  const [stateNameValue, setStateNameValue] = useState(
    findState(initialCountry?.isoCode, defaultState) ?? defaultState
  )

  const states = useMemo(() => {
    const country = countries.find((item) => item.name === countryNameValue)
    return country ? State.getStatesOfCountry(country.isoCode) : []
  }, [countryNameValue])

  const stateOptions = useMemo(() => {
    const options = states.map((state) => ({ label: state.name, value: state.name }))

    // A saved state can be missing from the country's state list (older or free
    // typed values), so the current state stays visible until it is changed.
    if (stateNameValue && !options.some((option) => option.value === stateNameValue)) {
      options.unshift({ label: stateNameValue, value: stateNameValue })
    }

    return options.length > 0 ? options : [{ label: "No states available", value: "" }]
  }, [states, stateNameValue])

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
