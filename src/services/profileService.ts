import { http } from "@/src/http/client"
import { Profile } from "@/src/types/types"

export const profileQueryKey = ["profile"]

export function getProfile() {
  return http<Profile>("/api/profile")
}

// The profile route answers with the saved record next to the message, the same
// shape the business routes use.
export type ProfileMutationResponse = {
  message: string
  data: Profile
}

// The route validates and trims the fields it knows, so a form body is passed on
// unchanged.
export function updateProfile(updates: Record<string, unknown>) {
  return http<ProfileMutationResponse>("/api/profile", updates, { method: "PATCH" })
}

// The delete account form removes the account through the profile route, the way
// the delete business form removes a business through its route.
export function deleteProfile() {
  return http<ProfileMutationResponse>("/api/profile", undefined, { method: "DELETE" })
}
