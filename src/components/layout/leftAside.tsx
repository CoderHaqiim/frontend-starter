import Aside from "./aside";
import LinkComponent from "../ui/link";
import Button from "../ui/button";
import { navItems } from "@/src/utils/navItems";
import Frame from "../mixed/frame";

export default function LeftAside() {
   
  return (
    <Aside variant="left" specificStyles={{width:"220px"}}>
        <Frame variant="stretch" direction="column">
            {
                navItems.map(item =>
                    <LinkComponent key={item.id} href={item.link} variant="stretch" >
                        <Button iconPosition="left" propagate text={item.text} iconName={item.icon} variant="nav" id={item.id} />
                    </LinkComponent>
                )
            }
        </Frame>
    </Aside>
  )
}
