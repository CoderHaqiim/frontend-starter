import { getProfile, profileQueryKey } from "@/src/services/profileService";
import { useProfileState } from "@/src/store/profileState";
import { useQuery } from "@tanstack/react-query";
import Avatar from "../base/ui/composites/avatar";
import Button from "../base/ui/primitives/button";
import Frame from "../base/ui/primitives/frame";
import ProfileCard from "./cards/profileCard";




export default function ProfileButton() {
 const {setProfileOpen} = useProfileState()

 const {data: profileData} = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
 })

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
                padding: `var(--space-lg) var(--space-md)`,
                width: "100%",
                backgroundColor:"transparent",
                border:"solid 1px var(--color-outline1)"
            }}>
            <Avatar size="sm" src={profileData?.profilePicture}/>
            <span className="block leading-[1] text-[length:var(--bodySize-sm)] font-[var(--fontWeight-semiBold)]">
                {profileData?.userName ?? "Loading..."}
            </span>
        </Button>
    </Frame>
  )
}
