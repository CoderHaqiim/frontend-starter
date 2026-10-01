"use client"

import { getTodayBusinessTasks, refreshBusinessTaskViews, todayBusinessTasksQueryKey, updateBusinessTask } from "@/src/services/taskService"
import useBusinessHealthRefresh from "@/src/hooks/businessHealthRefresh"
import { useBackdropState } from "@/src/store/backdropState"
import { useShowToast } from "@/src/store/toastState"
import { Task } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import Card from "../../base/ui/composites/card"
import List from "../../base/ui/composites/list"
import Tooltip from "../../base/ui/composites/tooltip"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"
import { useTheme } from "../../providers/themeProvider"
import TaskLine from "../taskLine"

// The card is a glance at the day rather than the whole list, so it lists this many
// of the tasks due today. The counts above it still report every task due today, so a
// day holding more than this says so through the count rather than by growing the
// card.
const visibleTaskCount = 4

export default function TaskManagerCard() {
  const {setBackdropContent, setBackdropOpen} = useBackdropState()
  const {colors} = useTheme()
  const { businessId } = useParams<{ businessId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const showToast = useShowToast()
  // Completing a task changes the share of completed tasks the health score is
  // measured on, so the score is refetched with the list.
  const refreshBusinessHealth = useBusinessHealthRefresh(businessId)
  const { data: tasks = [] } = useQuery({
    queryKey: todayBusinessTasksQueryKey(businessId),
    queryFn: () => getTodayBusinessTasks(businessId),
  })

  // Ticking a task completes it. The tick travels through the tasks route as a
  // status change, so the board behind it and the today card both read the same
  // status once it comes back.
  const completeTask = async (taskId: string) => {
    try {
      const { data: savedTask } = await updateBusinessTask(businessId, taskId, { status: "completed" })

      // The line stays ticked straight away, and the list is refetched either way so
      // it matches the store when the request fails.
      queryClient.setQueryData<Task[]>(todayBusinessTasksQueryKey(businessId), (currentTasks = []) =>
        currentTasks.map((task) => (String(task.id) === taskId ? savedTask : task)),
      )
      refreshBusinessTaskViews(queryClient, businessId)
      refreshBusinessHealth()

      showToast({
        variant: "success",
        title: "Task completed",
        message: `${savedTask.title} was marked as completed.`,
      })
    } catch {
      showToast({
        variant: "error",
        title: "Update failed",
        message: "The task could not be completed. Please try again.",
      })
    }
  }

  const createTask = () => {
    setBackdropOpen(true)
    setBackdropContent("create-task-form")
  }

  return (
    <Card padding="lg" rounded="md" width="290px" height="max-content"
      specificStyles={{
        border: `solid 1px ${colors["outline1"]}`
      }}
    >
      <Frame className="flex w-full h-max items-center justify-between pb-[var(--space-sm)] mb-[var(--space-sm)]">
        <Frame>
          <Heading type="h2" size="sm">Tasks</Heading>
        </Frame>
        <Frame className="flex gap-[var(--space-sm)]">
          <Button func={createTask} variant="outline" iconPosition="left" size="xs" iconName="icon-plus">
            Add Task
          </Button>

          <Tooltip content="open" position="top">
            <Button variant="outline" isIcon size="xs" iconName="icon-open"
              func={() => router.push(`/dashboard/businesses/${businessId}/tasks`)}
            />
          </Tooltip>
        </Frame>
      </Frame>

      <div>
        <Frame className=" flex flex-col w-full h-max gap-[var(--space-xs)] mb-[var(--space-md)] mt-[var(--space-sm)]">
          <Paragraph size="xs"> Today</Paragraph>

          <Frame className="gap-[var(--space-sm)]">
            <Paragraph size="xxs">{(tasks?.length ?? "0") + " Tasks"}</Paragraph>
            <Paragraph size="xxs">{" • " + (tasks?.filter(task => task.status === "completed").length ?? "0") + " Completed"}</Paragraph>
            <Paragraph size="xxs">{" • " + (tasks?.filter(task => task.status === "pending").length ?? "0") + " Pending"}</Paragraph>
            <Paragraph size="xxs">{" • " + (tasks?.filter(task => task.status === "overdue").length ?? "0") + " Overdue"}</Paragraph>
          </Frame>
        </Frame>

        <List width="stretch" scroll="hidden" className="flex-1"  specificStyles={{
          borderRadius: "var(--radius-sm)"
        }}>
          {
            tasks?.length
              ? tasks.slice(0, visibleTaskCount).map((task) => <TaskLine task={task} key={task.id} onComplete={completeTask}/>)
              : (
                <Frame className="flex bg-[var(--color-background1)] w-full h-max items-center justify-center p-[var(--space-md)]">
                  <Paragraph size="xs" color="textColor1" weight="medium" className="text-center">You have no tasks for today</Paragraph>
                </Frame>
              )
          }
        </List>
      </div>
    </Card>
  )
}
