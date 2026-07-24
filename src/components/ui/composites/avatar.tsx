import { elementSizes } from "@/src/app/design/sizes"
import Image from "next/image"

export default function Avatar() {
  return (
    <span className="relative w-[var(--elementSize-sm)] border border-[var(--color-accent)] border-2 h-[var(--elementSize-sm)] bg-[red] rounded-[var(--radius-xxl)] overflow-hidden">
        <Image
            alt="user avatar"
            src={"/images/akeem.png"}
            fill
            sizes= {elementSizes["sm"]}

            style={{
                borderRadius: "inherit",
                objectFit: "cover",
            }}
        />
    </span>
  )
}
