import { account as profile } from "@/src/data/account"
import { Profile } from "@/src/types/types"
import { isCurrencyCode } from "@/src/utils/currencySymbol"
import { toText } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

// The personal information of the signed in user, the way the settings page and
// the profile button and card read it. The currency is the account currency the
// account settings list shows, and the one the routes that report money read, so
// every amount the app shows is reported in it.

// The fields the profile forms own. The id belongs to the server, so it is never
// taken from a body.
const updatableFields = [
  "profilePicture",
  "userName",
  "firstName",
  "lastName",
  "email",
  "phone",
  "currency",
] as const

// Kept simple on purpose: the mock only has to tell a filled address from a
// malformed one.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET() {
  return NextResponse.json(profile)
}

// Saves the personal information the settings page edits. The fields that are not
// sent keep the values they hold, so the details and the photo can be saved on
// their own.
export async function PATCH(request: Request) {
  const body = await request.json()

  const updates: Partial<Profile> = {}

  for (const field of updatableFields) {
    if (body[field] === undefined) continue

    const value = toText(body[field])

    if (!value) {
      return NextResponse.json({ message: `${field} is required` }, { status: 400 })
    }

    if (field === "email" && !emailPattern.test(value)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
    }

    // The account currency is saved as a code the currency helper knows, so the
    // symbol it maps to is always available. Codes are stored upper case, the way
    // the helper reads them.
    if (field === "currency" && !isCurrencyCode(value)) {
      return NextResponse.json({ message: `Unsupported currency ${value}` }, { status: 400 })
    }

    updates[field] = field === "currency" ? value.toUpperCase() : value
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ message: "No profile fields to update" }, { status: 400 })
  }

  Object.assign(profile, updates)

  return NextResponse.json({
    message: "Profile updated successfully",
    data: profile,
  })
}

// Removes the account the signed in user holds. The mock keeps a single record, so
// its values are cleared the way a deleted business is spliced out of the store,
// and the settings page, the profile button and the profile card stop showing
// them.
export async function DELETE() {
  const deletedProfile = { ...profile }

  Object.assign(profile, {
    profilePicture: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currency: "",
  })

  return NextResponse.json({
    message: "Account deleted successfully",
    data: deletedProfile,
  })
}