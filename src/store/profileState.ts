import { create } from "zustand"

type ProfileStateTypes = {
    profileOpen : boolean
    setProfileOpen: (newSelection: boolean) => void
}

export const useProfileState = create<ProfileStateTypes>((set) => ({
    profileOpen : false ,
    setProfileOpen: (newSelection: boolean) => set({profileOpen: newSelection}),
}))
