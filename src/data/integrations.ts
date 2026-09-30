import { getIntegrationDefinition, integrationDefinitions } from "@/src/integrations/registry"
import {
  IntegrationDetail,
  IntegrationPermission,
  IntegrationProblem,
  IntegrationProvider,
  IntegrationSummary,
} from "@/src/types/integrations"

/*
 * The store behind the integration routes.
 *
 * The only thing kept here is what the user has allowed: one list of permission ids per
 * integration. There is no connection, no account and no credential, because there is
 * nothing to connect - the screen asks the user, this holds the answer, and the backend
 * reads it to know what it may do for them.
 *
 * It is parked on globalThis for the reason the app's other stores are: Next.js gives
 * every route module its own copy of a plain export, and the list one route writes has to
 * be the one the next route reads. There is no database behind it, so a restart reseeds
 * and every permission starts off.
 */
type IntegrationStore = {
  allowedPermissions: Record<IntegrationProvider, string[]>
}

const seedStore: IntegrationStore = {
  allowedPermissions: {
    whatsapp: [],
    google: [],
  },
}

const globalStore = globalThis as typeof globalThis & { integrationStore?: IntegrationStore }

export const integrationStore: IntegrationStore = globalStore.integrationStore ?? seedStore

globalStore.integrationStore = integrationStore

/*
 * What the user has allowed, read through one place. The store is parked on globalThis, so
 * a development reload can hand this process a store made before the list existed; reading
 * it this way keeps that from being a crash in the screen.
 */
function allowedPermissionsFor(provider: IntegrationProvider): string[] {
  return integrationStore.allowedPermissions?.[provider] ?? []
}

// The write side of the same list, which creates it if this process holds a store that was
// made before it existed.
function setAllowedPermissions(provider: IntegrationProvider, permissionIds: string[]) {
  const allowed = integrationStore.allowedPermissions ?? ({} as Record<IntegrationProvider, string[]>)

  allowed[provider] = permissionIds
  integrationStore.allowedPermissions = allowed
}

// The permissions an integration offers, each with the answer the user has given it.
function readPermissions(provider: IntegrationProvider): IntegrationPermission[] {
  const definition = getIntegrationDefinition(provider)
  const allowed = allowedPermissionsFor(provider)

  return definition.permissions.map((permission) => ({
    id: permission.id,
    name: permission.name,
    explanation: permission.explanation,
    risk: permission.risk,
    enabled: allowed.includes(permission.id),
  }))
}

/*
 * What one card on the Integrations screen reads.
 *
 * The count is what the user has allowed out of what the integration offers, and it is the
 * whole of the card's state: there is no connection for it to report, because there is
 * nothing to connect.
 */
export function readIntegrationSummaries(): IntegrationSummary[] {
  return integrationDefinitions.map((definition) => {
    const permissions = readPermissions(definition.provider)

    return {
      provider: definition.provider,
      name: definition.name,
      description: definition.description,
      allowedCount: permissions.filter((permission) => permission.enabled).length,
      permissionCount: permissions.length,
      actionLabel: "Permissions",
    }
  })
}

// One integration, with everything the permissions panel shows.
export function readIntegrationDetail(provider: IntegrationProvider): IntegrationDetail {
  const definition = getIntegrationDefinition(provider)
  const permissions = readPermissions(provider)

  return {
    provider: definition.provider,
    name: definition.name,
    description: definition.description,
    summary: definition.summary,
    allowedCount: permissions.filter((permission) => permission.enabled).length,
    permissionCount: permissions.length,
    actionLabel: "Permissions",
    permissions,
  }
}

/*
 * Saving what the user allowed, as one list.
 *
 * This is the only change the screen can make, and it is the whole of what the backend is
 * told: the list this writes is the list it reads. The list arrives whole, because the user
 * answers the switches together and saves when they are done - so what is stored is what
 * they saw on screen, not a sequence of moves.
 *
 * A permission the integration does not have fails the whole save rather than being quietly
 * dropped: a list that names something that does not exist is a mistake on the way in, and
 * storing part of it would leave the user with answers they never gave.
 */
export function updateIntegrationPermissions(
  provider: IntegrationProvider,
  permissionIds: string[],
): { detail?: IntegrationDetail; problem?: IntegrationProblem } {
  const definition = getIntegrationDefinition(provider)
  const known = new Set(definition.permissions.map((entry) => entry.id))
  const unknown = [...new Set(permissionIds)].filter((permissionId) => !known.has(permissionId))

  if (unknown.length > 0) {
    return {
      problem: {
        title: "That permission does not exist",
        message: `${definition.name} has no permission called ${unknown
          .map((permissionId) => `"${permissionId}"`)
          .join(", ")}, so nothing was saved.`,
        nextStep: "Open the screen again and switch one of the permissions listed there.",
      },
    }
  }

  setAllowedPermissions(provider, [...new Set(permissionIds)])

  return { detail: readIntegrationDetail(provider) }
}
