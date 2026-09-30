import { readBody, toText } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

/*
 * The password reset the account settings row asks for. The form sends the account
 * email next to the password the account is signed in with, and the route answers
 * the way a reset route does: the pair is checked and a reset link is sent to the
 * address instead of a new password being handed back.
 *
 * There is no credential store behind the mock, so the current password is only
 * checked for being filled in. The address is checked the way the profile route
 * checks the email it saves.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await readBody(request)

  if (!body) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 })
  }

  const email = toText(body.email)
  const currentPassword = toText(body.currentPassword)

  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 })
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
  }

  if (!currentPassword) {
    return NextResponse.json({ message: "currentPassword is required" }, { status: 400 })
  }

  return NextResponse.json({
    message: `A password reset link was sent to ${email}.`,
    data: { email },
  })
}
