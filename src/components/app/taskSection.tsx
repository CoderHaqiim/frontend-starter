import TaskCard from "./taskCard";
import { Task } from "@/src/types/types";

interface Props {
  title: string;
  tasks: Task[];
}

export default function TaskSection({
  title,
  tasks,
}: Props) {
  if (!tasks.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </section>
  );
}