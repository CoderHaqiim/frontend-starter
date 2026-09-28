"use client"

import { shadow3 } from "@/src/app/design/shadows"
import { getProfile, profileQueryKey } from "@/src/services/profileService"
import { useProfileState } from "@/src/store/profileState"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Avatar from "../../base/ui/composites/avatar"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"

export default function ProfileCard() {
    const { profileOpen, setProfileOpen } = useProfileState()
    const router = useRouter()
    const {data: profileData} = useQuery({
      queryKey: profileQueryKey,
      queryFn: getProfile,
    })
    
    const closeProfile = () => {
        setProfileOpen(false)
    }

    const logout = () => {
      router.push("/login")
    }

  return (
    <Card width="100%" height="max-content" padding="md" gap="md" className={`${profileOpen? "flex" : "hidden"} ${shadow3}`}>

      <Button variant="ghost" func={closeProfile} size="xs" className="z-[200] right-[var(--space-sm)] top-[var(--space-sm)]" isIcon iconName="icon-x" 
        specificStyles={{
        position: "absolute"
      }}/>

      {/* Profile */}
      <Frame className="w-full items-center gap-[var(--space-md)]">
        {/* Avatar */}
        <Avatar size="md" src={profileData?.profilePicture}/>

        <Frame className="flex-col">
          <Heading type="h2" size="sm">
            {profileData?.userName ?? "Loading..."}
          </Heading>
        </Frame>
      </Frame>

      {/* Stats */}
      <Frame className="w-full grid grid-cols-3 gap-[var(--space-sm)]">
        <Frame className="flex-col gap-[var(--space-xxs)] p-[var(--space-xs)] rounded-[var(--radius-sm)]">
          <Paragraph size="xxs">
            Businesses
          </Paragraph>

          <Paragraph size="sm" weight="semiBold" className="leading-[1]" color="textColor1">
            {"—"}
          </Paragraph>
        </Frame>

        <Frame className="flex-col gap-[var(--space-xxs)] p-[var(--space-xs)] rounded-[var(--radius-sm)]">
          <Paragraph size="xxs">
            Tasks
          </Paragraph>

          <Paragraph size="sm" className="leading-[1]" weight="semiBold" color="textColor1" >
            12
          </Paragraph>
        </Frame>

        <Frame className="flex-col gap-[var(--space-xxs)] p-[var(--space-xs)] rounded-[var(--radius-sm)]">
          <Paragraph size="xxs">
            Completed
          </Paragraph>

          <Paragraph size="md" weight="semiBold" className="leading-[1]" color="textColor1" >
            8
          </Paragraph>
        </Frame>
      </Frame>

      {/* Logout */}
      <Frame className="w-full">
        <Button variant="outline" func={logout} size="sm" specificStyles={{
            width: "100%"
        }}>
          Logout
        </Button>
      </Frame>
    </Card>
  )
}
