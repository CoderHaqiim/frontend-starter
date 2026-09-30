"use client"

import ChangeCurrency from "@/src/components/app/forms/changeCurrency"
import ChangeLanguage from "@/src/components/app/forms/changeLanguage"
import ChangeTheme from "@/src/components/app/forms/changeTheme"
import IntegrationsSection from "@/src/components/app/integrations/integrationsSection"
import ConfigureNotifications from "@/src/components/app/forms/configureNotifications"
import DeleteAccountModal from "@/src/components/app/forms/deleteAccount"
import EditProfile from "@/src/components/app/forms/editProfile"
import EditProfilePhoto from "@/src/components/app/forms/editProfilePhoto"
import ResetPassword from "@/src/components/app/forms/resetPassword"
import Section from "@/src/components/base/layout/section"
import Avatar from "@/src/components/base/ui/composites/avatar"
import Popup from "@/src/components/base/ui/composites/popup"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { useTheme } from "@/src/components/providers/themeProvider"
import { getProfile, profileQueryKey } from "@/src/services/profileService"
import {
  describeLanguage,
  describeNotifications,
  describeTheme,
  useAppSettings,
} from "@/src/store/appSettingsState"
import { useBackdropState } from "@/src/store/backdropState"
import { defaultCurrency, getCurrencySymbol } from "@/src/utils/currencySymbol"
import { useQuery } from "@tanstack/react-query"
import { Fragment, ReactNode } from "react"

// A settings row. The row that shows the profile photo carries the avatar in
// place of a value, so it is marked instead of carrying one, and the destructive
// row carries the error colours on its action.
type SettingsItem = {
  label: string
  value?: string
  photo?: boolean
  action: string
  destructive?: boolean
  // The rows that own a modal carry the handler that opens it.
  func?: () => void
  // The rows that keep their picker beside them instead of behind a modal, like the
  // theme row, carry the popup content their button opens.
  popupContent?: ReactNode
}

type SettingsGroup = {
  title: string
  items: SettingsItem[]
}

// The rows of the account settings group. The rows that own a modal are handed the
// handler that opens it, the currency row lists what the profile holds, so the group
// is built from the profile the page fetches, and the delete account row stays last
// in it, carrying the destructive colours the way the delete business card does on a
// business overview.
function buildAccountSettings(
  currency: string,
  openPasswordReset: () => void,
  openCurrency: () => void,
  openDeleteAccount: () => void,
): SettingsItem[] {
  return [
    // The reset row asks for the email and the current password before the reset
    // request travels to the reset password route.
    { label: "Password", value: "Last changed 3 months ago", action: "Reset", func: openPasswordReset },
    { label: "Two-factor auth", value: "Enabled", action: "Manage" },
    // The symbol and the code come from the currency helper, so the row matches the
    // amounts the invoices and receipts are read in.
    { label: "Currency", value: `${getCurrencySymbol(currency)} ${currency}`, action: "Change", func: openCurrency },
    { label: "Delete account", value: "Remove your account and everything recorded against it", action: "Delete", destructive: true, func: openDeleteAccount },
  ]
}

// The button a row carries. The destructive row (delete account) carries the error
// colours and the delete icon, the way the delete business button does, and the rows
// that keep their picker beside them, like the theme row, open it from the button
// rather than from a modal. The popup folds away by itself once the pick is made.
function SettingsActionButton({ item }: { item: SettingsItem }) {
  const actionButton = (
    <Button
      variant="outline"
      size="xs"
      func={item.func}
      iconName={item.destructive ? "icon-delete" : undefined}
      iconColor={item.destructive ? "error" : undefined}
      specificStyles={item.destructive ? { color: "var(--color-error)" } : undefined}
    >
      {item.action}
    </Button>
  )

  if (!item.popupContent) return actionButton

  return (
    <Popup gap={8} width="140px" closeOnContentClick content={item.popupContent}>
      {actionButton}
    </Popup>
  )
}

export default function SettingsPage() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const { data: profile } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })

  // The rows open their modal through the backdrop store, the way the business
  // pages open theirs.
  const openModal = (content: ReactNode) => {
    setBackdropOpen(true)
    setBackdropContent(content)
  }

  // The account currency the currency row lists. Until the profile answers, the
  // default the invoice and receipt drafts are seeded with is shown.
  const currency = profile?.currency ?? defaultCurrency
  const accountName = profile?.userName ?? "your account"

  // The app settings the rows list: the theme the app is shown in, and the
  // notifications and the language it is kept with.
  const { theme } = useTheme()
  const appSettings = useAppSettings()

  // The personal information the profile holds. The username is the name the
  // profile button and card display, and the photo is listed as the avatar. The
  // account settings group closes the page, so the delete account row is the last
  // thing on it, the way the delete business card closes a business overview.
  const settingsGroups: SettingsGroup[] = [
    {
      title: "Profile settings",
      items: [
        { label: "Profile photo", photo: true, action: "Change", func: () => openModal(<EditProfilePhoto />) },
        { label: "Username", value: profile?.userName ?? "Not set", action: "Edit", func: () => openModal(<EditProfile />) },
        { label: "First name", value: profile?.firstName ?? "Not set", action: "Edit", func: () => openModal(<EditProfile />) },
        { label: "Last name", value: profile?.lastName ?? "Not set", action: "Edit", func: () => openModal(<EditProfile />) },
        { label: "Email address", value: profile?.email ?? "Not set", action: "Update", func: () => openModal(<EditProfile />) },
        { label: "Phone number", value: profile?.phone ?? "Not set", action: "Update", func: () => openModal(<EditProfile />) },
      ],
    },
    {
      title: "App settings",
      // The theme, the notifications and the language. The theme is picked straight
      // from the row through the popup that carries the two themes, and the other two
      // open the modal that owns each of them.
      items: [
        { label: "Theme", value: describeTheme(theme), action: "Change", popupContent: <ChangeTheme /> },
        { label: "Notifications", value: describeNotifications(appSettings.notifications), action: "Configure", func: () => openModal(<ConfigureNotifications />) },
        { label: "Language", value: describeLanguage(appSettings.language), action: "Change", func: () => openModal(<ChangeLanguage />) },
      ],
    },
    { title: "Account settings",
      items: buildAccountSettings(
        currency,
        () => openModal(<ResetPassword />),
        () => openModal(<ChangeCurrency />),
        () => openModal(<DeleteAccountModal accountName={accountName} />),
      ),
    },
  ]

  return (
    <Frame className="flex w-full flex-col">
      <Section>
        <Frame className="gap-[var(--space-xs)] h-max flex-col">
          <Heading size="xl" type="h1">Settings</Heading>
          <Paragraph weight="light" size="sm">
            Manage your profile, account, app preferences and integrations.
          </Paragraph>
        </Frame>
      </Section>

      {/* The Integrations group is rendered by the component that reads it, so the rows
          show the state the server holds rather than a written-in list. It keeps its place
          between the app settings and the account settings. */}
      {settingsGroups.map((group) => (
        <Fragment key={group.title}>
          <Section>
            <Frame className="flex w-full flex-col gap-[var(--space-md)] border border-[var(--color-outline1)] bg-[var(--color-white)] p-[var(--space-lg)] rounded-[var(--radius-md)]">
              <Heading size="md" type="h2">{group.title}</Heading>

              {group.items.map((item) => (
                <Frame
                  key={item.label}
                  className="flex w-full items-center justify-between border-b border-[var(--color-outline1)] pb-[var(--space-md)] last:border-b-0 last:pb-0"
                >
                  <Frame className="flex w-full flex-col gap-[var(--space-xxs)]">
                    <Paragraph size="sm" color="textColor1" weight="medium">
                      {item.label}
                    </Paragraph>
                    {item.photo ? (
                      <Avatar size="xxl" src={profile?.profilePicture} />
                    ) : (
                      <Paragraph size="xs">{item.value}</Paragraph>
                    )}
                  </Frame>

                  {/* The destructive row (delete account) carries the error colours
                      and the delete icon, the way the delete business button does. The
                      theme row is the one whose button opens its popup instead. */}
                  <SettingsActionButton item={item} />
                </Frame>
              ))}
            </Frame>
          </Section>

          {group.title === "App settings" && <IntegrationsSection />}
        </Fragment>
      ))}
    </Frame>
  )
}