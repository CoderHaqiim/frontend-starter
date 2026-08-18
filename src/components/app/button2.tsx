import { Children, CSSProperties, ReactNode } from "react";
import Button from "../ui/primitives/button";
import { SizeType } from "@/src/types/types";
import { colors } from "@/src/app/design/colors";
import { IconType } from "../ui/primitives/icon";

type button2Props = {
    children: ReactNode,
    size: SizeType,
    iconName?: IconType,
    iconPosition?: "left" | "right"
}

export default function Button2({size, iconPosition, iconName, children}:button2Props) {
  return (
    <Button iconColor="accent" iconName={iconName} iconPosition={iconPosition} variant="outline" size={size} specificStyles={{
        border:`solid 1px ${colors["accent"]}`,
        color: colors["accent"]
    }}>
        {children}
    </Button>
  )
}
