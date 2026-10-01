"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import {
  businessTasksQueryKey,
  createBusinessTask,
  refreshBusinessTaskViews,
  syncTodayTaskCache,
  updateBusinessTask,
} from "@/src/services/taskService"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { FormObjectTypes, Task } from "@/src/types/types"
import { getBusinessIdFromPathname } from "@/src/utils/businessIdFromPathname"
import { refreshBusinessHealthQueries } from "@/src/hooks/businessHealthRefresh"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Card from "../../base/ui/composites/card"
import Dropdown from "../../base/ui/composites/dropdown"
import Form from "../../base/ui/composites/form"
import Button from "../../base/ui/primitives/button"
import CloseButton from "../../base/ui/primitives/closeButton"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Input from "../../base/ui/primitives/input"
import Label from "../../base/ui/primitives/label"

type CreateTaskFormProps = {
  // The task being changed. The form opens blank when it is not given, and the
  // values it holds are saved back through the tasks route when it is.
  taskToEdit?: Task
}

export default function CreateTaskForm({ taskToEdit }: CreateTaskFormProps) {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const showToast = useShowToast()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)
  // A form opened from a business page always targets that business and the
  // business field is read only there. On the home dashboard there is no
  // business context, so the field stays changeable.
  const contextBusinessId = getBusinessIdFromPathname(pathname)
  const isBusinessContext = Boolean(contextBusinessId)
  // The form is the same form for both: the heading, the button and the request the
  // submit makes are the only things that differ.
  const isEditing = Boolean(taskToEdit)

  const saveTask = async (values: FormObjectTypes) => {
    const targetBusinessId = String(values.businessId ?? "")

    setIsSaving(true)

    try {
      // An edit travels through the same route as the create, keyed by the task it
      // changes, and the saved task replaces the card it was opened from.
      if (taskToEdit) {
        const { data: savedTask } = await updateBusinessTask(
          targetBusinessId,
          String(taskToEdit.id),
          values,
        )

        queryClient.setQueryData<Task[]>(
          businessTasksQueryKey(targetBusinessId),
          (currentTasks = []) =>
            currentTasks.map((task) =>
              String(task.id) === String(savedTask.id) ? savedTask : task,
            ),
        )
        refreshBusinessTaskViews(queryClient, targetBusinessId)
        // An edit can move a task's due date into or out of today, so the today card
        // is told about the saved task as well.
        syncTodayTaskCache(queryClient, targetBusinessId, savedTask)
        // The tasks are what the operational half of the health score is worked out
        // from, so saving one refreshes it the same way a saved transaction does.
        refreshBusinessHealthQueries(queryClient, targetBusinessId)

        showToast({
          variant: "success",
          title: "Task updated",
          message: `${savedTask.title} was updated successfully.`,
        })

        closeTaskForm()
        return
      }

      const { data: createdTask } = await createBusinessTask(targetBusinessId, values)

      // The new task is added to the board straight away. It is put in the today
      // cache as well when it is due today, so a task created for today appears in
      // the card straight away rather than after the round trip.
      queryClient.setQueryData<Task[]>(
        businessTasksQueryKey(targetBusinessId),
        (currentTasks = []) => [
          ...currentTasks.filter((task) => String(task.id) !== String(createdTask.id)),
          createdTask,
        ]
      )
      syncTodayTaskCache(queryClient, targetBusinessId, createdTask)
      refreshBusinessTaskViews(queryClient, targetBusinessId)
      refreshBusinessHealthQueries(queryClient, targetBusinessId)

      showToast({
        variant: "success",
        title: "Task created",
        message: `${createdTask.title} was created successfully.`,
      })

      closeTaskForm()
    } catch {
      showToast({
        variant: "error",
        title: isEditing ? "Update failed" : "Create failed",
        message: isEditing
          ? "The task could not be updated. Please try again."
          : "The task could not be created. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const closeTaskForm = () => {
    setBackdropContent(null)
    setBackdropOpen(false)
  }

  const {data:businesses = []} = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses
  })

  return (
    <Card width="500px" padding="xl" height="max-content">
      <Frame specificStyles={{
          position: "absolute",
          top:"15px",
          right:"15px"
        }}>
          <CloseButton size="sm" func={closeTaskForm} />
      </Frame>
      <Frame className="mb-[var(--space-xl)] justify-between">
        <Heading size="md" type="h2">
          {isEditing ? "Edit Task" : "Create Task"}
        </Heading>
      </Frame>

      <Form onSubmit={saveTask}>
        <Frame className="w-full flex-col gap-[var(--space-lg)]">

          {/* Task Title */}
          <Frame className="w-full flex-col">
            <Label required text="Task Title" size="xs" />
            <Input size="sm" required rounded="sm" placeholder="What needs to be done?" outline border type="text" name="title" variant="default" defaultValue={taskToEdit?.title}/>
          </Frame>

           {/* Description */}
          <Frame className="w-full flex-col">
            <Label required text="Description" size="xs" />
            <textarea
              required
              className="w-full text-[length:var(--bodySize-xs)] resize-none rounded-[var(--radius-sm)] border border-[var(--color-outline1)] p-[var(--space-sm)]"
              placeholder="Add details about this task..."
              name="description"
              rows={3}
              defaultValue={taskToEdit?.description}
            />
          </Frame>

          {/* Due Date */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label required text="Due Date" size="xs" />
              <input required type="date" name="dueDate" defaultValue={taskToEdit?.dueDate}
                className="w-full text-[length:var(--bodySize-sm)] h-[var(--elementSize-sm)] rounded-[var(--radius-sm)] border border-[var(--color-outline1)] bg-[var(--color-background1)] p-[var(--space-md)] outline-none"
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Priority" size="xs" />

              <Dropdown name="priority" size="sm" width="100%"
                defaultValue={taskToEdit?.priority}
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                  { label: "Urgent", value: "urgent" },
                ]}
              />
            </Frame>
          </Frame>

          {/* Status + Assignee */}
          <Frame className="gap-[var(--space-md)]">
            <Frame className="w-1/2 flex-col">
              <Label text="Status" size="xs" />

              <Dropdown name="status" size="sm" width="100%"
                defaultValue={taskToEdit?.status}
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Overdue", value: "overdue" },
                  { label: "In Progress", value: "in-progress" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Frame>

            <Frame className="w-1/2 flex-col">
              <Label text="Business" size="xs" />
              <Dropdown name="businessId" size="sm" width="100%"
                value={
                  isBusinessContext
                    ? contextBusinessId
                    : undefined
                }
                disabled={isBusinessContext}
                options={businesses.map((business) => ({
                  label: business.businessName,
                  value: business.id,
                }))}
              />
            </Frame>
          </Frame>

          {/* Submit */}
          <Frame className="justify-end w-full">
            <Button variant="fill" role="submit" size="md" propagate disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Card>
  )
}