"use client"

import { useToastState } from "@/src/store/toastState"
import Frame from "../primitives/frame"
import Toast from "./toast"


export default function ToastBar() {
    const { toastState, removeToast } = useToastState()

  return (
    <Frame className="z-[5000] top-0 left-0 flex-col w-full h-[100vh] gap-[var(--space-sm)] items-end p-[var(--space-lg)]"
        specificStyles={{
            position: "fixed",
            pointerEvents: "none",
        }}
    >
                        {toastState.map((toast, index) => {
                            const exitDuration = Math.max(140, 260 - (toastState.length - 1 - index) * 40)

                            return (
                                <Toast
                                    key={index}
                                    {...toast}
                                    exitDuration={exitDuration}
                                    onClose={() => removeToast(toast)}
                                />
                            )
                        })}
        </Frame>
  )
}
