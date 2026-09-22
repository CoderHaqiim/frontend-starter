"use client";

import { businessTasksQueryKey, getBusinessTasks } from "@/src/services/taskService";
import { Task, TaskStatus } from "@/src/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Badge from "../base/ui/composites/badge";
import Frame from "../base/ui/primitives/frame";
import Heading from "../base/ui/primitives/heading";
import TaskCard from "./cards/taskCard";

const columns: { status: TaskStatus; title: string }[] = [
	{ status: "overdue", title: "Overdue" },
	{ status: "pending", title: "Pending" },
	{ status: "in-progress", title: "In-progress" },
	{ status: "completed", title: "Completed" },
];

export default function TaskManager() {
	const { businessId } = useParams<{ businessId: string }>()
	const queryClient = useQueryClient()
	const { data: tasks = [] } = useQuery({
		queryKey: businessTasksQueryKey(businessId),
		queryFn: () => getBusinessTasks(businessId),
	})

	const updateTaskStatus = (taskId: string, status: TaskStatus) => {
		queryClient.setQueryData<Task[]>(businessTasksQueryKey(businessId), (currentTasks = []) =>
			currentTasks.map((task) =>
				String(task.id) === taskId ? { ...task, status } : task,
			),
		);
	};

	return (
		<div className="grid h-full min-h-0 w-full flex-1 grid-cols-4 gap-[1px] overflow-hidden border border-[var(--color-outline1)] bg-[var(--color-outline1)]">
			{
        		columns.map((column) => {
				  const columnTasks = tasks.filter((task) => task.status === column.status);

				return (
					<section key={column.status} className=" flex min-h-0 min-w-0 flex-col bg-[var(--color-background2)] px-[var(--space-md)] pt-[var(--space-lg)]"
						onDragOver={(event) => event.preventDefault()}
						onDrop={(event) => {
							event.preventDefault();
							const taskId = event.dataTransfer.getData("taskId");
							if (taskId) { updateTaskStatus(taskId, column.status) }
						}}
					>
						<Frame className="sticky gap-[var(--space-xs)] top-0 z-10 mb-[var(--space-md)] shrink-0 border-b border-b-[var(--color-outline1)] bg-[var(--color-background2)] pb-[var(--space-md)] flex items-center">
							<Heading type="h2" size="sm">{column.title}</Heading>
              				<Badge size="xxs" color="accent" text={columnTasks.length}/>
						</Frame>

						<Frame scroll="hidden" className="flex flex-col items-center gap-[var(--space-md)]">
							<Frame className="w-max items-center h-max pb-[var(--space-md)] flex flex-col gap-[var(--space-md)]">
								{ columnTasks.map((task) => ( <TaskCard key={task.id} task={task} />))}
							</Frame>
						</Frame>
					</section>
				);
			})}
		</div>
	);
}
