"use client";

import { businessTasksQueryKey, deleteBusinessTask, getBusinessTasks, todayBusinessTasksQueryKey, updateBusinessTask } from "@/src/services/taskService";
import { useToastState } from "@/src/store/toastState";
import { Task, TaskStatus, ToastType } from "@/src/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Badge from "../base/ui/composites/badge";
import EmptyState from "../base/ui/composites/emptyState";
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
	const { toastState, setToastState } = useToastState()
	const { data: tasks = [] } = useQuery({
		queryKey: businessTasksQueryKey(businessId),
		queryFn: () => getBusinessTasks(businessId),
	})

	const showToast = (toast: ToastType) => {
		setToastState([...toastState, toast])
	}

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteBusinessTask(businessId, taskId)

			// The card leaves the board straight away, and the board and the today
			// card both refetch.
			queryClient.setQueryData<Task[]>(businessTasksQueryKey(businessId), (currentTasks = []) =>
				currentTasks.filter((task) => String(task.id) !== taskId),
			)
			queryClient.invalidateQueries({ queryKey: businessTasksQueryKey(businessId) })
			queryClient.invalidateQueries({ queryKey: todayBusinessTasksQueryKey(businessId) })

			showToast({
				variant: "success",
				title: "Task deleted",
				message: "The task was deleted successfully.",
			})
		} catch {
			showToast({
				variant: "error",
				title: "Delete failed",
				message: "The task could not be deleted. Please try again.",
			})
		}
	}

	const updateTaskStatus = (taskId: string, status: TaskStatus) => {
		queryClient.setQueryData<Task[]>(businessTasksQueryKey(businessId), (currentTasks = []) =>
			currentTasks.map((task) =>
				String(task.id) === taskId ? { ...task, status } : task,
			),
		);

		// The move is saved as well, and the board is refetched either way so it
		// matches the store when the request fails.
		updateBusinessTask(businessId, taskId, { status })
			.then(() => {
				queryClient.invalidateQueries({ queryKey: businessTasksQueryKey(businessId) })
				queryClient.invalidateQueries({ queryKey: todayBusinessTasksQueryKey(businessId) })
			})
			.catch(() => {
				queryClient.invalidateQueries({ queryKey: businessTasksQueryKey(businessId) })

				showToast({
					variant: "error",
					title: "Update failed",
					message: "The task status could not be saved. Please try again.",
				})
			});
	};

	// The board has no cards yet, so it keeps its frame and centres the message
	// inside it. `surface=""` keeps the message from drawing a box of its own.
	if (tasks.length === 0) {
		return (
			<Frame className="h-full min-h-0 w-full flex-1 items-center justify-center border border-[var(--color-outline1)] bg-[var(--color-background2)]">
				<EmptyState message="When you create tasks, they appear here." surface="" />
			</Frame>
		);
	}

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
								{ columnTasks.map((task) => ( <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />))}
							</Frame>
						</Frame>
					</section>
				);
			})}
		</div>
	);
}
