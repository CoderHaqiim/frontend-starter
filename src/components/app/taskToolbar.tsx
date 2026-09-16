import Dropdown from "../base/ui/composites/dropdown";
import Frame from "../base/ui/primitives/frame";

export default function TaskToolbar() {
    const businessTasks = ["All Businesses", "Business1", "Business2"]
    const status = ["All", "Completed", "Pending", "On-going", "Cancelled"]
    const priority = ["high", "medium", "low"]

  return (
    <Frame className="justify-end pb-[var(--space-md)] gap-[var(--space-sm)] w-full h-max">
      <Dropdown size="sm" name="Business tasks" options={businessTasks} />
      <Dropdown size="sm" name="status" options={status} />
      <Dropdown size="sm" name="Business tasks" options={priority} />
    </Frame>
  );
}