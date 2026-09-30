import { readIntegrationSummaries } from "@/src/data/integrations"
import { NextResponse } from "next/server"

/*
 * The list behind the Integrations screen: one entry per integration, with what the user
 * has allowed on it. The answer carries what the screen shows and nothing more - no
 * credential, no token and no provider detail of any kind.
 */
export async function GET() {
  return NextResponse.json(readIntegrationSummaries())
}
