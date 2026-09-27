"use client"
import { shadow5 } from '@/src/app/design/shadows'
import NotificationRead from '@/src/components/app/notificationRead'
import { NotificationType } from '@/src/services/notificationService'
import { shortenText } from '@/src/utils/shortenText'
import Frame from '../primitives/frame'
import Heading from '../primitives/heading'
import Paragraph from '../primitives/paragraph'

import { useState } from 'react'

type NotificationPaneProps = {
  notifications: NotificationType[]
  loadingNotifications: boolean
  notificationsError: boolean
}

const formatNotificationTime = (dateString?: string) => {
  if (!dateString) return "just now"

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "just now"

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function NotificationPane({ notifications, loadingNotifications, notificationsError}: NotificationPaneProps) {
  const [openedNotification, setOpenedNotification] = useState<NotificationType>()
  
  return (
    <Frame className={`top-[160%] ${shadow5} right-0 z-[1000] w-[350px] min-h-[80px] max-h-[360px] flex-col gap-[var(--space-sm)] rounded-[var(--radius-md)] border border-[var(--color-outline1)] bg-[var(--color-white)] py-[var(--space-lg)] px-[var(--space-md)]`}
      specificStyles={{
        position: "absolute",
      }}
    >
    <NotificationRead notification={openedNotification}/>
    <Heading size='md' type="h2">Notifications</Heading>

    { loadingNotifications && <Paragraph size="sm">Loading notifications...</Paragraph>}
    { !loadingNotifications && notificationsError && <p className="px-2 py-1 text-sm text-red-500">Could not fetch notifications</p>}
    { !loadingNotifications && !notificationsError && notifications.length === 0 && <p className="px-2 py-1 text-sm text-[#666666]">No notifications</p>}
    <Frame scroll='hidden' className='flex flex-col gap-[var(--space-sm)]'>
    {
        !loadingNotifications && !notificationsError && notifications.map((notification, index) => (
        <div aria-roledescription='button' onClick={() => setOpenedNotification(notification)} key={notification.id ?? index} 
            className=" flex-col cursor-pointer flex rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)]">
            <Frame className=" flex items-center justify-between gap-[var(--space-xs)]">
                <Paragraph weight='medium' size='sm' color='textColor1'> { notification.title ?? "Notification" }</Paragraph>
                {!notification.read && <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-accent2)]" />}
            </Frame>
            <Paragraph size='xs'> {(notification.message && shortenText(notification.message, 50)) ?? "New update"}</Paragraph>
            <Paragraph size="xxs" className="mt-[var(--space-sm)] uppercase]">{formatNotificationTime(notification.createdAt)}</Paragraph>
        </div>
        ))
    }
    </Frame>
    </Frame>
  )
}
