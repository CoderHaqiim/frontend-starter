"use client"

import TaskManager from "@/src/components/app/taskManager"
import Section from "@/src/components/base/layout/section"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import { useBackdropState } from "@/src/store/backdropState"

export default function Page() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  const createTask = () => {
    setBackdropOpen(true)
    setBackdropContent("create-task-form")
  }

  return (
    <Frame className="flex h-full min-h-0 w-full flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Task manager</Heading>
          </Frame>
          <Frame>
            <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus" func={createTask}>
              New Task
            </Button>
          </Frame>
        </Frame>
      </Section>
      <TaskManager />
    </Frame>
  )
}
