import Scheduler from "@/src/components/app/cards/schedularCard";
import Frame from "@/src/components/ui/primitives/frame";
import TaskManager from "@/src/components/app/taskManager";
import { Task } from "@/src/types/types";
import Badge from "@/src/components/ui/composites/badge";

export default function page() {
  return (
    <Frame width="stretch" justify="center" align="center" height="100vh">
      <Badge text="Hello" color="success"/>
    </Frame>
  )
}
