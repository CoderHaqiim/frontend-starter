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

export default function LeftAside() {
    const {userState} = useUserState();

  return (
    <Aside variant="left" 
        specificStyles={{
            width:"260px", 
            backgroundColor: colors["white"],
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            alignItems:"center",
        }}
    >
        <Frame width="stretch" height="hug" direction="column">
            {
                navItems.map(item =>
                    <LinkComponent key={item.id} href={item.link} size="md" text={item.text} iconName={item.icon} iconPosition="left" variant="nav" id={item.id} />
                )
            }
        </Frame>
        <Frame width="stretch" height="hug" direction="column"
            specificStyles={{
                gap: space["md"]
            }}>
            <SubscriptionCard/>
    
            <Button 
                width="stretch"
                size="xl" 
                variant="outline"
                rounded="sm"
                justify="start"
            >
                <Avatar/>
                <span className="flex flex-col justify-center items-start">
                    <span className="block font-(--fontWeight-bold)"
                        style={{
                            fontSize: bodySize["md"],
                            lineHeight:"1"
                        }}
                    >
                        {userState.username}
                    </span>
                    <span className=
                    "block text-(--color-textColor2) font-(--fontWeight-normal)"
                        style={{
                            color: colors["textColor2"],
                            fontSize: bodySize["xs"], 
                        }}
                    >
                            {userState.role}
                    </span>
                </span>
            </Button>
        </Frame>
    </Aside>
  )
}