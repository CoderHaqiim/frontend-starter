import Button from "../ui/primitives/button"
import Avatar from "../ui/composites/avatar"
import { bodySize } from "@/src/app/design/typograhy"
import { useUserState } from "@/src/store/userState";
import ProfileCard from "./cards/profileCard";
import { space } from "@/src/app/design/spacing";
import Frame from "../ui/primitives/frame";
import { useProfileState } from "@/src/store/profileState";



export default function ProfileButton() {
 const {userState} = useUserState();
 const {setProfileOpen} = useProfileState()

 const openProfileCard = () => {
    setProfileOpen(true)
 }

  return (
    <Frame>
        <Frame className="bottom-[115%] left-0" specificStyles={{
            position: "absolute"
        }}>
            <ProfileCard/>
        </Frame>

        <Button size="xl" func={openProfileCard} variant="outline" rounded="lg" justify="start" showFocusRing={false} 
            specificStyles={{
                padding: space["md"],
                width: "100%",
                backgroundColor:"transparent"
            }}>
            <Avatar size="sm"/>
            <span className="flex flex-col justify-center items-start">
                <span className="block leading-[1] text-[length:var(--bodySize-sm)] font-[var(--fontWeight-semiBold)]">
                    {userState.username}
                </span>
                <span className="block text-[length:var(--bodySize-xs)] text-[color:var(--color-textColor2)]">
                    {userState.role}
                </span>
            </span>
        </Button>
    </Frame>
  )
}
