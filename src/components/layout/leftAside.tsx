import Aside from "./aside";
import LinkComponent from "../ui/primitives/link";
import { navItems } from "@/src/utils/navItems";
import Frame from "../ui/primitives/frame";
import { space } from "@/src/app/design/spacing";
import { colors } from "@/src/app/design/colors";

export default function LeftAside() {
   
  return (
    <Aside variant="left" specificStyles={{width:"240px", backgroundColor: colors["white"]}}>
        <Frame width="stretch" height="hug" direction="column" specificStyle={{gap: space["sm"]}}>
            {
                navItems.map(item =>
                    <LinkComponent key={item.id} href={item.link} size="xl" text={item.text} iconName={item.icon} iconPosition="left" variant="nav-link" id={item.id} />
                )
            }
        </Frame>
    </Aside>
  )
}
