"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import TaskManager from "@/src/components/app/taskManager"
import Button from "@/src/components/ui/primitives/button"

export default function page() {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Task manager</Heading>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            New Task
          </Button>
        </Frame>
      </Frame>

      <TaskManager />
    </Frame>
  )
}