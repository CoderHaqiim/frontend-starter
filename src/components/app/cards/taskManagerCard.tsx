"use client"

import { http } from "@/src/http/client"
import { useBackdropState } from "@/src/store/backdropState"
import { Task } from "@/src/types/types"
import { useEffect, useState } from "react"
import { useTheme } from "../../providers/themeProvider"
import Card from "../../ui/composites/card"
import List from "../../ui/composites/list"
import Tooltip from "../../ui/composites/tooltip"
import Button from "../../ui/primitives/button"
import Frame from "../../ui/primitives/frame"
import Heading from "../../ui/primitives/heading"
import Paragraph from "../../ui/primitives/paragraph"
import TaskLine from "../taskLine"

type TaskManagerCardProps = {
}

export default function TaskManagerCard({}: TaskManagerCardProps) {
  const {setBackdropContent, setBackdropOpen} = useBackdropState()
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const {colors} = useTheme()

  useEffect(()=>{
    const fetchTasks = async() => {
      const tasks = await http<Task[]>("/api/tasks")
      setTasks(tasks)
    }
    fetchTasks()
  },[])

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
            <Button variant="outline" isIcon size="xs" iconName="icon-open"/>
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
            <Paragraph size="xs">
              {
                " • " + 
                (tasks?.length ?? "0") + 
                " Tasks" + 
                " • " +
                (tasks?.filter(task => task?.status === "completed").length ?? "0") + 
                " Completed" +
                " • " +
                (tasks?.filter(task => task?.status === "pending").length ?? "0") +
                " Pending"
                }
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