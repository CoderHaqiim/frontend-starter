"use client"

import { getNotifications, notificationsQueryKey } from "@/src/services/notificationService"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { CSSProperties, useEffect, useRef, useState } from "react"
import { useTheme } from "../../providers/themeProvider"
import NotificationPane from "../ui/composites/notificationPane"
import Searchbar from "../ui/composites/searchbar"
import Tooltip from "../ui/composites/tooltip"
import Button from "../ui/primitives/button"
import Frame from "../ui/primitives/frame"

// Style shared by the nav's navigation buttons (Home and Back) so both use the
// same outline/accent treatment.
const navButtonStyles: CSSProperties = {
  border: `solid 1px var(--color-outline1)`,
  color: `var(--color-accent)`,
  fontWeight: `var(--fontWeight-semiBold)`,
}

// Document preview routes opened from a list. On these routes the nav shows a
// Back button that steps the user back to the list they came from.
const viewRoutes = ["/dashboard/view-invoice", "/dashboard/view-receipt"]

export default function Nav() {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)

  const notificationRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  // The document preview pages are opened from a list, so on those routes the
  // nav offers a Back button that steps the user back where they came from.
  const showBackButton = viewRoutes.some((route) => pathname.startsWith(route))
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const { data: notifications = [], isLoading: loadingNotifications, isError: notificationsError} = useQuery({
    queryKey: notificationsQueryKey(),
    queryFn: getNotifications,
  })

  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length

  const toggleNotifications = () => {
    setNotificationsOpen(prev => !prev)
  }

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
    <nav className=" flex w-full h-[65px] shrink-0 items-center justify-center border-b border-b-[var(--color-outline1)] z-[500]">
      <Frame className=" flex w-full h-full items-center justify-between px-[var(--space-lg)]">
        {/* Back button */}
        <Frame className=" items-center gap-[var(--space-sm)]">
          {
          (pathname.startsWith("/dashboard/businesses") || pathname.startsWith("/dashboard/tasks")) && (
            <Tooltip content="home" position="bottom">
              <Button func={() => router.push("/dashboard")} iconColor="accent" variant="outline" iconName="icon-left" size="xs"
                specificStyles={navButtonStyles}>
                Home
              </Button>
            </Tooltip>
          )}

          {
          showBackButton && (
            <Tooltip content="back" position="bottom">
              <Button func={() => router.back()} iconColor="accent" variant="outline" iconName="icon-left" size="xs"
                specificStyles={navButtonStyles}>
                Back
              </Button>
            </Tooltip>
          )
          }
        </Frame>

        {/* right controls */}
        <Frame className=" flex w-max h-full items-center gap-[var(--space-md)]">
          <Searchbar />
          {/* Notifications */}
          <Frame ref={notificationRef} className="relative flex items-center flex-col">
            <Tooltip content="notifications" position="bottom">
              <Button func={toggleNotifications} size="sm" iconName="icon-bell" variant="outline" isIcon> 
                <span className=" absolute top-[-8px] right-[-8px] z-[500] flex h-[20px] w-[20px] items-center justify-center rounded-[var(--radius-xxl)] border-[2px] border-[white] bg-[var(--color-accent)] text-[9px] font-[600] leading-[1px] text-[white]">
                  {unreadNotificationsCount}
                </span>
              </Button>
            </Tooltip>

            {notificationsOpen && (
              <NotificationPane
                notifications={notifications}
                loadingNotifications={loadingNotifications}
                notificationsError={notificationsError}
              />
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