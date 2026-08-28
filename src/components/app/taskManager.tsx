"use client";

import { Task } from "@/src/types/types";
import TaskToolbar from "./taskToolbar";
import EmptyState from "./emptyState";
import Section from "../layout/section";
import List from "../ui/composites/list";
import Frame from "../ui/primitives/frame";
import TaskItem from "./taskItem";
import Paragraph from "../ui/primitives/paragraph";
import { useEffect, useState } from "react";
import { http } from "@/src/http/client";
import Dropdown from "../ui/composites/dropdown";

interface Props {
  tasks: Task[];
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = tasks.filter((t) => t.dueDate === "Today");
  const tomorrow = tasks.filter((t) => t.dueDate === "Tomorrow");
  const completed = tasks.filter((t) => t.status === "completed");
  const activeCount = today.length + tomorrow.length;

  const businessTasks = ["All Businesses", "Business1", "Business2"]
  const status = ["All", "Completed", "Pending", "On-going", "Cancelled"]
  const priority = ["high", "medium", "low"]

  async function fetchTasks() {
    const tasks = await http<Task[]>("/api/tasks", undefined, {
      method: "GET",
    });
    setTasks(tasks);
  }

  return (
    <Section width="stretch" height="hug" className="min-h-[200px]">
      <Frame className="justify-end pb-[var(--space-md)] gap-[var(--space-sm)] w-full h-max">
        <Dropdown width="max-content" size="sm" name="Business tasks" options={businessTasks} />
        <Dropdown width="max-content" size="sm" name="status" options={status} />
        <Dropdown width="max-content" size="sm" name="Business tasks" options={priority} />
      </Frame>

      <Frame className="w-full h-full">
        {tasks.length > 0 ? (
          <List width="stretch" height="stretch" scroll="hidden">
            {tasks.map((task, index) => (
              <TaskItem key={index} task={task} />
            ))}
          </List>
        ) : (
          <Frame className="w-full h-full flex justify-center items-center">
            <Paragraph
              size="md"
              weight="light"
              className="text-center w-full h-[100px] flex"
            >
              When you create tasks, they appear here.
            </Paragraph>
          </Frame>
        )}
      </Frame>
    </Section>
  );
}