import { readIntegrationDetail } from "@/src/data/integrations"
import { NextResponse } from "next/server"
import { readProviderParam, unknownProviderResponse, ProviderRouteParams } from "../_shared"

/*
 * The permissions panel's answer for one integration: the permissions it offers and the
 * answer the user has given each one.
 */
export async function GET(_request: Request, { params }: ProviderRouteParams) {
  const provider = await readProviderParam(params)

  if (!provider) return unknownProviderResponse()

  return NextResponse.json(readIntegrationDetail(provider))
}
