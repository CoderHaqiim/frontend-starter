"use client"

import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import TaskLine from "../taskLine"
import Paragraph from "../../ui/primitives/paragraph"
import Tooltip from "../../ui/composites/tooltip"
import List from "../../ui/composites/list"
import { useBackdropState } from "@/src/store/backdropState"
import { useEffect, useState } from "react"
import { http } from "@/src/http/client"
import { Task } from "@/src/types/types"

export default function TaskManagerCard() {
  const {setBackdropContent, setBackdropOpen} = useBackdropState()
  const [tasks, setTasks] = useState<Task[] | null>(null)

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
      width="335px"
      height="100%"
    >
      <Frame className=" flex w-full h-max mb-[var(--space-lg)] items-center justify-between">
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
          tasks?.map((task, index) => <TaskLine task={task} key={task.id}/>)
        }
      </List>
    </Card>
  )
}