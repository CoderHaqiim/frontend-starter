import { ReactNode } from "react";
import Frame from "../primitives/frame";
import { SizeType } from "@/src/types/types";
import { IconType } from "../primitives/icon";
import { elementSizes } from "@/src/app/design/sizes";
import Icon from "../primitives/icon";
import { ColorTypes } from "@/src/app/design/colors";
import { colors } from "@/src/app/design/colors";
import { generateLightBackground } from "@/src/utils/healthBackground";
import { paddingSizes } from "@/src/app/design/sizes";
import Paragraph from "../primitives/paragraph";

type BadgeProps = {
  color: ColorTypes;
  color2?: ColorTypes;
  size?: SizeType;
  iconName?: IconType;
  className?: string;
  text?:string;
};

export default function Badge({
  text,
  color,
  color2,
  size = "sm",
  iconName,
  className,
}: BadgeProps) {

  const background = generateLightBackground(color)

  return (
    <Frame align="center" rounded="lg" justify="center" className={`${elementSizes[size]} ${paddingSizes[size]} ${className}`} specificStyles={{
      color: colors[color],
      backgroundColor: colors[background],
      border: `solid 1.5px ${colors[color]}`
    }}>
      {iconName && <Icon size={size} name={iconName}/>}
      <Paragraph size={size} color={color}>{text}</Paragraph>
    </Frame>
  );
}