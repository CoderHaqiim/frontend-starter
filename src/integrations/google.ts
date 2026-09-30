import { IntegrationDefinition } from "@/src/types/integrations"

/*
 * Google, as the parts of it this app actually uses.
 *
 * The app emails invoices and receipts to customers, and the schedules created here are
 * meant to land in the user's own calendar. Both happen from the user's Google account
 * once they have allowed it, so what they answer here is which of those the backend may
 * do for them.
 *
 * The list is the honest answer to "what does this app do with Google?" - sending mail
 * and adding calendar events - and nothing else. Drive, Docs, Sheets and Slides are not
 * used by this app at all and are not listed, because a permission that is never exercised
 * is a switch with nothing behind it.
 *
 * Nothing is asked for until the user switches it on, and the list they leave behind is
 * what the backend reads.
 */
export const googleDefinition: IntegrationDefinition = {
  provider: "google",
  name: "Google",
  description: "Send from your own Gmail address and keep your calendar in step.",
  howItWorks:
    "This app works through your own Google account rather than asking you to open it: what you switch on below is what it may do with that account, and nothing is done with it until you say so.",
  summaryHeading: "What this does for you",
  summary: [
    "Emails an invoice or a receipt to a customer from your own Gmail address, so it arrives from you and not from a stranger.",
    "Adds the schedules you create in this app to your Google Calendar, on the days you set them for.",
  ],
  permissions: [
    {
      id: "email-invoices",
      name: "Email invoices",
      explanation: "Lets this app email an invoice to a customer from your Gmail address.",
      risk: "send",
    },
    {
      id: "email-receipts",
      name: "Email receipts",
      explanation: "Lets this app email a receipt to a customer from your Gmail address.",
      risk: "send",
    },
    {
      id: "schedule-to-calendar",
      name: "Add schedules to your calendar",
      explanation:
        "Lets this app create a calendar event for a schedule you add here. The event it added can be changed or removed again.",
      risk: "write",
    },
  ],
}
