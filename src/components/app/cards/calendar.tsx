"use client"

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"

import { fontWeight } from "@/src/app/design/typograhy"
import { http } from "@/src/http/client"
import { useBackdropState } from "@/src/store/backdropState"
import { Schedule } from "@/src/types/types"
import { useEffect, useMemo, useState } from "react"
import { useTheme } from "../../providers/themeProvider"
import Card from "../../ui/composites/card"
import Tooltip from "../../ui/composites/tooltip"
import Button from "../../ui/primitives/button"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import ScheduleModal from "../forms/scheduleModal"

type CalendarProps = {
  businessId?: string
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Calendar({
  businessId,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const { colors } = useTheme()
  const { setBackdropOpen, setBackdropContent } = useBackdropState()

  // Fetch Schedules
  useEffect(() => {
    fetchSchedules()
  }, [])

  async function fetchSchedules() {
    const schedulesData = await http<Schedule[]>(
      "/api/schedules",
      undefined,
      { method: "GET" }
    )

    console.log("Schedules:", schedulesData)
    setSchedules(schedulesData)
    setLoading(false)
  }

  // Date-fns config
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)

    return eachDayOfInterval({
      start: startOfWeek(monthStart),
      end: endOfWeek(monthEnd),
    })
  }, [currentDate])

  // Get schedules for date
  function getSchedulesForDate(date: Date) {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.startAt)

      return isSameDay(scheduleDate, date)
    })
  }

  // Open schedule modal
  const openScheduleModal = (date: Date) => {
    setSelectedDate(date)

    setBackdropContent(
      <ScheduleModal date={date} />
    )

    setBackdropOpen(true)
  }

  return (
    <Card
      padding="lg"
      height="hug"
      className="bg-[var(--color-white)]"
      width="290px"
      rounded="md"
      specificStyles={{
        border: `solid 1px ${colors["outline1"]}`,
      }}
    >
      <Frame
        className="flex items-center justify-between pb-[var(--space-sm)] mb-[var(--space-sm)]">
        <Frame className="flex flex-col">
          <Heading type="h3" size="sm">
            Schedular
          </Heading>
        </Frame>
      </Frame>

      <div>
        <Frame className="flex w-full items-center justify-between gap-[var(--space-md)] mb-[var(--space-md)]">
          <Tooltip content="previous month">
            <Button variant="ghost" size="xs" isIcon iconName="icon-left"
              func={() =>
                setCurrentDate(
                  subMonths(currentDate, 1)
                )
              }
            />
          </Tooltip>

          <Heading size="xxs" weight="medium" type="h4">
            {format(currentDate, "MMMM yyyy")}
          </Heading>

          <Tooltip content="next month">
            <Button variant="ghost" size="xs" isIcon iconName="icon-right"
              func={() =>
                setCurrentDate(
                  addMonths(currentDate, 1)
                )
              }
            />
          </Tooltip>
        </Frame>

        <Frame className="flex w-full flex-col border border-[var(--color-outline1)] gap-[var(--space-sm)] rounded-[var(--radius-md)] p-[var(--space-md)]">
          {/* Week days */}
          <Frame className="grid grid-cols-7">
            {days.map((day) => (
              <Frame className="w-full justify-center" key={day}>
                <Paragraph size="xs" weight="light" className="text-center">
                  {day}
                </Paragraph>
              </Frame>
            ))}
          </Frame>

          {/* Calendar dates */}
          <Frame className="grid grid-cols-7 gap-[var(--space-xs)]">
            {calendarDays.map((day) => {
              const daySchedules =
                getSchedulesForDate(day)

              const isCurrentMonth =
                isSameMonth(day, currentDate)

              const isToday =
                isSameDay(day, new Date())

              const tooltipContent = daySchedules.length > 0 ? (
                <Frame className="w-64 text-left flex-col">
                  <Frame className="mb-2 flex-col">
                    <span className="text-[length:var(--bodySize-xs)]">
                      {format(day, "EEEE, MMMM d")}
                    </span>
                    <span className=" text-[length:var(--bodySize-xxs)] text-[var(--color-background1)]/80">
                      {daySchedules.length} activitie(s)
                    </span>
                  </Frame>

                  <div className="space-y-2">
                    {daySchedules.map((schedule) => (
                      <div key={schedule.id} className="border-b flex flex-col gap-[var(--space-sm)] border-white/10 pb-2 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                          <p className="text-[length:var(--bodySize-sm)] leading-[1.5] font-[var(--fontWeight-medium)] text-[var(--color-background1)]">
                            {schedule.title}
                          </p>
                          <p className="text-[length:var(--bodySize-xs)] leading-[1] font-[var(--fontWeight-medium)] text-[var(--color-background1)]">
                            {format(new Date(schedule.startAt), "h:mm a")}
                          </p>
                        </div>
                        {
                          schedule.description && (
                          <p className="text-[length:var(--bodySize-xxs)] text-[var(--color-background1)]/80">
                            {schedule.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Frame>
              ) : null

              const isInteractive = isCurrentMonth

              return (
                <Tooltip
                  key={format(day, "yyyy-MM-dd")}
                  content={tooltipContent}
                  position="top"
                  disabled={daySchedules.length === 0 || !isInteractive}
                  specificStyle={{
                    width: "180px",
                    padding: "var(--space-md)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Button
                    size="xs"
                    isIcon
                    variant="outline"
                    func={isInteractive ? () => openScheduleModal(day) : undefined}
                    className={`transition ${isInteractive ? "hover:bg-[var(--color-background1)]" : "cursor-default"}`}
                    specificStyles={{
                      position: "relative",
                      borderRadius:
                        "var(--space-sm)",
                      color: isToday
                        ? colors["accent"]
                        : isCurrentMonth
                          ? colors["textColor1"]
                          : colors["background3"],
                      border: isCurrentMonth
                        ? `solid 1px ${colors["outline1"]}`
                        : "0px",
                      fontWeight:
                        fontWeight["normal"],
                      backgroundColor: isToday
                        ? colors["accent2"]
                        : isCurrentMonth
                          ? colors["background1"]
                          : colors["white"],
                      pointerEvents: isInteractive ? "auto" : "none",
                    }}
                  >
                    {/* Schedule indicator */}
                    {isCurrentMonth && daySchedules.length > 0 && (
                      <span className="absolute top-[2px] right-[2px] h-[3px] w-[3px] rounded-[var(--radius-lg)] bg-[var(--color-accent)]" />
                    )}

                    <span className="flex justify-between">
                      <span>
                        {format(day, "d")}
                      </span>
                    </span>
                  </Button>
                </Tooltip>
              )
            })}
          </Frame>
        </Frame>
      </div>
    </Card>
  )
}
