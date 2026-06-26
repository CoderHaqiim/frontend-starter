import Aside from "./aside";
import LinkComponent from "../ui/link";
import { navItems } from "@/src/utils/navItems";
import Frame from "../mixed/frame";
import { space } from "@/src/app/design/space";
import { colors } from "@/src/app/design/colors";

export default function LeftAside() {
   
  return (
    <Aside variant="left" specificStyles={{width:"240px", backgroundColor: colors["background2"]}}>
        <Frame variant="stretch" direction="column" specificStyle={{gap: space["sm"]}}>
            {
                navItems.map(item =>
                    <LinkComponent key={item.id} iconColor={`var(--text-color2)`} href={item.link} size="xl" text={item.text} iconName={item.icon} iconPosition="left" variant="nav-link" id={item.id} />
                )
            }
        </Frame>
    </Aside>
  )
}
