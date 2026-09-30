"use client"

import { ThemeType } from "@/src/app/design/colors"
import { describeTheme, themeOptions } from "@/src/store/appSettingsState"
import { useShowToast } from "@/src/store/toastState"
import { ToastType } from "@/src/types/types"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import { useTheme } from "../../providers/themeProvider"

// What the theme row on the settings page opens, as a popup rather than a modal: one
// button per theme the app can be shown in, and picking one changes the app on the
// spot. The theme is the one the app is shown in, so the picked one is saved under the
// key the theme provider reads and the whole app changes over as soon as it is saved.
export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()
  const showToast = useShowToast()

  const pickTheme = (nextTheme: ThemeType) => {
    // The button for the theme the app is already shown in leaves it as it is, so
    // nothing is written and nothing is announced.
    if (nextTheme === theme) return

    setTheme(nextTheme)

    const toast: ToastType = {
      variant: "success",
      title: "Theme updated",
      message: `The app is now shown in ${describeTheme(nextTheme).toLowerCase()}.`,
    }

    showToast(toast)
  }

  return (
    <Frame className="w-full flex-col gap-[var(--space-xs)]">
      {themeOptions.map((option) => (
        // The theme the app is on wears the accent fill, so the popup reads as the
        // pair of themes with the one in use picked out of it.
        <Button
          key={option.value}
          variant={option.value === theme ? "fill" : "ghost"}
          size="sm"
          rounded="sm"
          justify="start"
          width="stretch"
          iconName={option.value === "light" ? "icon-sun" : "icon-moon"}
          func={() => pickTheme(option.value)}
        >
          {option.buttonLabel}
        </Button>
      ))}
    </Frame>
  )
}

