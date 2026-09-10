import { space } from "@/src/app/design/spacing";
import { useProfileState } from "@/src/store/profileState";
import { useEffect } from "react";
import Avatar from "../ui/composites/avatar";
import Button from "../ui/primitives/button";
import Frame from "../ui/primitives/frame";
import ProfileCard from "./cards/profileCard";



export default function ProfileButton() {
 const {setProfileOpen, profileData, fetchProfile} = useProfileState()

 useEffect( 
    () => {
     fetchProfile()
    }, [fetchProfile]
)

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
            <Avatar size="sm" src={profileData?.profilePicture}/>
            <span className="flex flex-col justify-center items-start">
                <span className="block leading-[1] text-[length:var(--bodySize-sm)] font-[var(--fontWeight-semiBold)]">
                    {profileData?.userName ?? "Loading..."}
                </span>
                <span className="block text-[length:var(--bodySize-xs)] text-[color:var(--color-textColor2)]">
                    {profileData?.userRole ?? ""}
                </span>
            </span>
        </Button>
    </Frame>
  )
}
