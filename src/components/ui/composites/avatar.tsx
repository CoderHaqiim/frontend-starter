import { elementSizes } from "@/src/app/design/sizes"
import { SizeType } from "@/src/types/types"
import Image from "next/image"
import { useTheme } from "../../providers/themeProvider"
import Frame from "../primitives/frame"

type AvatarProps = {
  size: SizeType
  src?: string
}

export default function Avatar({size, src = "/images/akeem.png"}: AvatarProps) {
  const {colors} = useTheme()
  return (
    <Frame className="relative rounded-[var(--radius-xxl)] overflow-hidden"
      specificStyles={{
        width: size && elementSizes[size],
        height: size && elementSizes[size],
      }}>
        <Image 
            alt="user avatar"
          src={src}
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
