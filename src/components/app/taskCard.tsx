import { Task } from "@/src/types/types";

interface Props {
  task: Task;
}

const priorityColor = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskCard({
  task,
}: Props) {
  return (
    <div className="group flex items-start gap-4 rounded-xl border p-4 transition hover:border-black hover:shadow">
      <input
        type="checkbox"
        className="mt-1"
      />

      <div className="flex-1">

        <h3 className="font-medium">
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-1 text-sm text-gray-500">
            {task.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">

          <span>{task.business}</span>

          <span>{task.dueDate}</span>

          <span
            className={`rounded-full px-2 py-1 text-xs ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>

        </div>

      </div>

      <button className="opacity-0 transition group-hover:opacity-100">
        ⋮
      </button>

    </div>
  );
}