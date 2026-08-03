"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import TaskManager from "@/src/components/app/taskManager"
import { Task } from "@/src/types/types"
import Button from "@/src/components/ui/primitives/button"

export default function page() {

  return (
      <Frame width="stretch" direction="column" height="hug" gap="lg"> 
        <Frame justify="space-between" width="stretch" height="hug"> 
          <Frame width="stretch" gap="xs" height="hug" direction="column">
            <Heading size="xl" type="h1">Task manager</Heading>
          </Frame>
          <Frame>
            <Button variant="fill" size="sm" iconPosition="left" iconName="icon-plus">New Task</Button>
          </Frame>
        </Frame>
        <TaskManager/>
      </Frame>
  )
}
