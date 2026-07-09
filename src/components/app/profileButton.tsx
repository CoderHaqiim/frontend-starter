import Button from "../ui/primitives/button"
import Avatar from "../ui/composites/avatar"
import { bodySize } from "@/src/app/design/typograhy"
import { useUserState } from "@/src/store/userState";



export default function ProfileButton() {
 const {userState} = useUserState();

  return (
    <Button width="stretch" size="xl" variant="outline" rounded="sm" justify="start">
        <Avatar/>
        <span className="flex flex-col justify-center items-start">
            <span className="block leading-[1] text-[var(--bodySize-md)] font-[var(--fontWeight-bold)]">
                {userState.username}
            </span>
            <span className="block text-[length:var(--bodySize-xs)] text-[color:var(--color-textColor2)]">
                {userState.role}
            </span>
        </span>
    </Button>
  )
}
