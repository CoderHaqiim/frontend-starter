import { http } from "@/src/http/client"
import {
  IntegrationDetail,
  IntegrationProblem,
  IntegrationProvider,
  IntegrationSummary,
} from "@/src/types/integrations"

/*
 * The integration routes, as the screen calls them.
 *
 * Two answer shapes arrive from them: a call that was understood answers with a message
 * and the data it produced, and a call whose outcome is a state the user has to answer - a
 * permission the integration does not have - answers with the problem that explains it.
 * Both are the route working, so both are read here rather than turned into a thrown
 * error, which is what lets the screen always say what happened.
 */

export const integrationsQueryKey = ["integrations"]

export function integrationQueryKey(provider: IntegrationProvider) {
  return ["integration", provider]
}

export type IntegrationOutcome<Data> = { message: string; data: Data }
export type IntegrationProblemOutcome = { message: string; problem: IntegrationProblem }
export type IntegrationOutcomeResponse<Data> = IntegrationOutcome<Data> | IntegrationProblemOutcome

// True when the answer is a state the screen explains instead of data it shows.
export function isProblemOutcome<Data>(
  response: IntegrationOutcomeResponse<Data>,
): response is IntegrationProblemOutcome {
  return "problem" in response && Boolean(response.problem)
}

export function getIntegrations() {
  return http<IntegrationSummary[]>("/api/integrations")
}

export function getIntegration(provider: IntegrationProvider) {
  return http<IntegrationDetail>(`/api/integrations/${provider}`)
}

/*
 * Saving the permissions the user left switched on, as one list.
 *
 * The whole list goes at once, because the switches are answered together and saved when the
 * user is done - nothing travels as they are moved. The list the server holds after it is
 * what the backend reads to know what this may do for the user.
 */
export function updateIntegrationPermissions(provider: IntegrationProvider, permissionIds: string[]) {
  return http<IntegrationOutcomeResponse<IntegrationDetail>>(
    `/api/integrations/${provider}/permissions`,
    { permissions: permissionIds },
    { method: "PUT" },
  )
}
