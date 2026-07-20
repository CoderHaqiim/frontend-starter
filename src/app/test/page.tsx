import Scheduler from "@/src/components/app/cards/schedularCard";
import Frame from "@/src/components/ui/primitives/frame";

export default function page() {
  return (
    <Frame width="stretch" justify="center" align="center" height="100vh">
      <Scheduler/>
    </Frame>
  )
}
