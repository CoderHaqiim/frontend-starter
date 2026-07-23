"use client";

import { Task } from "@/src/types/types";
import TaskToolbar from "./taskToolbar";
import TaskSection from "./taskSection";
import EmptyState from "./emptyState";
import Section from "../layout/section";
import List from "../ui/composites/list";
import Frame from "../ui/primitives/frame";
import TaskItem from "./taskItem";

interface Props {
  tasks: Task[];
}

export default function TaskManager({ tasks }: Props) {
  const today = tasks.filter((t) => t.dueDate === "Today");
  const tomorrow = tasks.filter((t) => t.dueDate === "Tomorrow");
  const completed = tasks.filter((t) => t.status === "completed");

  const activeCount = today.length + tomorrow.length;

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <TaskToolbar/>
      <Frame width="stretch" height="hug">
        <List width="stretch" height="stretch" scroll="hidden">
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
        </List>
      </Frame>
    </Section>
  );
}