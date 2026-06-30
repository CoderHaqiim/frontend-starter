"use client"

import { useEffect, useRef, useState } from 'react'
import Frame from '../ui/primitives/frame'
import Logo from '../ui/brand.tsx/logo'
import Button from '../ui/primitives/button'
import Searchbar from '../ui/composites/searchbar'
import { space, spaceVariables } from '@/src/app/design/spacing'
import { colorVariables } from '@/src/app/design/colors'
import { http } from '@/src/http/client'
import { colors } from '@/src/app/design/colors'

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
    <nav className='flex z-[500] items-center shrink-0 justify-center w-full h-[60px]'>
        <Frame width="stretch" height="stretch" specificStyle={{justifyContent:"space-between", alignItems: "center", padding:`0px ${space["lg"]}`, backgroundColor:"white"}}>
          <Logo/>
          <Frame width="hug" height="stretch" specificStyle={{gap:space["md"], height:"100%", alignItems:"center"}}>
            <Searchbar/>
            <div ref={notificationRef} className="relative flex items-center">
              <Button func={toggleNotifications} size="md" iconName="icon-bell" variant="icon" 
                specificStyles={{
                  border:`solid 1px ${colors["outline"]}`, 
                  borderRadius:"8px"
                }}>
                <span className={`w-[20px] font-[600] flex items-center justify-center absolute top-[-8px] rounded-[var(--lg)] right-[-8px] text-[9px] bg-[var(--accent1)] h-[20px] text-[white] border-[2px] border-[white]`} 
                  style={{
                    ...spaceVariables, 
                    ...colorVariables
                  }}>
                  {notifications.length}
                </span>
              </Button>
              {
                notificationsOpen && (
                <Frame width={320} height="auto" rounded="md" padding="sm" direction="column"
                  specificStyle={{
                    position: "absolute",
                    minHeight: "80px",
                    maxHeight: "360px",
                    backgroundColor: "white",
                    border: "solid 1px var(--liner)",
                    top: "120%",
                    right: "0px",
                    boxShadow: "0px 1px 5px -1px #000000c4",
                    overflowY: "auto",
                    zIndex: 1000,
                    gap: space["xs"]
                  }}>
                  {loadingNotifications && <p className="px-2 py-1 text-sm text-[#666666]">Loading notifications...</p>}
                  {!loadingNotifications && notificationsError && <p className="px-2 py-1 text-sm text-red-500">{notificationsError}</p>}
                  {!loadingNotifications && !notificationsError && notifications.length === 0 && <p className="px-2 py-1 text-sm text-[#666666]">No notifications</p>}
                  {!loadingNotifications && !notificationsError && notifications.map((notification, index) => (
                    <Button
                      key={index}
                      variant="custom"
                      size="md"
                      specificStyles={{
                        width: "100%",
                        height: "auto",
                        minHeight: "40px",
                        justifyContent: "flex-start",
                        backgroundColor: "transparent",
                        padding: "8px",
                        textAlign: "left"
                      }}>
                      <span className="w-full text-sm text-[var(--text-color1)]">
                        {getNotificationLabel(notification)}
                      </span>
                    </Button>
                  ))}
                </Frame>
              )}
            </div>
            <Button size="md" iconName="icon-user" variant="icon" 
              specificStyles={{
                border:`solid 1px ${colors["outline"]}`, 
                borderRadius:"50%"
              }}/>
          </Frame>
        </Frame>
    </nav>
  )
}
