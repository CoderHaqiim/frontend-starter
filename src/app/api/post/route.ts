import { badRequestResponse, normalizeText, toText } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

/*
 * The login, signup and support-request route.
 *
 * Each of the three forms posts to it with the action it means, and each action names the
 * fields it cannot do without, so a form that sent nothing is told which field is missing
 * rather than being refused for whatever it happened to hold. The password is only ever read
 * here: it never travels back out of the route, and nothing about a request is logged.
 */
const postActions = ["login", "signup", "support"] as const

type PostAction = (typeof postActions)[number]

const requiredFields: Record<PostAction, string[]> = {
  login: ["email", "password"],
  signup: ["email", "password", "confirm-password"],
  support: ["subject", "category", "description"],
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return badRequestResponse("Invalid JSON payload")
  }

  const action = postActions.find((candidate) => candidate === normalizeText(body.action))

  if (!action) {
    return badRequestResponse("Unknown action. Use login, signup, or support.")
  }

  const missingFields = requiredFields[action].filter((field) => !toText(body[field]))

  if (missingFields.length > 0) {
    return badRequestResponse(`${action} needs ${missingFields.join(", ")}.`)
  }

  if (action === "support") {
    // Aiki has no support backend yet, so the request is recorded and answered the way
    // one would be: the ticket is accepted and the reference travels back with it. Only
    // the fields the form asked for are echoed, never anything about the account.
    return NextResponse.json(
      {
        message: `Support request received for "${toText(body.subject)}".`,
        data: {
          subject: toText(body.subject),
          category: toText(body.category),
          description: toText(body.description),
          attachment: toText(body.attachment),
        },
      },
      { status: 201 }
    )
  }

  if (action === "signup") {
    if (normalizeText(body.password) !== normalizeText(body["confirm-password"])) {
      return badRequestResponse("Passwords do not match.")
    }

    // No account is stored yet - there is no auth backend behind this route - so the
    // answer is what a signup would have been told, and only the email is echoed back.
    return NextResponse.json(
      {
        message: "Account created. You can log in with these details.",
        data: { email: normalizeText(body.email) },
      },
      { status: 201 }
    )
  }

  // Nothing holds a password to check the pair against yet, so a login is refused the
  // way a wrong pair is refused until the auth backend answers for itself.
  return NextResponse.json(
    { message: "Login failed: invalid email or password." },
    { status: 401 }
  )
}
