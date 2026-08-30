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

import { useEffect, useMemo, useState } from "react"
import { Schedule } from "@/src/types/types"
import ScheduleModal from "../forms/scheduleModal"
import Frame from "../../ui/primitives/frame"
import { useBackdropState } from "@/src/store/backdropState"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import Card from "../../ui/composites/card"
import Button from "../../ui/primitives/button"
import { http } from "@/src/http/client"
import Tooltip from "../../ui/composites/tooltip"
import { useTheme } from "../../providers/themeProvider"
import { fontWeight } from "@/src/app/design/typograhy"

type CalendarProps = {
  businessId?: string
  expanded?: boolean
  onToggle?: () => void
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Calendar({
  businessId,
  expanded: controlledExpanded,
  onToggle,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [internalExpanded, setInternalExpanded] = useState(false)

  const { colors } = useTheme()
  const { setBackdropOpen, setBackdropContent } = useBackdropState()

  const expanded = controlledExpanded ?? internalExpanded

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
      width="310px"
      rounded="md"
      specificStyles={{
        border: `solid 1px ${colors["outline1"]}`,
      }}
    >
      <Frame
        className={`${
          expanded
            ? "pb-[var(--space-sm)] border-b border-b-[var(--color-outline1)] mb-[var(--space-sm)]"
            : ""
        } flex items-center justify-between`}
      >
        <Frame className="flex flex-col">
          <Heading type="h3" size="sm">
            Schedular
          </Heading>
        </Frame>

        <Tooltip
          content={expanded ? "collapse" : "open"}
          position="top"
        >
          <Button
            variant="ghost"
            size="xs"
            isIcon
            iconName={
              expanded
                ? "icon-chevron-down"
                : "icon-right"
            }
            func={() => {
              if (onToggle) {
                onToggle()
                return
              }

              setInternalExpanded((prev) => !prev)
            }}
          />
        </Tooltip>
      </Frame>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? "900px" : "0px",
          opacity: expanded ? 1 : 0,
          transform: expanded
            ? "translateY(0)"
            : "translateY(-6px)",
        }}
      >
        <Frame
          className={`flex w-full items-center justify-between gap-[var(--space-md)] ${
            expanded
              ? "mb-[var(--space-md)]"
              : ""
          }`}
        >
          <Tooltip content="previous month">
            <Button
              variant="ghost"
              size="xs"
              isIcon
              iconName="icon-left"
              func={() =>
                setCurrentDate(
                  subMonths(currentDate, 1)
                )
              }
            />
          </Tooltip>

          <Heading
            size="xxs"
            weight="medium"
            type="h4"
          >
            {format(currentDate, "MMMM yyyy")}
          </Heading>

          <Tooltip content="next month">
            <Button
              variant="ghost"
              size="xs"
              isIcon
              iconName="icon-right"
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
              <Frame
                className="w-full justify-center"
                key={day}
              >
                <Paragraph
                  size="xs"
                  weight="light"
                  className="text-center"
                >
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

              return (
                <Button
                  size="xs"
                  isIcon
                  variant="outline"
                  key={format(
                    day,
                    "yyyy-MM-dd"
                  )}
                  func={() =>
                    openScheduleModal(day)
                  }
                  className="group transition hover:bg-[var(--color-background1)]"
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
                  }}
                >
                  {/* Schedule indicator */}
                  {daySchedules.length > 0 && (
                    <span className="absolute top-[3px] right-[3px] h-[4px] w-[4px] rounded-[var(--radius-lg)] bg-[var(--color-accent)]" />
                  )}

                  <span className="flex justify-between">
                    <span>
                      {format(day, "d")}
                    </span>
                  </span>

                  {/* Schedule previews */}
                  {daySchedules.length > 0 && (
                    <div className="mt-3 hidden space-y-1 group-hover:block">
                      {daySchedules
                        .slice(0, 2)
                        .map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`truncate rounded-md px-2 py-1 text-xs ${
                              schedule.type ===
                              "meeting"
                                ? "bg-purple-100 text-purple-700"
                                : schedule.type ===
                                  "task"
                                  ? "bg-blue-100 text-blue-700"
                                  : schedule.type ===
                                    "reminder"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                          >
                            {schedule.title}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Schedule details */}
                  {daySchedules.length > 0 && (
                    <div className="pointer-events-none absolute left-1/2 top-full z-50 hidden w-64 -translate-x-1/2 rounded-xl border bg-white p-4 shadow-xl group-hover:block">
                      <div className="mb-3">
                        <p className="text-sm font-semibold">
                          {format(
                            day,
                            "EEEE, MMMM d"
                          )}
                        </p>

                        <p className="text-xs text-gray-500">
                          {daySchedules.length}{" "}
                          activities
                        </p>
                      </div>

                      <div className="space-y-3">
                        {daySchedules.map(
                          (schedule) => (
                            <div
                              key={schedule.id}
                              className="border-b pb-2 last:border-0"
                            >
                              <p className="text-sm font-medium">
                                {schedule.title}
                              </p>

                              <p className="text-xs text-gray-500">
                                {format(
                                  new Date(
                                    schedule.startAt
                                  ),
                                  "h:mm a"
                                )}
                              </p>

                              {schedule.description && (
                                <Paragraph size="xs">
                                  {
                                    schedule.description
                                  }
                                </Paragraph>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </Button>
              )
            })}
          </Frame>
        </Frame>
      </div>
    </Card>
  )
}
