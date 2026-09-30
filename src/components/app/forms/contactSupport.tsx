"use client"

import { helpTopics } from "@/src/data/supportHelp"
import { submitSupportRequest } from "@/src/services/supportService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes } from "@/src/types/types"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"
import Paragraph from "../../base/ui/primitives/paragraph"
import Textarea from "../../base/ui/primitives/textarea"

// The topics the form offers are the topics the help center lists, so a request lands in the
// same words a reader browsed. "Other" is there for everything the topics do not cover.
const contactTopics = [...helpTopics, "Other"]

/*
 * The form the Support page opens from its Contact Support buttons.
 *
 * It asks for the four things a support request is made of and hands them to the support
 * service. The attachment is read the way the business logo and the profile photo read one;
 * only its name travels with the request today, which the service notes at the point the
 * real endpoint would take the file itself.
 */
export default function ContactSupport() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)

  const closeForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const readAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(event.target.files?.[0] ?? null)
  }

  const sendRequest = async (values: FormObjectTypes) => {
    const subject = String(values.subject ?? "").trim()
    const category = String(values.category ?? "").trim()
    const description = String(values.description ?? "").trim()

    if (!subject || !description) return

    setIsSending(true)

    try {
      // The route words the confirmation, so the toast carries the message it answered with
      // rather than one written here.
      const { message } = await submitSupportRequest({
        subject,
        category,
        description,
        attachment: attachment?.name ?? "",
      })

      showToast({
        variant: "success",
        title: "Support request submitted",
        message,
      })

      closeForm()
    } catch {
      showToast({
        variant: "error",
        title: "Request failed",
        message: "Your request could not be sent. Please try again.",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card width="min(560px, 92vw)" height="max-content" padding="xl">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeForm} />
      </Frame>

      <Frame className="mb-[var(--space-lg)] justify-between">
        <Heading size="md" type="h2">
          Contact support
        </Heading>
      </Frame>

      <Form onSubmit={sendRequest}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Subject */}
          <Frame className="w-full flex-col">
            <Label required text="Subject" size="xs" />
            <Input required size="sm" rounded="sm" outline border type="text" name="subject" variant="default" placeholder="What do you need help with?" />
          </Frame>

          {/* Category */}
          <Frame className="w-full flex-col">
            <Label required text="Category" size="xs" />
            <Dropdown name="category" size="sm" width="100%" options={contactTopics} defaultValue="Other" />
          </Frame>

          {/* Description */}
          <Frame className="w-full flex-col">
            <Label required text="Description" size="xs" />
            <Textarea required size="sm" name="description" placeholder="Tell us what happened, and what you expected instead." />
          </Frame>

          {/* Attachment */}
          <Frame className="w-full flex-col">
            <Label text="Attachment" size="xs" />
            <input
              type="file"
              aria-label="Attachment"
              accept="image/*,.pdf,.csv,.xlsx"
              onChange={readAttachment}
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)] text-[length:var(--bodySize-xs)]"
            />

            {attachment ? (
              <Frame className="w-full items-center justify-between gap-[var(--space-sm)] mt-[var(--space-xs)]">
                <Paragraph size="xxs">
                  {attachment.name} - {Math.max(1, Math.round(attachment.size / 1024))} KB
                </Paragraph>

                <Button variant="ghost" size="xxs" iconName="icon-x" iconColor="textColor2" func={() => setAttachment(null)}>
                  Remove
                </Button>
              </Frame>
            ) : (
              <Paragraph size="xxs" weight="light">
                A screenshot, or the file you were working with, helps us answer faster.
              </Paragraph>
            )}
          </Frame>

          {/* Submit */}
          <Frame className="w-full justify-end">
            <Button variant="fill" role="submit" size="md" propagate disabled={isSending}>
              {isSending ? "Sending..." : "Submit"}
            </Button>
          </Frame>

        </Frame>
      </Form>
    </Card>
  )
}
