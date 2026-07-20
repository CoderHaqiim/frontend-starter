"use client"

import { useState } from "react"
import { Schedule } from "@/src/types/types"

type ScheduleModalProps = {
  date: Date | null
  onClose: () => void
  onSubmit: (
    schedule: Omit<Schedule, "id">
  ) => void
}

export default function ScheduleModal({
  date,
  onClose,
  onSubmit,
}: ScheduleModalProps) {

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [type, setType] =
    useState<Schedule["type"]>("task")

  const [startDate, setStartDate] =
    useState(
      date
        ? date.toISOString().slice(0, 16)
        : ""
    )

  const [reminder, setReminder] =
    useState(30)


  function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    onSubmit({

      title,

      description,

      type,

      startDate: new Date(
        startDate
      ).toISOString(),

      completed: false,

      source: "local",

      reminderMinutesBefore:
        reminder,

    })

  }


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >

        <h2 className="mb-5 text-lg font-semibold">
          Add schedule
        </h2>


        <div className="space-y-4">

          <input
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Schedule title"
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              outline-none
              focus:border-black
            "
          />


          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="
              min-h-[100px]
              w-full
              rounded-lg
              border
              px-3
              py-2
              outline-none
            "
          />


          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as Schedule["type"]
              )
            }
            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
            "
          >
            <option value="task">
              Task
            </option>

            <option value="meeting">
              Meeting
            </option>

            <option value="reminder">
              Reminder
            </option>

            <option value="event">
              Event
            </option>

          </select>


          <div>

            <label className="mb-1 block text-sm">
              Date and time
            </label>

            <input
              required
              type="datetime-local"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-lg
                border
                px-3
                py-2
              "
            />

          </div>


          <div>

            <label className="mb-1 block text-sm">
              Reminder
            </label>

            <select
              value={reminder}
              onChange={(e) =>
                setReminder(
                  Number(e.target.value)
                )
              }
              className="
                w-full
                rounded-lg
                border
                px-3
                py-2
              "
            >

              <option value={0}>
                At time of event
              </option>

              <option value={5}>
                5 minutes before
              </option>

              <option value={15}>
                15 minutes before
              </option>

              <option value={30}>
                30 minutes before
              </option>

              <option value={60}>
                1 hour before
              </option>

            </select>

          </div>

        </div>


        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              px-4
              py-2
              text-sm
              hover:bg-gray-100
            "
          >
            Cancel
          </button>


          <button
            type="submit"
            className="
              rounded-lg
              bg-black
              px-4
              py-2
              text-sm
              text-white
            "
          >
            Save schedule
          </button>

        </div>

      </form>

    </div>

  )
}