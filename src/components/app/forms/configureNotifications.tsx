"use client"

import {
  describeNotifications,
  NotificationPreferences,
  saveAppSettings,
  useAppSettings,
} from "@/src/store/appSettingsState"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes } from "@/src/types/types"
import Card from "../../base/ui/composites/card"
import Form from "../../base/ui/composites/form"
import Toggle from "../../base/ui/composites/toggle"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"

// The modal the notifications row on the settings page opens. The channels it turns
// on and off are the ones the row lists, and they are kept in the browser next to the
// rest of the app settings.
export default function ConfigureNotifications() {
  const appSettings = useAppSettings()
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const saveNotifications = (values: FormObjectTypes) => {
    // Each channel is a switch: a channel that is on is part of the collected values
    // and one that is off is not, which is what tells the two apart.
    const notifications: NotificationPreferences = {
      email: Boolean(values.emailNotifications),
      push: Boolean(values.pushNotifications),
    }

    saveAppSettings({ ...appSettings, notifications })

    showToast({
      variant: "success",
      title: "Notifications updated",
      message: `Notifications are set to ${describeNotifications(notifications)}.`,
    })

    closeForm()
  }

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>
      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Notifications
        </Heading>
      </Frame>

      <Form onSubmit={saveNotifications}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Email */}
          <Frame className="w-full items-center justify-between gap-[var(--space-lg)]">
            <Frame className="flex-col gap-[var(--space-xxs)]">
              <Label text="Email notifications" size="xs" />
              <Paragraph size="xxs" weight="light">
                Transaction, invoice and receipt updates sent to your email address.
              </Paragraph>
            </Frame>

            <Toggle name="emailNotifications" defaultChecked={appSettings.notifications.email} />
          </Frame>

          {/* Push */}
          <Frame className="w-full items-center justify-between gap-[var(--space-lg)]">
            <Frame className="flex-col gap-[var(--space-xxs)]">
              <Label text="Push notifications" size="xs" />
              <Paragraph size="xxs" weight="light">
                The same updates, shown in the app while you are signed in.
              </Paragraph>
            </Frame>

            <Toggle name="pushNotifications" defaultChecked={appSettings.notifications.push} />
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
