"use client"

import TaskManager from "@/src/components/app/taskManager"
import Button from "@/src/components/ui/primitives/button"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import { useBackdropState } from "@/src/store/backdropState"

export default function Page() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const createTask = () => {
    setBackdropOpen(true)
    setBackdropContent("create-task-form")
  }

  return (
    <Frame className="flex h-full min-h-0 w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Task manager</Heading>
        </Frame>
        <Frame>
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus" func={createTask}>
            New Task
          </Button>
        </Frame>
      </Frame>
      <TaskManager />
    </Frame>
  )
}
