"use client"

import ChangeCurrency from "@/src/components/app/forms/changeCurrency"
import ChangeLanguage from "@/src/components/app/forms/changeLanguage"
import ChangeTheme from "@/src/components/app/forms/changeTheme"
import ConfigureNotifications from "@/src/components/app/forms/configureNotifications"
import DeleteAccountModal from "@/src/components/app/forms/deleteAccount"
import EditProfile from "@/src/components/app/forms/editProfile"
import EditProfilePhoto from "@/src/components/app/forms/editProfilePhoto"
import ResetPassword from "@/src/components/app/forms/resetPassword"
import IntegrationsSection from "@/src/components/app/integrations/integrationsSection"
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
  // Only a row that answers for itself carries an action. The profile rows that all
  // open the same form carry none, because the group answers for all of them with
  // a single button.
  action?: string
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
  // A group whose rows are all changed through the same form carries one button for
  // all of them rather than repeating the same action on every row. The photo is
  // left out of it: it is changed on its own, through its own form.
  sharedAction?: {
    label: string
    func: () => void
  }
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

// One row of a settings group: the label, and the value it holds, or the avatar
// where the row is the profile photo. A row that answers for itself also carries
// its own button, which is what the photo does.
//
// The photo is passed in rather than read from the profile here, so the row stays a
// presentational part of the group and the page keeps owning the profile it fetched.
function SettingsRow({ item, profilePicture }: { item: SettingsItem; profilePicture?: string }) {
  return (
    <Frame className="flex w-full items-center justify-between">
      <Frame className="flex w-full flex-col gap-[var(--space-xxs)]">
        <Paragraph size="sm" color="textColor1" weight="medium" specificStyle={{
          lineHeight:"1"
        }}>
          {item.label}
        </Paragraph>
        {item.photo ? (
          <Avatar size="xxl" src={profilePicture} />
        ) : (
          <Paragraph size="xs">{item.value}</Paragraph>
        )}
      </Frame>

      {/* The destructive row (delete account) carries the error colours and the
          delete icon, the way the delete business button does. The theme row is the
          one whose button opens its popup instead. */}
      {item.action && <SettingsActionButton item={item} />}
    </Frame>
  )
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
  // photo is changed on its own, so it keeps its own button, while the five fields
  // below it are all changed through the same form and share one button for the
  // group rather than repeating the same action on every row.
  const settingsGroups: SettingsGroup[] = [
    {
      title: "Profile settings",
      items: [
        { label: "Profile photo", photo: true, action: "Change", func: () => openModal(<EditProfilePhoto />) },
        { label: "Username", value: profile?.userName ?? "Not set" },
        { label: "First name", value: profile?.firstName ?? "Not set" },
        { label: "Last name", value: profile?.lastName ?? "Not set" },
        { label: "Email address", value: profile?.email ?? "Not set" },
        { label: "Phone number", value: profile?.phone ?? "Not set" },
      ],
      sharedAction: { label: "Edit", func: () => openModal(<EditProfile />) },
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
      {settingsGroups.map((group) => {
        // The profile photo is the one row that stands apart: it shows an image
        // rather than a value, it is changed through its own form, and it is the
        // only row the line separates it from the fields below. So it is drawn on
        // its own and the line is drawn under it alone, rather than under every row
        // in the group.
        const photoItem = group.items.find((item) => item.photo)
        const otherItems = group.items.filter((item) => !item.photo)

        return (
          <Fragment key={group.title}>
            <Section>
              <Frame className="flex w-full flex-col gap-[var(--space-md)] border border-[var(--color-outline1)] bg-[var(--color-white)] p-[var(--space-lg)] rounded-[var(--radius-md)]">
                <Heading size="md" type="h2">{group.title}</Heading>

                {photoItem && (
                  <>
                    <SettingsRow item={photoItem} profilePicture={profile?.profilePicture} />
                    <div className="w-full border-b border-[var(--color-outline1)]" />
                  </>
                )}

                {/* The rows that share a single button are laid out beside it: they
                    stack on the left and the one button that answers for all of them
                    sits at the end of the block, on the same line as the group rather
                    than repeated on every row. */}
                {group.sharedAction ? (
                  <Frame className="flex w-full items-start justify-center gap-[var(--space-md)]">
                    <Frame className="flex flex-1 flex-col gap-[var(--space-md)]">
                      {otherItems.map((item) => (
                        <SettingsRow
                          key={item.label}
                          item={item}
                          profilePicture={profile?.profilePicture}
                        />
                      ))}
                    </Frame>

                    <Button
                      variant="outline"
                      size="xs"
                      func={group.sharedAction.func}
                    >
                      {group.sharedAction.label}
                    </Button>
                  </Frame>
                ) : (
                  otherItems.map((item) => (
                    <Frame
                      key={item.label}
                      className="flex w-full items-center justify-between border-b border-[var(--color-outline1)] pb-[var(--space-md)] last:border-b-0 last:pb-0"
                    >
                      <SettingsRow item={item} profilePicture={profile?.profilePicture} />
                    </Frame>
                  ))
                )}
              </Frame>
            </Section>

            {group.title === "App settings" && <IntegrationsSection />}
          </Fragment>
        )
      })}
    </Frame>
  )
}