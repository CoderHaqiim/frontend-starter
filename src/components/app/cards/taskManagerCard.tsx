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
import { useTheme } from "../../providers/themeProvider"

type TaskManagerCardProps = {
  expanded?: boolean
  onToggle?: () => void
}

export default function TaskManagerCard({
  expanded: controlledExpanded,
  onToggle,
}: TaskManagerCardProps) {
  const {setBackdropContent, setBackdropOpen} = useBackdropState()
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [internalExpanded, setInternalExpanded] = useState(true)
  const {colors} = useTheme()

  const expanded = controlledExpanded ?? internalExpanded

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

  const toggleExpanded = () => {
    if (onToggle) {
      onToggle()
      return
    }

    setInternalExpanded(prev => !prev)
  }

  return (
    <Card
      padding="lg"
      rounded="md"
      width="310px"
      height="max-content"
      specificStyles={{
        border: `solid 1px ${colors["outline1"]}`
      }}
    >
      <Frame className={`${expanded?"pb-[var(--space-sm)] border-b border-b-[var(--color-outline1)] mb-[var(--space-sm)]":""} flex w-full h-max items-center justify-between`}>
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

          <Tooltip content={expanded ? "collapse" : "open"} position="top">
            <Button
              variant="ghost"
              isIcon
              size="xs"
              iconName={expanded ? "icon-chevron-down" : "icon-right"}
              func={toggleExpanded}
            />
          </Tooltip>
        </Frame>
      </Frame>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? '500px' : '0px',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(-6px)',
        }}
      >
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