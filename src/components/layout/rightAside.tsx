import Aside from "./aside";
import Frame from "../ui/primitives/frame";
import { colors } from "@/src/app/design/colors";

export default function RightAside() {
  return (
    <Aside variant="right" specificStyles={{width:"300px", backgroundColor: colors["background2"]}}>
        <Frame width="stretch" height="hug" direction="column">
            
        </Frame>
    </Aside>
  )
}