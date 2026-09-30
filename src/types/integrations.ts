/*
 * The model behind the Integrations screen.
 *
 * WhatsApp and Google are the two integrations this app offers, and they are the same
 * kind of thing: a list of what the user allows this app to do, which is handed to the
 * backend as the user sets it. Nothing is connected here and no account is authorized -
 * the frontend's whole job is to ask for the permission and send it on, and the backend
 * is what acts on it.
 *
 * A definition is the one copy of what an integration offers, read by the routes and by
 * the screen alike (see src/integrations), so adding an integration is adding a
 * definition and nothing else. No token, secret, scope or account is part of this model:
 * it holds only what the user is shown and answers.
 */

export type IntegrationProvider = "whatsapp" | "google"

// What a permission does with the user's data. "read" only looks at what this app already
// holds; "send" and "write" add or change something, so the screen marks them differently.
export type PermissionRisk = "read" | "send" | "write"

// One thing an integration may do for the user, in their words.
export type IntegrationPermissionDefinition = {
  id: string
  name: string
  explanation: string
  risk: PermissionRisk
}

/*
 * The static description of an integration: the words the screen uses for it, how it
 * works, what it is for, and the permissions the user answers for. It is plain data with
 * no methods, so the routes and the screen read the same single copy of it.
 *
 * The words live here rather than in a screen because the two integrations do not work the
 * same way: WhatsApp is the interface the user already has open, and Google is an account
 * this app works through. A screen that wrote its own sentence would describe one of them
 * wrongly for the other.
 */
export type IntegrationDefinition = {
  provider: IntegrationProvider
  name: string
  description: string
  // One sentence on how this integration works, shown above the switch list.
  howItWorks: string
  // The heading above `summary`.
  summaryHeading: string
  // What this is for, in the user's words, shown above the switches.
  summary: string[]
  permissions: IntegrationPermissionDefinition[]
}

// One permission with the answer the user has given it. This is what the screen switches
// and what the server holds.
export type IntegrationPermission = {
  id: string
  name: string
  explanation: string
  risk: PermissionRisk
  enabled: boolean
}

/*
 * What one card on the Integrations screen reads. The count is what the row shows, so a
 * card never has to read the whole detail to say where the user stands.
 */
export type IntegrationSummary = {
  provider: IntegrationProvider
  name: string
  description: string
  // How many of the integration's permissions the user has allowed, out of how many.
  allowedCount: number
  permissionCount: number
  // The button the card offers, which is always the list of permissions.
  actionLabel: string
}

// One integration, with everything the permissions panel shows.
export type IntegrationDetail = IntegrationSummary & {
  summary: string[]
  permissions: IntegrationPermission[]
}

/*
 * A failure the screen shows instead of data, in the terms a person can act on. It
 * carries what happened and what to do about it, so no screen has to invent its own
 * wording and no failure is left without a way out.
 */
export type IntegrationProblem = {
  title: string
  message: string
  nextStep: string
}
