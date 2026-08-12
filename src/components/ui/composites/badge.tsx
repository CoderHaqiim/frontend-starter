
"use client"

import Frame from "../primitives/frame";
import { SizeType } from "@/src/types/types";
import { IconType } from "../primitives/icon";
import { elementSizes } from "@/src/app/design/sizes";
import Icon from "../primitives/icon";
import { ColorTypes } from "@/src/app/design/colors";
import { generateLightBackground } from "@/src/utils/healthBackground";
import { paddingSizes } from "@/src/app/design/sizes";
import Paragraph from "../primitives/paragraph";
import { useTheme } from "../../app/themeProvider";

type BadgeProps = {
  color: ColorTypes;
  bg?: ColorTypes;
  size?: SizeType;
  iconName?: IconType;
  className?: string;
  text?:string;
};

export default function Badge({
  text,
  color,
  bg,
  size = "sm",
  iconName,
  className,
}: BadgeProps) {

  const {colors} = useTheme()
  const background = generateLightBackground(color)

  return (
    <Frame align="center" rounded="lg" height="hug" justify="center" className={`${elementSizes[size]} ${paddingSizes[size]} ${className}`} specificStyles={{
      color: colors[color],
      backgroundColor: (bg && colors[bg]) ?? colors[background],
      border: `solid 1px ${colors[background]}`
    }}>
      {iconName && <Icon size={size} name={iconName}/>}
      <Paragraph weight="medium" size={size} color={color}>{text}</Paragraph>
    </Frame>
  );
}
