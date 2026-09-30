"use client"

import { ColorTypes } from "@/src/app/design/colors"
import { deleteSchedule, schedulesQueryKey, updateScheduleStatus } from "@/src/services/scheduleService"
import { useShowToast } from "@/src/store/toastState"
import { Schedule } from "@/src/types/types"
import { statusColorMap } from "@/src/utils/statusColorMap"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import Badge from "../base/ui/composites/badge"
import Card from "../base/ui/composites/card"
import Popup from "../base/ui/composites/popup"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"
import Paragraph from "../base/ui/primitives/paragraph"

type DaySchedulesProps = {
  date: Date
  schedules: Schedule[]
}

/*
 * The schedules a day holds, shown beside the create schedule form when a day on
 * the schedules card is clicked. Each schedule is listed with its title
 * followed by its type in brackets and a status badge under the time, and
 * carries a dot menu that opens the popup it is actioned from: it is marked as
 * done or deleted, and both travel through the schedules route before the list
 * is refreshed, so the calendar card follows the change as well.
 */
export default function DaySchedules({ date, schedules }: DaySchedulesProps) {
  const queryClient = useQueryClient()
  const showToast = useShowToast()

  // The schedules card reads the same query, so one refresh keeps every view of
  // the day in step.
  const refreshSchedules = () => queryClient.invalidateQueries({ queryKey: schedulesQueryKey })

  const orderedSchedules = [...schedules].sort(
    (first, second) => first.startAt.localeCompare(second.startAt)
  )

  const markAsDone = async (schedule: Schedule) => {
    try {
      await updateScheduleStatus(schedule.id, "complete")
      await refreshSchedules()

      showToast({
        variant: "success",
        title: "Schedule completed",
        message: `${schedule.title} was marked as done.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "The schedule could not be updated. Please try again.",
      })
    }
  }

  const removeSchedule = async (schedule: Schedule) => {
    try {
      await deleteSchedule(schedule.id)
      await refreshSchedules()

      showToast({
        variant: "success",
        title: "Schedule deleted",
        message: `${schedule.title} was deleted.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The schedule could not be deleted. Please try again.",
      })
    }
  }

  return (
    <Card
      width="300px"
      padding="lg"
      height="max-content"
      rounded="md"
      className="bg-[var(--color-white)]"
      specificStyles={{
        border: "solid 1px var(--color-outline1)",
        maxHeight: "calc(100vh - 48px)",
        overflowY: "auto",
      }}
    >
      <Frame className="flex-col gap-[var(--space-xxs)] pb-[var(--space-sm)] mb-[var(--space-sm)] border-b border-[var(--color-outline1)]">
        <Heading type="h3" size="sm">
          Schedules
        </Heading>

        <Paragraph size="xxs" color="textColor2">
          {format(date, "EEEE, d MMMM yyyy")}
        </Paragraph>
      </Frame>

      <Frame className="w-full flex-col">
        {orderedSchedules.map((schedule, index) => (
          <Frame
            key={schedule.id}
            className={`w-full justify-between items-start h-max gap-[var(--space-sm)] ${
              index > 0
                ? "mt-[var(--space-sm)] border-t border-[var(--color-outline1)] pt-[var(--space-sm)]"
                : ""
            }`}
          >
            <Frame className="flex-col gap-[var(--space-xxs)] h-max">
              {/* The title leads and the type follows it in brackets, a size
                  below the title at a normal weight, so what the schedule is
                  reads straight after its name. */}
              <Frame className="flex-row flex-wrap items-baseline gap-[var(--space-xs)]">
                <Paragraph size="sm" weight="semiBold">
                  {schedule.title}
                </Paragraph>

                <Paragraph size="xs" weight="normal">
                  ({schedule.type})
                </Paragraph>
              </Frame>

              <Paragraph size="xxs" color="textColor2">
                {format(new Date(schedule.startAt), "h:mm a")}
              </Paragraph>

              {/* The status badge sits under the time and reads the shared status
                  colours the other lists in the app use: pending warns and
                  complete settles green. */}
              <Badge
                text={schedule.status}
                color={statusColorMap(schedule.status) as ColorTypes}
                size="xxs"
                className="w-max"
              />
            </Frame>

            {/* The dot menu sits at the end of the row: the mark as done and the
                delete only act once a button in the popup is clicked. */}
            <Popup
              gap={12}
              width="170px"
              closeOnContentClick
              content={
                <DaySchedulePopup
                  schedule={schedule}
                  onMarkAsDone={() => markAsDone(schedule)}
                  onDelete={() => removeSchedule(schedule)}
                />
              }
            >
              <Button variant="ghost" size="xs" isIcon iconName="icon-vertival-dots" />
            </Popup>
          </Frame>
        ))}
      </Frame>
    </Card>
  )
}

type DaySchedulePopupProps = {
  schedule: Schedule
  onMarkAsDone: () => void
  onDelete: () => void
}

// A complete schedule has nothing left to act on but its removal, so the badge
// stands where the mark as done button would be, the way the transaction popup
// does it.
function DaySchedulePopup({ schedule, onMarkAsDone, onDelete }: DaySchedulePopupProps) {
  const isComplete = schedule.status === "complete"

  return (
    <Frame className="gap-[var(--space-sm)] flex-col w-full">
      {isComplete ? (
        <Badge
          color="success"
          size="xxs"
          iconName="icon-badge-check"
          text="complete"
          className="w-max"
        />
      ) : (
        <Button
          variant="ghost"
          size="xs"
          rounded="sm"
          iconName="icon-double-check"
          iconColor="success"
          justify="start"
          width="stretch"
          className="hover:bg-[var(--color-background3)]"
          func={onMarkAsDone}
        >
          Mark as done
        </Button>
      )}

      <Button
        variant="ghost"
        size="xs"
        rounded="sm"
        iconName="icon-delete"
        iconColor="error"
        justify="start"
        width="stretch"
        className="hover:bg-[var(--color-error2)]"
        specificStyles={{
          backgroundColor: "var(--color-error2)",
          color: "var(--color-error)",
        }}
        func={onDelete}
      >
        Delete
      </Button>
    </Frame>
  )
}