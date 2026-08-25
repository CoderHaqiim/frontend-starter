"use client"

import Card from "../../ui/composites/card"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import Button from "../../ui/primitives/button"
import Avatar from "../../ui/composites/avatar"
import { shadow3 } from "@/src/app/design/shadows"
import { useProfileState } from "@/src/store/profileState"
import { useRouter } from "next/navigation"

export default function ProfileCard() {
    const { profileOpen, setProfileOpen } = useProfileState()
    const router = useRouter()
    
    const closeProfile = () => {
        setProfileOpen(false)
    }

    const logout = () => {
      router.push("/login")
    }

  return (
    <Card width="100%" height="max-content" padding="lg" gap="md" className={`${profileOpen? "flex" : "hidden"} ${shadow3}`}>

      <Button variant="ghost" func={closeProfile} size="sm" className="z-[200] right-[var(--space-sm)] top-[var(--space-sm)]" isIcon iconName="icon-x" 
        specificStyles={{
        position: "absolute"
      }}/>

      {/* Profile */}
      <Frame className="w-full items-center gap-[var(--space-md)]">
        {/* Avatar */}
        <Avatar size="md"/>

        <Frame className="flex-col gap-[var(--space-xxs)]">
          <Heading type="h2" size="sm">
            Haqiim Jaye
          </Heading>

          <Paragraph size="xs" color="textColor2">
            Business Owner
          </Paragraph>
        </Frame>
      </Frame>

      {/* Stats */}
      <Frame className="w-full grid grid-cols-3 gap-[var(--space-sm)]">
        <Frame className="flex-col gap-[var(--space-xxs)] p-[var(--space-xs)] rounded-[var(--radius-sm)]">
          <Paragraph size="xxs">
            Businesses
          </Paragraph>

          <Paragraph size="sm" weight="semiBold" className="leading-[1]" color="textColor1">
            4
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