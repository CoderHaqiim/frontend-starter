import { IntegrationDefinition, IntegrationProvider } from "@/src/types/integrations"
import { googleDefinition } from "./google"
import { whatsappDefinition } from "./whatsapp"

/*
 * The integrations this app offers. One definition each, so the routes and the screen
 * read the same copy and a provider added here shows up on the Integrations screen
 * without the screen knowing anything about it.
 */
export const integrationDefinitions: IntegrationDefinition[] = [whatsappDefinition, googleDefinition]

export function isIntegrationProvider(value: string): value is IntegrationProvider {
  return integrationDefinitions.some((definition) => definition.provider === value)
}

export function getIntegrationDefinition(provider: IntegrationProvider): IntegrationDefinition {
  return integrationDefinitions.find((definition) => definition.provider === provider) ?? whatsappDefinition
}
