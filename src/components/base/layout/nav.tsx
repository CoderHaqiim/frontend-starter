"use client"

import { http } from "@/src/http/client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "../../providers/themeProvider"
import Searchbar from "../ui/composites/searchbar"
import Tooltip from "../ui/composites/tooltip"
import Button from "../ui/primitives/button"
import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"

type Notification = unknown

const normalizeNotifications = (data: Notification) => {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === "object") {
    const item = data as Record<string, unknown>
    const notifications =
      item.notifications ?? item.data ?? item.items ?? item.results

    if (Array.isArray(notifications)) {
      return notifications
    }
  }

  return data ? [data] : []
}

const getNotificationLabel = (notification: Notification) => {
  if (typeof notification === "string" || typeof notification === "number") {
    return String(notification)
  }

  if (notification && typeof notification === "object") {
    const item = notification as Record<string, unknown>
    const label =
      item.title ??
      item.message ??
      item.body ??
      item.text ??
      item.name ??
      item.label

    if (typeof label === "string" || typeof label === "number") {
      return String(label)
    }
  }

  return JSON.stringify(notification)
}

export default function Nav() {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(false)
  const [notificationsError, setNotificationsError] = useState<string>("")

  const notificationRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const toggleNotifications = () => {
    setNotificationsOpen(prev => !prev)
  }

  useEffect(() => {
    if (!notificationsOpen) {
      return
    }

    let active = true

    const fetchNotifications = async () => {
      try {
        setLoadingNotifications(true)
        setNotificationsError("")

        const data = await http("/notifications", undefined, {
          method: "GET",
        })

        if (active) {
          setNotifications(normalizeNotifications(data))
        }
      } catch {
        if (active) {
          setNotifications([])
          setNotificationsError("Could not fetch notifications")
        }
      } finally {
        if (active) {
          setLoadingNotifications(false)
        }
      }
    }

    fetchNotifications()

    return () => {
      active = false
    }
  }, [notificationsOpen])

  useEffect(() => {
    if (!notificationsOpen) {
      return
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
    }
  }, [notificationsOpen])

  return (
    <nav className="
      flex
      w-full
      h-[60px]
      shrink-0
      items-center
      justify-center
      border-b
      border-b-[var(--color-outline1)]
      z-[500]
    ">
      <Frame className=" flex w-full h-full items-center justify-between px-[var(--space-lg)]">
        {/* Back button */}
        <Frame>
          {(pathname.startsWith("/dashboard/businesses") || pathname.startsWith("/dashboard/tasks")) && (
            <Tooltip content="home" position="bottom">
              <Button func={() => router.push("/dashboard")} iconColor="accent" variant="outline" iconName="icon-left" size="xs"
                specificStyles={{
                  border: `solid 1px var(--color-outline1)`,
                  color:`var(--color-accent)`,
                  fontWeight: `var(--fontWeight-semiBold)`
                }}>
                Home
              </Button>
            </Tooltip>
          )}
        </Frame>

         {/* Right controls */}
        <Frame
          className="
            flex
            w-max
            h-full
            items-center
            gap-[var(--space-md)]
          "
        >
          <Searchbar />

          {/* Notifications */}
          <Frame ref={notificationRef} className="relative flex items-center flex-col">
            <Tooltip content="notifications" position="bottom">
              <Button func={toggleNotifications} size="sm" iconName="icon-bell" variant="outline" isIcon> 
                <span className="
                  absolute
                  top-[-8px]
                  right-[-8px]
                  z-[500]
                  flex
                  h-[20px]
                  w-[20px]
                  items-center
                  justify-center
                  rounded-[var(--radius-xxl)]
                  border-[2px]
                  border-[white]
                  bg-[var(--color-accent)]
                  text-[9px]
                  font-[600]
                  leading-[1px]
                  text-[white]
                ">
                  {notifications.length}
                </span>
              </Button>
            </Tooltip>

            {notificationsOpen && (
              <Frame
                className="
                  top-[120%]
                  right-0
                  z-[1000]
                  flex
                  w-[350px]
                  min-h-[80px]
                  max-h-[360px]
                  flex-col
                  gap-[var(--space-xs)]
                  overflow-y-auto
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--color-outline1)]
                  bg-[var(--color-white)]
                  p-[var(--space-sm)]
                "
                specificStyles={{
                  position: "absolute",
                  boxShadow: "0px 1px 5px -1px #000000c4",
                }}
              >
                {loadingNotifications && (
                  <Paragraph size="sm">
                    Loading notifications...
                  </Paragraph>
                )}

                {!loadingNotifications && notificationsError && (
                  <p className="px-2 py-1 text-sm text-red-500">
                    {notificationsError}
                  </p>
                )}

                {!loadingNotifications &&
                  !notificationsError &&
                  notifications.length === 0 && (
                    <p className="px-2 py-1 text-sm text-[#666666]">
                      No notifications
                    </p>
                  )}

                {!loadingNotifications &&
                  !notificationsError &&
                  notifications.map((notification, index) => (
                    <Button
                      width="stretch"
                      key={index}
                      variant="ghost"
                      size="md"
                      justify="start"
                    >
                      <span className="
                        w-full
                        text-sm
                        text-[var(--color-textColor1)]
                      ">
                        {getNotificationLabel(notification)}
                      </span>
                    </Button>
                  ))}
              </Frame>
            )}
          </Frame>

          {/* Theme */}
          <Tooltip
            content={theme === "light" ? "dark theme" : "light theme"}
            position="bottom"
          >
            <Button
              func={toggleTheme}
              size="sm"
              iconName={
                theme === "light"
                  ? "icon-moon"
                  : "icon-sun"
              }
              variant="outline"
              rounded="xxl"
              isIcon
            />
          </Tooltip>
        </Frame>
      </Frame>
    </nav>
  )
}