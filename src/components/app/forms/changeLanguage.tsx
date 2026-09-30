"use client"

import {
  AppLanguage,
  describeLanguage,
  saveAppSettings,
  supportedLanguages,
  useAppSettings,
} from "@/src/store/appSettingsState"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes } from "@/src/types/types"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"

const isSupportedLanguage = (language: string): language is AppLanguage =>
  supportedLanguages.some((option) => option.value === language)

// The modal the language row on the settings page opens. English is the only language
// the app is shown in for now, so English is the one the picker offers; the list it is
// read from is where another language is added.
export default function ChangeLanguage() {
  const appSettings = useAppSettings()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveLanguage = (values: FormObjectTypes) => {
    const selectedLanguage = String(values.language ?? "")

    if (!isSupportedLanguage(selectedLanguage)) return

    saveAppSettings({ ...appSettings, language: selectedLanguage })

    showToast({
      variant: "success",
      title: "Language updated",
      message: `The app is now shown in ${describeLanguage(selectedLanguage)}.`,
    })

    closeForm()
  }

  return (
    <Card width="400px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Language
        </Heading>
      </Frame>

      <Form onSubmit={saveLanguage}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* The language the app is shown in. The picker opens on the language the
              app is using, and the one picked is what the form submits: a dropdown
              that is handed a value is held at that value and never moves, so the
              language the app is on is handed over as the value it starts on. */}
          <Frame className="w-full flex-col">
            <Label required text="Language" size="xs" />
            <Dropdown
              name="language"
              size="xs"
              width="100%"
              defaultValue={appSettings.language}
              options={supportedLanguages}
            />
            <Paragraph size="xxs" weight="light">
              English is the only language the app is shown in for now. More languages
              are on the way.
            </Paragraph>
          </Frame>

          {/* Submit */}
          <Frame className="w-full justify-end">
            <Button variant="fill" role="submit" size="md" propagate>
              Save Changes
            </Button>
          </Frame>

        </Frame>
      </Form>
    </Card>
  )
}
