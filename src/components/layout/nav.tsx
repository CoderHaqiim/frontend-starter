"use client"

import { useEffect, useRef, useState } from 'react'
import Frame from '../ui/primitives/frame'
import Logo from '../app/brand/logo'
import Button from '../ui/primitives/button'
import Searchbar from '../ui/composites/searchbar'
import { space } from '@/src/app/design/spacing'
import { http } from '@/src/http/client'
import Tooltip from '../ui/composites/tooltip'
import Paragraph from '../ui/primitives/paragraph'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useTheme } from '../app/themeProvider'

type Notification = unknown

const normalizeNotifications = (data: Notification) => {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === "object") {
    const item = data as Record<string, unknown>
    const notifications = item.notifications ?? item.data ?? item.items ?? item.results

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
    const label = item.title ?? item.message ?? item.body ?? item.text ?? item.name ?? item.label

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
    <nav className='flex border-b-[1px] border-b-[var(--color-outline1)] z-[500] items-center shrink-0 justify-center w-full h-[60px]'>
        <Frame width="stretch" height="stretch" justify="space-between" align='center' specificStyles={{padding:`0px ${space["xl"]}`}}>
          <Frame>
            {
              pathname !== "/dashboard" &&
              <Tooltip content="back" position='bottom'>
                <Button func={()=> router.back()} variant='outline' isIcon iconName='icon-left' size='md'/>
              </Tooltip>
            }
          </Frame>
          <Frame width="hug" height="stretch" specificStyles={{gap:space["md"], height:"100%", alignItems:"center"}}>
            <Searchbar/>
            <div ref={notificationRef} className="relative flex items-center">
              <Tooltip content="notifications" position='bottom'>
                <Button func={toggleNotifications} size="md" iconName="icon-bell" variant="outline" isIcon>
                  <span className={`w-[20px] z-[500] font-[600] flex items-center justify-center leading-[1px] absolute top-[-8px] rounded-[var(--radius-xxl)] right-[-8px] text-[9px] bg-[var(--color-accent)] h-[20px] text-[white] border-[2px] border-[white]`}>
                    {notifications.length}
                  </span>
                </Button>
              </Tooltip>
              {
                notificationsOpen && (
                <Frame direction="column" width="350px" height="auto" gap="xs" rounded="md" padding="sm"
                className='z-[1000] border-[1px] border-[var(--color-outline1)] max-h-[360px] top-[120%] right-0 min-h-[80px] bg-[var(--color-white)] '
                  specificStyles={{
                    boxShadow: "0px 1px 5px -1px #000000c4",
                    overflowY: "auto",
                    position: "absolute"
                  }}>
                  {loadingNotifications && <Paragraph size='sm' className="">Loading notifications...</Paragraph>}
                  {!loadingNotifications && notificationsError && <p className="px-2 py-1 text-sm text-red-500">{notificationsError}</p>}
                  {!loadingNotifications && !notificationsError && notifications.length === 0 && <p className="px-2 py-1 text-sm text-[#666666]">No notifications</p>}
                  {!loadingNotifications && !notificationsError && notifications.map((notification, index) => (
                    <Button width="stretch" key={index} variant="ghost" size="md" justify='start'>
                      <span className="w-full text-sm text-[var(--color-textColor1)]">
                        {getNotificationLabel(notification)}
                      </span>
                    </Button>
                  ))}
                </Frame>
              )}
            </div>
            <Tooltip content={theme === "light" ? "dark theme" : "light theme"} position='bottom'>
              <Button func={toggleTheme} size="md" iconName={theme === "light" ? "icon-moon" : "icon-sun"} variant="outline" rounded="xxl" isIcon/>
            </Tooltip>
          </Frame>
        </Frame>
    </nav>
  )
}
