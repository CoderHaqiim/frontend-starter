export type HttpOptions = RequestInit

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

/*
 * Every route words its own failures - "Business not found", "Passwords do not
 * match" - so that message is what the caller is told. It is the message a toast
 * shows, which is why a failed request says what went wrong instead of only
 * saying that a request failed.
 */
const readFailureMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as { message?: unknown } | null
    const message = body?.message

    if (typeof message === "string" && message.length > 0) {
      return message
    }
  } catch {
    // The route answered with nothing to read, so the status names it below.
  }

  return `The request failed (${response.status}).`
}

export async function http<Type>(url: string, body?: unknown, options?: HttpOptions): Promise<Type> {
  const { headers, ...restOptions } = options || {}

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      // credentials:"include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...restOptions,
      body: body ? JSON.stringify(body) : undefined
    })

    if (!res.ok) {
      throw new Error(await readFailureMessage(res))
    }

    return (await res.json()) as Type
  } catch (error) {
    // A request that never reached a route - the server is down, the connection
    // dropped - fails here instead, so it is named here as well.
    if (error instanceof Error) throw error

    throw new Error("The request could not be completed. Please try again.")
  }
}
