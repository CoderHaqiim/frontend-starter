import Frame from "../ui/primitives/frame";
import Dropdown from "../ui/composites/dropdown";

export default function TaskToolbar() {
    const businessTasks = ["All Businesses", "Business1", "Business2"]
    const status = ["All", "Completed", "Pending", "On-going", "Cancelled"]
    const priority = ["high", "medium", "low"]

  return (
    <Frame gap="sm" justify="flex-end" width="stretch" height="hug" className="pb-[var(--space-md)] pb-[var(--space-md)]">
      <Dropdown size="sm" name="Business tasks" options={businessTasks} />
      <Dropdown size="sm" name="status" options={status} />
      <Dropdown size="sm" name="Business tasks" options={priority} />
    </Frame>
  );
}