import { IntegrationDefinition } from "@/src/types/integrations"

/*
 * WhatsApp, as the interface this app is run from.
 *
 * The user messages us from their own WhatsApp - the number that writes is the number we
 * answer - and what happens next is the app being used: they ask how much they sold, add a
 * customer, raise an invoice, record a payment, tick a task off. The agent is not a helper
 * beside the app, it is the way the app is used, exactly as the screens are, so what the
 * user grants here is access to the app itself.
 *
 * There is nothing to connect and no account to pick: it is their own WhatsApp, so the only
 * thing left to decide is what it may reach. The list below is the app's own surface - the
 * figures, the businesses, the customers, the invoices and receipts, the transactions, the
 * inventory, the tasks and the schedules - plus sending a document to a customer. Each
 * answer is sent to the backend as it is switched, and the backend is what carries it out.
 *
 * Everything starts off, because the user is the one letting their WhatsApp in. Account and
 * security settings are deliberately not part of this list: a password change or a deletion
 * is not something to hand to a chat, so it stays in the app.
 */
export const whatsappDefinition: IntegrationDefinition = {
  provider: "whatsapp",
  name: "WhatsApp",
  description: "Run your business from your own WhatsApp, as if it were the app itself.",
  howItWorks:
    "Message us from your own WhatsApp - the number that writes is the one we answer - and what you switch on below is what that chat may use in this app. It is your WhatsApp, so what you allow here is the same access you have in the app, and only the parts you allow.",
  summaryHeading: "You can ask things like",
  // What this is for, in the user's own words, so the reach of it is concrete.
  summary: [
    "How many customers did I add this week?",
    "What did I sell today, and what is still unpaid?",
    "Add Amina Bello as a customer.",
    "Raise an invoice for Ade Stores and take the payment.",
    "Tick off the restock task and email the receipt.",
  ],
  permissions: [
    {
      id: "figures",
      name: "Your figures",
      explanation:
        "Totals and trends across your businesses - what the dashboard shows: what you sold, what came in, what is still unpaid.",
      risk: "read",
    },
    {
      id: "businesses",
      name: "Your businesses",
      explanation:
        "The businesses on your account and how each one is set up, including which one a chat is talking about and changes made to a business's details.",
      risk: "write",
    },
    {
      id: "customers",
      name: "Your customers",
      explanation:
        "Your customer records: reading them, adding a new customer, and correcting or removing one you already have.",
      risk: "write",
    },
    {
      id: "invoices",
      name: "Your invoices",
      explanation:
        "The invoices you have issued: reading them, raising a new one, changing one, and seeing what is still owed.",
      risk: "write",
    },
    {
      id: "receipts",
      name: "Your receipts",
      explanation: "The receipts you have issued: reading them, recording a new one, and changing one.",
      risk: "write",
    },
    {
      id: "transactions",
      name: "Your transactions",
      explanation: "The money in and out of your businesses: reading them and recording a new one.",
      risk: "write",
    },
    {
      id: "inventory",
      name: "Your inventory",
      explanation: "The items you stock and how many are on hand: reading them and changing the count.",
      risk: "write",
    },
    {
      id: "tasks",
      name: "Your tasks",
      explanation: "What is on your list: reading your tasks, adding one, and ticking one off.",
      risk: "write",
    },
    {
      id: "schedules",
      name: "Your schedules",
      explanation: "The dates and appointments you keep in the app: reading them, adding one, and changing one.",
      risk: "write",
    },
    {
      id: "emails",
      name: "Emails to your customers",
      explanation:
        "Lets a chat email an invoice or a receipt to a customer. The sending itself runs on the Google permission on the Google card, so it happens only when that is on there too.",
      risk: "send",
    },
  ],
}
