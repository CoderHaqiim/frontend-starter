import { updateIntegrationPermissions } from "@/src/data/integrations"
import { badRequestResponse, readBody } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"
import { problemResponse, ProviderRouteParams, readProviderParam, unknownProviderResponse } from "../../_shared"

/*
 * The permissions this app owns, which only the user decides.
 *
 * One shape arrives here: { permissions: ["customers", "invoices"] } - the whole list the
 * user left switched on, sent once when they save rather than as the switches move. It is
 * the whole of what the screen sends, and what is stored from it is what the backend reads
 * to know what this may do for the user.
 *
 * A list is always a list: an empty one is how every permission is turned off, and a name
 * the integration does not have fails the whole save instead of being dropped.
 */
export async function PUT(request: Request, { params }: ProviderRouteParams) {
  const provider = await readProviderParam(params)

  if (!provider) return unknownProviderResponse()

  const body = (await readBody(request)) ?? {}
  const permissionIds = readPermissionIds(body.permissions)

  if (!permissionIds) {
    return badRequestResponse('permissions has to be a list of permission ids, e.g. { "permissions": [] }')
  }

  const saved = updateIntegrationPermissions(provider, permissionIds)

  if (saved.problem) return problemResponse(saved.problem)

  return NextResponse.json({
    message:
      permissionIds.length > 0
        ? `${permissionIds.length} permission${permissionIds.length === 1 ? "" : "s"} saved.`
        : "Every permission was turned off.",
    data: saved.detail,
  })
}

// The ids as they arrived, or null when the body is not a list of names. A single wrong
// entry is a malformed request rather than something to skip over quietly.
function readPermissionIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null

  const permissionIds: string[] = []

  for (const entry of value) {
    if (typeof entry !== "string" || !entry.trim()) return null

    permissionIds.push(entry.trim())
  }

  return permissionIds
}
