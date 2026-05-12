import Frame from "@/src/components/mixed/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/heading"

export default function Home() {
  return (

    <Main>
      <Frame variant="stretch" padding="lg">
        <Heading type="heading2" text="Dashboard"/>
      </Frame>
    </Main>
  )
}
