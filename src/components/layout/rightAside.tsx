import Aside from "./aside";
import LinkComponent from "../ui/link";
import Button from "../ui/button";
import { navItems } from "@/src/utils/navItems";
import Frame from "../mixed/frame";

export default function RightAside() {
  return (
    <Aside variant="right" specificStyles={{width:"300px"}}>
        <Frame variant="stretch" direction="column">
            
        </Frame>
    </Aside>
  )
}