import Aside from "./aside";
import Frame from "../mixed/frame";
import { colors } from "@/src/app/design/colors";

export default function RightAside() {
  return (
    <Aside variant="right" specificStyles={{width:"300px", backgroundColor: colors["background2"]}}>
        <Frame variant="stretch" direction="column">
            
        </Frame>
    </Aside>
  )
}