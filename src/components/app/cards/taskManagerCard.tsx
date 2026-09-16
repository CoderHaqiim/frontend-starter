"use client"

import { getTodayBusinessTasks, todayBusinessTasksQueryKey } from "@/src/services/taskService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
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

type TaskManagerCardProps = {
}

export default function TaskManagerCard({}: TaskManagerCardProps) {
  const {setBackdropContent, setBackdropOpen} = useBackdropState()
  const {colors} = useTheme()
  const { businessId } = useParams<{ businessId: string }>()
  const router = useRouter()
  const { data: tasks = [] } = useQuery({
    queryKey: todayBusinessTasksQueryKey(businessId),
    queryFn: () => getTodayBusinessTasks(businessId),
  })

  const createTask = () => {
    setBackdropOpen(true)
    setBackdropContent("create-task-form")
  }

  return (
    <Card
      padding="lg"
      rounded="md"
      width="290px"
      height="max-content"
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
        <Frame
          className="
            flex
            w-full
            h-max
            items-center
            gap-[var(--space-xs)]
            mb-[var(--space-md)]
            mt-[var(--space-sm)]
          "
        >
          <Heading type="h3" size="xxs">
            Today
          </Heading>

          <Frame>
            <Paragraph size="xxs">
              {" • " + (tasks?.length ?? "0") + " Tasks" +
                " • " + (tasks?.filter(task => task.status === "completed").length ?? "0") + " Completed" +
                " • " + (tasks?.filter(task => task.status === "pending").length ?? "0") + " Pending" +
                " • " + (tasks?.filter(task => task.status === "overdue").length ?? "0") + " Overdue"}
            </Paragraph>
          </Frame>
        </Frame>

        <List width="stretch" scroll="hidden" className="flex-1">
          {
            tasks?.slice(0,4).map((task) => <TaskLine task={task} key={task.id}/> )
          }
        </List>
      </div>
    </Card>
  )
}
