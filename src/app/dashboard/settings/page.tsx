"use client"

import ChangeCurrency from "@/src/components/app/forms/changeCurrency"
import DeleteAccountModal from "@/src/components/app/forms/deleteAccount"
import EditProfile from "@/src/components/app/forms/editProfile"
import EditProfilePhoto from "@/src/components/app/forms/editProfilePhoto"
import Section from "@/src/components/base/layout/section"
import Avatar from "@/src/components/base/ui/composites/avatar"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import { getProfile, profileQueryKey } from "@/src/services/profileService"
import { useBackdropState } from "@/src/store/backdropState"
import { getCurrencySymbol } from "@/src/utils/currencySymbol"
import { useQuery } from "@tanstack/react-query"
import { ReactNode } from "react"

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
}

type SettingsGroup = {
  title: string
  items: SettingsItem[]
}

// The rows of the account settings group. The currency row lists what the profile
// holds, so the group is built from the profile the page fetches, and the delete
// account row stays last in it, carrying the destructive colours the way the
// delete business card does on a business overview.
function buildAccountSettings(
  currency: string,
  openCurrency: () => void,
  openDeleteAccount: () => void,
): SettingsItem[] {
  return [
    { label: "Password", value: "Last changed 3 months ago", action: "Reset" },
    { label: "Two-factor auth", value: "Enabled", action: "Manage" },
    // The symbol and the code come from the currency helper, so the row matches the
    // amounts the invoices and receipts are read in.
    { label: "Currency", value: `${getCurrencySymbol(currency)} ${currency}`, action: "Change", func: openCurrency },
    { label: "Delete account", value: "Remove your account and everything recorded against it", action: "Delete", destructive: true, func: openDeleteAccount },
  ]
}

const appSettings: SettingsItem[] = [
  { label: "Theme", value: "Light mode", action: "Change" },
  { label: "Notifications", value: "Email + push", action: "Configure" },
  { label: "Language", value: "English (Nigeria)", action: "Change" },
]

const integrations: SettingsItem[] = [
  { label: "WhatsApp", value: "Connected", action: "Manage" },
  { label: "Google", value: "Not connected", action: "Connect" },
]

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
  const currency = profile?.currency ?? "NGN"
  const accountName = profile?.userName ?? "your account"

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
    { title: "App settings", items: appSettings },
    { title: "Integrations", items: integrations },
    {
      title: "Account settings",
      items: buildAccountSettings(
        currency,
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

      {settingsGroups.map((group) => (
        <Section key={group.title}>
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
                    and the delete icon, the way the delete business button does. */}
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
              </Frame>
            ))}
          </Frame>
        </Section>
      ))}
    </Frame>
  )
}