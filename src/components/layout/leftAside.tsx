"use client";
import Aside from "./aside";
import LinkComponent from "../ui/primitives/link";
import { navItems } from "@/src/utils/navItems";
import Frame from "../ui/primitives/frame";
import { space } from "@/src/app/design/spacing";
import { colors } from "@/src/app/design/colors";
import { radius } from "@/src/app/design/radius";
import Button from "../ui/primitives/button";
import Icon from "../ui/primitives/icon";
import { useUserState } from "@/src/store/user";
import {bodySize} from "@/src/app/design/typograhy";
import Avatar from "../ui/composites/avatar";
import Card from "../ui/composites/card";
import Heading from "../ui/primitives/heading";
import Paragraph from "../ui/primitives/paragraph";

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
                    <LinkComponent key={item.id} href={item.link} size="md" text={item.text} iconName={item.icon} iconPosition="left" variant="nav-link" id={item.id} />
                )
            }
        </Frame>
        <Frame width="stretch" height="hug" direction="column"
            specificStyles={{
                gap: space["md"]
            }}>
            <Card 
                width="stretch" 
                height="hug" 
                padding="lg"
                rounded="md"
                specificStyles={{
                    backgroundColor: colors["accent2"],
                    gap: space["md"]
                }}>
                <Frame direction="column">
                    <Heading text="Subscription" size="sm" type="h2"/>
                    <Paragraph size="sm">
                        Plan: Free
                    </Paragraph>
                </Frame>
                <Button variant="text" size="sm" text="Manage Subscription"/>
            </Card>
            <Button 
                size="lg" 
                variant="custom"

                specificStyles={{
                    width:"100%",
                    height:"50px",
                    backgroundColor:"transparent",
                    borderRadius: radius["md"],
                    color: colors["textColor1"],
                    border: `solid 1px ${colors["outline"]}`,
                    justifyContent: "left",
                    alignItems: "center",
                }}>
                <Avatar/>
                <span className="flex flex-col justify-center gap-[2px] items-start">
                    <span className="block font-(--fontWeight-bold)"
                        style={{
                            fontSize: bodySize["md"]
                        }}
                    >
                        {userState.username}
                    </span>
                    <span className=
                    "block text-(--color-textColor2) font-(--fontWeight-normal)"
                        style={{
                            color: "var(--color-textColor2)",
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