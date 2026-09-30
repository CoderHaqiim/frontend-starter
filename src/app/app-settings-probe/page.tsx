"use client"

import ChangeLanguage from "@/src/components/app/forms/changeLanguage"
import ChangeTheme from "@/src/components/app/forms/changeTheme"
import ConfigureNotifications from "@/src/components/app/forms/configureNotifications"
import { useTheme } from "@/src/components/providers/themeProvider"
import { useAppSettings } from "@/src/store/appSettingsState"
import { useEffect, useState } from "react"

// Temporary probe: exercises the app settings the way the modals do, then reports
// what the settings store and the theme hold.
export default function AppSettingsProbePage() {
  const { theme, setTheme } = useTheme()
  const appSettings = useAppSettings()
  const [probe, setProbe] = useState("pending")
  const [mode, setMode] = useState("render")

  useEffect(() => {
    // The case is read after the first paint, so the probe does not set state while
    // the effect is running.
    const timer = setTimeout(() => {
      setMode(new URLSearchParams(window.location.search).get("case") ?? "render")
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (mode !== "save") return

    // The theme is picked the way the theme popup picks it, without a modal in the
    // way.
    const firstTimer = setTimeout(() => {
      setTheme("dark")
    }, 600)

    const secondTimer = setTimeout(() => {
      // Turn email notifications off and submit the form the way the modal does.
      const emailToggle = document.querySelector<HTMLInputElement>('input[name="emailNotifications"]')
      emailToggle?.click()

      const form = document.querySelector("form")
      form?.requestSubmit()
    }, 1200)

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(secondTimer)
    }
  }, [mode, setTheme])

  useEffect(() => {
    const timer = setTimeout(() => {
      setProbe([
        `theme=${theme}`,
        `rootTheme=${document.documentElement.dataset.theme}`,
        `storedTheme=${window.localStorage.getItem("theme")}`,
        `storedSettings=${window.localStorage.getItem("app-settings")}`,
        `notifications=${appSettings.notifications.email}/${appSettings.notifications.push}`,
        `language=${appSettings.language}`,
      ].join(" | "))
    }, 2600)

    return () => clearTimeout(timer)
  }, [theme, appSettings])

  return (
    <div>
      <div id="app-settings-probe">{probe}</div>
      {mode === "render" && <ChangeTheme />}
      <ConfigureNotifications />
      {mode === "render" && <ChangeLanguage />}
    </div>
  )
}
