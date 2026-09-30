"use client"

import { ThemeType } from "@/src/app/design/colors"
import { useSyncExternalStore } from "react"

/*
 * The app settings the settings page owns: the notifications that are sent and the
 * language the app is shown in. They belong to the person using the app rather than
 * to the account, so they are kept in the browser the way the theme is, and are read
 * again on the next visit.
 *
 * The theme itself stays with ThemeProvider, which saves it under its own key. The
 * labels below name the two themes it offers, so the settings row and the popup that
 * changes it read the same words.
 */

export type NotificationPreferences = {
  email: boolean
  push: boolean
}

export type AppLanguage = "english"

export type AppSettings = {
  notifications: NotificationPreferences
  language: AppLanguage
}

// The two themes the app can be shown in. The label is the one the settings row
// reads, and the button label is the shorter one the two buttons in the theme popup
// carry, where the word "mode" is already understood.
export const themeOptions: { label: string; buttonLabel: string; value: ThemeType }[] = [
  { label: "Light mode", buttonLabel: "Light", value: "light" },
  { label: "Dark mode", buttonLabel: "Dark", value: "dark" },
]

// English is the only language the app is shown in for now. This is the list the
// language modal offers, so a language added here shows up in it.
export const supportedLanguages: { label: string; value: AppLanguage }[] = [
  { label: "English (Nigeria)", value: "english" },
]

export const defaultAppSettings: AppSettings = {
  notifications: { email: true, push: true },
  language: "english",
}

const storageKey = "app-settings"
const appSettingsChange = "app-settings-change"

const isStoredSettings = (settings: unknown): settings is AppSettings => {
  if (typeof settings !== "object" || settings === null) return false

  const candidate = settings as AppSettings

  return typeof candidate.notifications?.email === "boolean"
    && typeof candidate.notifications?.push === "boolean"
    && supportedLanguages.some((language) => language.value === candidate.language)
}

// The stored settings are read once and kept, because the snapshot a store is read
// through has to stay the same until the settings themselves change.
let storedSettings: AppSettings | null = null

const readStoredSettings = (): AppSettings => {
  if (typeof window === "undefined") return defaultAppSettings
  if (storedSettings) return storedSettings

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "")

    storedSettings = isStoredSettings(saved) ? saved : defaultAppSettings
  } catch {
    storedSettings = defaultAppSettings
  }

  return storedSettings
}

const subscribeToSettings = (onStoreChange: () => void) => {
  // A change made in another tab arrives as a storage event, so what is kept is
  // dropped before the components reading it are told to read again.
  const handleStorageChange = () => {
    storedSettings = null
    onStoreChange()
  }

  window.addEventListener("storage", handleStorageChange)
  window.addEventListener(appSettingsChange, onStoreChange)

  return () => {
    window.removeEventListener("storage", handleStorageChange)
    window.removeEventListener(appSettingsChange, onStoreChange)
  }
}

const getServerSettings = () => defaultAppSettings

// The settings the app is using, read by the settings page and by the modals that
// change them.
export function useAppSettings() {
  return useSyncExternalStore(subscribeToSettings, readStoredSettings, getServerSettings)
}

// The saved settings are written the way the theme is: the value is kept in local
// storage and everything reading it is told to read again.
export function saveAppSettings(settings: AppSettings) {
  storedSettings = settings
  window.localStorage.setItem(storageKey, JSON.stringify(settings))
  window.dispatchEvent(new Event(appSettingsChange))
}

export function describeTheme(theme: ThemeType) {
  return themeOptions.find((option) => option.value === theme)?.label ?? theme
}

// The channels that are on, the way the notifications row lists them.
export function describeNotifications(notifications: NotificationPreferences) {
  if (notifications.email && notifications.push) return "Email + push"
  if (notifications.email) return "Email only"
  if (notifications.push) return "Push only"

  return "Off"
}

export function describeLanguage(language: AppLanguage) {
  return supportedLanguages.find((option) => option.value === language)?.label ?? language
}
