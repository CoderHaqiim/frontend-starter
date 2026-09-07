
"use client"

import { ColorTypes } from "@/src/app/design/colors";
import { elementSizes, paddingSizes } from "@/src/app/design/sizes";
import { SizeType } from "@/src/types/types";
import { generateLightBackground } from "@/src/utils/healthBackground";
import { useTheme } from "../../providers/themeProvider";
import Frame from "../primitives/frame";
import Icon, { IconType } from "../primitives/icon";
import Paragraph from "../primitives/paragraph";

type BadgeProps = {
  color: ColorTypes;
  bg?: ColorTypes;
  size?: SizeType;
  iconName?: IconType;
  className?: string;
  text?: string | number;
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
    <Frame className={`items-center rounded-[var(--radius-lg)] h-max justify-center ${elementSizes[size]} ${paddingSizes[size]} ${className}`} specificStyles={{
      color: colors[color],
      backgroundColor: (bg && colors[bg]) ?? colors[background],
      border: `solid 1px ${colors[background]}`
    }}>
      {iconName && <Icon size={size} name={iconName}/>}
      <Paragraph weight="medium" size={size} color={color}>{text}</Paragraph>
    </Frame>
  );
}
