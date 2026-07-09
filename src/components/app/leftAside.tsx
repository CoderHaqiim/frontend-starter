"use client";
import Aside from "../layout/aside";
import LinkComponent from "../ui/primitives/link";
import { navItems } from "@/src/utils/navItems";
import Frame from "../ui/primitives/frame";
import { space } from "@/src/app/design/spacing";
import { colors } from "@/src/app/design/colors";
import Button from "../ui/primitives/button";
import { useUserState } from "@/src/store/userState";
import {bodySize} from "@/src/app/design/typograhy";
import Avatar from "../ui/composites/avatar";
import SubscriptionCard from "./cards/subscriptionCard";
import ProfileButton from "./profileButton";

export default function LeftAside() {
    const {userState} = useUserState();

  return (
    <Aside variant="left" className="w-[260px] bg-[var(--color-white)] flex-col justify-between items-center">
        <Frame width="stretch" height="hug" direction="column">
            {
                navItems.map(item =>
                    <LinkComponent key={item.id} href={item.link} size="md" text={item.text} iconName={item.icon} iconPosition="left" variant="nav" id={item.id} />
                )
            }
        </Frame>
        <Frame width="stretch" height="hug" direction="column" specificStyles={{ gap: space["md"]}}>
            <SubscriptionCard/>
            <ProfileButton/>
        </Frame>
    </Aside>
  )
}