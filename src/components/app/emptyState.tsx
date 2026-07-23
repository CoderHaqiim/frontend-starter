export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center">

      <div className="text-6xl">
        ✓
      </div>

      <h2 className="mt-4 text-xl font-semibold">
        No Tasks
      </h2>

      <p className="mt-2 text-gray-500">
        Create your first task to get started.
      </p>

      <button className="mt-6 rounded-lg bg-black px-5 py-2 text-white">
        New Task
      </button>

    </div>
  );
}