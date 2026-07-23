import Scheduler from "@/src/components/app/cards/schedularCard";
import Frame from "@/src/components/ui/primitives/frame";
import TaskManager from "@/src/components/app/taskManager";
import { Task } from "@/src/types/types";

export default function page() {
  const tasks: Task[] = [
  {
    id: "1",
    title: "Finish June Report",
    description: "Prepare the monthly financial report.",
    business: "Multilinks Ltd",
    dueDate: "Today",
    priority: "high",
    status: "todo",
  },
  {
    id: "2",
    title: "Call Supplier",
    business: "Opic Farms",
    dueDate: "Tomorrow",
    priority: "medium",
    status: "todo",
  },
];

  return (
    <Frame width="stretch" justify="center" align="center" height="100vh">
      <TaskManager tasks={tasks}/>
    </Frame>
  )
}
