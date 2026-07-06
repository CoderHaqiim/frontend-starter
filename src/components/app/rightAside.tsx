import Aside from "../layout/aside";
import Frame from "../ui/primitives/frame";
import { colors } from "@/src/app/design/colors";
import { space } from "@/src/app/design/spacing";
import TaskManagerCard from "./cards/taskManagerCard";
import SchedularCard from "./cards/schedularCard";

export default function RightAside() {
  return (
    <Aside variant="right" 
      specificStyles={{
        width:"350px", 
        backgroundColor: colors["background2"]
        }}
    >
        <Frame 
          width="stretch" 
          height="hug" 
          direction="column"
          specificStyles={{
            gap: space["md"]
          }}
        >
            <TaskManagerCard/>
            <SchedularCard/>
        </Frame>
    </Aside>
  )
}