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
import ScheduleModal from "./scheduleModal"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import Card from "../../ui/composites/card"
import Button from "../../ui/primitives/button"
import { http } from "@/src/http/client"
import Tooltip from "../../ui/composites/tooltip"
import { colors } from "@/src/app/design/colors"

type SchedulerProps = { businessId?: string }

const days = [ "Sun", "Mon", "Tue","Wed","Thu","Fri","Sat"]

export default function Scheduler({businessId}: SchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch Schedules
  useEffect(() => {
    fetchSchedules()
  }, [])

  async function fetchSchedules() {
    const schedulesData = await http<Schedule[]>("/schedules", undefined, {method:"GET"})
    setSchedules(schedulesData)
  }

  //Date-fns config
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    return (
      eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd)})
    )
  }, [currentDate])

  // Get schedules for date
  function getSchedulesForDate(date: Date) {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date( schedule.startDate )
      return isSameDay(scheduleDate, date)
    })
  }

  // Create Schedule
  async function createSchedule(schedule: Omit<Schedule, "id">) {
    const newSchedule = await http<Schedule>("/createSchedule", schedule, {method: "POST"})
    setSchedules((previous) => [...previous, newSchedule])
  }

  return (
    <Card padding="lg" height="hug" className="bg-[var(--color-white)]" width="stretch" rounded="md">
      {/* Header */}
      <Frame align="center" justify="space-between" className="mb-[var(--space-lg)]">
        <Frame direction="column">
          <Heading type="h3" size="sm">
            Scheduler
          </Heading>
        </Frame>
        <Button iconName="icon-plus" variant="outline" size="sm"
            func={() => {
              setSelectedDate(new Date())
              setShowModal(true)
            }}
        >
            Add schedule
        </Button>
      </Frame>

      {/* Controls */}
      <Frame gap="md" align="center" justify="space-between" width="stretch" className="mb-[var(--space-md)]">
        <Tooltip content="previous month">
          <Button variant="outline" size="sm" isIcon iconName="icon-left" func={() => setCurrentDate( subMonths(currentDate, 1))}/>
        </Tooltip>
        <Heading size="xxs" type="h4">
          { format(currentDate, "MMMM yyyy") }
        </Heading>
        <Tooltip content="next month">
          <Button variant="outline" size="sm" isIcon iconName="icon-right" func={() => setCurrentDate( addMonths(currentDate, 1))}/>
        </Tooltip>
      </Frame>

      <Frame border rounded="md" padding="md" direction="column" height="hug" width="stretch">
        {/* Days of week */}
        <Frame className="grid grid-cols-7">
          {
            days.map((day) => 
            <Frame key={day}>
              <Paragraph size="xs" className="text-center w-full">{day}</Paragraph>
            </Frame>
            )
          }
        </Frame>

        {/* Calendar Body */}
        <Frame className="grid-cols-7" gap="sm" specificStyles={{ display:"grid" }}>
          {
            calendarDays.map((day) => {
              const daySchedules = getSchedulesForDate(day)
              const isCurrentMonth = isSameMonth( day, currentDate )
              const isToday = isSameDay(day,new Date())

            return (
              <Button size="md" isIcon variant="outline" key={day.toISOString()} func={() => { setSelectedDate(day), setShowModal(true)}}
                className={`min-h-[20px] font-[weight:var(--fontWeight-normal)] transition hover:bg-[var(--color-background1)]`}
                
                  specificStyles={{
                    color:  isCurrentMonth? "" : `${colors["background2"]}`,
                    border: isCurrentMonth? `1px solid ${colors["outline2"]}` : `1px solid ${colors["background2"]}`, 
                    backgroundColor: isToday? colors["accent2"] : ""
                }}
              >

                {/* Date */}
                <div className="flex justify-between">
                  <span
                    className={`
                      flex h-7 w-7
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                    `}
                  >
                    {format(day, "d")}
                  </span>

                  {daySchedules.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {daySchedules.length}
                    </span>
                  )}
                </div>

                {/* Visible activities */}
                <div className="mt-3 space-y-1">
                  {daySchedules
                    .slice(0, 2)
                    .map((schedule) => (

                      <div
                        key={schedule.id}
                        className={`
                          truncate
                          rounded-md
                          px-2
                          py-1
                          text-xs

                          ${
                            schedule.type === "meeting"
                              ? "bg-purple-100 text-purple-700"
                              : schedule.type === "task"
                              ? "bg-blue-100 text-blue-700"
                              : schedule.type === "reminder"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {schedule.title}
                      </div>

                    ))}

                </div>


                {/* Hover activity preview */}

                {daySchedules.length > 0 && (

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-full
                      z-50
                      hidden
                      w-64
                      -translate-x-1/2
                      rounded-xl
                      border
                      bg-white
                      p-4
                      shadow-xl
                      group-hover:block
                    "
                  >

                    <div className="mb-3">

                      <p className="text-sm font-semibold">
                        {format(
                          day,
                          "EEEE, MMMM d"
                        )}
                      </p>

                      <p className="text-xs text-gray-500">
                        {daySchedules.length} activities
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
                                  schedule.startDate
                                ),
                                "h:mm a"
                              )}
                            </p>

                            {
                              schedule.description && 
                              <Paragraph size="xs"> { schedule.description} </Paragraph>
                            }
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

      {/* Modal */}
      {
        showModal && 
        ( <ScheduleModal date={selectedDate} onClose={() => setShowModal(false)} onSubmit={createSchedule}/>)
      }
    </Card>
  )
}