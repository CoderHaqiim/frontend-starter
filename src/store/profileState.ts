import { create } from "zustand"
import { Profile } from "../types/types"

type ProfileStateTypes = {
    profileOpen : boolean
    profileData: Profile | null
    profileLoading: boolean
    profileError: string | null
    setProfileOpen: (newSelection: boolean) => void
    fetchProfile: () => Promise<void>
}

export const useProfileState = create<ProfileStateTypes>((set, get) => ({
    profileOpen : false ,
    profileData: null,
    profileLoading: false,
    profileError: null,
    setProfileOpen: (newSelection: boolean) => set({profileOpen: newSelection}),
    fetchProfile: async () => {
        if (get().profileData || get().profileLoading) return

        set({ profileLoading: true, profileError: null })

        try {
            const response = await fetch("/api/profile")

            if (!response.ok) {
                throw new Error("Failed to fetch profile")
            }

            const profileData = await response.json() as Profile
            set({ profileData, profileLoading: false })
        } catch (error) {
            set({
                profileLoading: false,
                profileError: error instanceof Error ? error.message : "Unable to load profile",
            })
        }
    },
}))