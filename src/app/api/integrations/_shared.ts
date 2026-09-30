import { isIntegrationProvider } from "@/src/integrations/registry"
import { IntegrationProblem, IntegrationProvider } from "@/src/types/integrations"
import { NextResponse } from "next/server"

/*
 * Helpers shared by the integration routes.
 *
 * One rule they all follow: a request that was understood answers 200, even when the
 * outcome is a state the user has to answer - a permission the integration does not have.
 * The problem travels in the body, in the copy the screen shows, so a state is never
 * turned into an opaque thrown error. Only a malformed request and an unknown integration
 * answer otherwise.
 */

export type ProviderRouteParams = { params: Promise<{ provider: string }> }

export async function readProviderParam(
  params: ProviderRouteParams["params"],
): Promise<IntegrationProvider | null> {
  const { provider } = await params

  return isIntegrationProvider(provider) ? provider : null
}

export function unknownProviderResponse() {
  return NextResponse.json({ message: "Unknown integration" }, { status: 404 })
}

// The state the user has to answer, described in the words the screen shows.
export function problemResponse(problem: IntegrationProblem) {
  return NextResponse.json({ message: problem.message, problem })
}
