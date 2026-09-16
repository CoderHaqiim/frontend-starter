import { http } from "@/src/http/client"
import { Profile } from "@/src/types/types"

export const profileQueryKey = ["profile"]

export function getProfile() {
  return http<Profile>("/api/profile")
}
