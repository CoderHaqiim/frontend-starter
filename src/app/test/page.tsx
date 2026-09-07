import TaskCard from "@/src/components/app/cards/taskCard";
import { Task } from "@/src/types/types";

export default function page() {

  type taskType = Task

  const task: Task = {
  id: 'task-001',
  title: 'Design task manager UI',
  description: 'Create the task manager layout with status columns and task cards.',
  priority: "high",
  dueDate: '2026-09-10',
  assignee: {
    name: 'Jaye',
  },
  status: "pending",
}

  return (
    <div className={`w-[100%] h-[100%]`}>
      <TaskCard task={task}/>
    </div>
  )
}
