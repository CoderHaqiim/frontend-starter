"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import Section from "@/src/components/layout/section"
import Button from "@/src/components/ui/primitives/button"

const settingsGroups = [
  {
    title: "Profile settings",
    items: [
      { label: "Display name", value: "Aisha Bello", action: "Edit" },
      { label: "Profile photo", value: "Updated 2 days ago", action: "Change" },
      { label: "Business role", value: "Operations lead", action: "Manage" },
    ],
  },
  {
    title: "Account settings",
    items: [
      { label: "Email address", value: "aisha@company.com", action: "Update" },
      { label: "Password", value: "Last changed 3 months ago", action: "Reset" },
      { label: "Two-factor auth", value: "Enabled", action: "Manage" },
    ],
  },
  {
    title: "App settings",
    items: [
      { label: "Theme", value: "Light mode", action: "Change" },
      { label: "Notifications", value: "Email + push", action: "Configure" },
      { label: "Language", value: "English (Nigeria)", action: "Change" },
    ],
  },
  {
    title: "Business settings",
    items: [
      { label: "Business profile", value: "BrightWorks Ltd", action: "View" },
      { label: "Billing details", value: "Saved", action: "Edit" },
      { label: "Team access", value: "8 members", action: "Manage" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { label: "WhatsApp", value: "Connected", action: "Manage" },
      { label: "Google", value: "Not connected", action: "Connect" },
    ],
  },
]

export default function SettingsPage() {
  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Settings</Heading>
          <Paragraph weight="light" size="sm">
            Manage your profile, account, app preferences, and business details.
          </Paragraph>
        </Frame>
      </Frame>

      {settingsGroups.map((group) => (
        <Section key={group.title} width="stretch">
          <Frame width="stretch" direction="column" gap="md">
            <Heading size="md" type="h2">{group.title}</Heading>

            {group.items.map((item) => (
              <Frame
                key={item.label}
                width="stretch"
                justify="space-between"
                align="center"
                className="border-b border-[var(--color-outline1)] pb-[var(--space-md)] last:border-b-0 last:pb-0"
              >
                <Frame direction="column" gap="xxs" width="stretch">
                  <Paragraph size="sm" color="textColor1" weight="medium">{item.label}</Paragraph>
                  <Paragraph size="xs">{item.value}</Paragraph>
                </Frame>

                <Button variant="outline" size="sm">
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
