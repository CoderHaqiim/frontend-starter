import { elementSizes } from "@/src/app/design/sizes"
import Image from "next/image"
import Frame from "../primitives/frame"
import { FrameSizeType, SizeType } from "@/src/types/types"
import { useTheme } from "../../app/themeProvider"

type AvatarProps = {
  size: SizeType
}

export default function Avatar({size}: AvatarProps) {
  const {colors} = useTheme()
  return (
    <Frame className="relative rounded-[var(--radius-xxl)] overflow-hidden"
      specificStyles={{
        width: size && elementSizes[size],
        height: size && elementSizes[size],
      }}>
        <Image 
            alt="user avatar"
            src={"/images/akeem.png"}
            fill
            sizes= {elementSizes[size]}

            style={{
                border: `solid 1.5px ${colors["accent"]}`,
                borderRadius: "inherit",
                objectFit: "cover",
            }}
        />
    </Frame>
  )
}
