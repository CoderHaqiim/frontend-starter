import Frame from '@/src/components/mixed/frame'
import Heading from '@/src/components/ui/heading'

export default function Item2() {
  return (
    <Frame variant="custom" padding="md" specificStyle={{width: "100%", height:"100%"}}>
      <Heading type="h1" text="Item2"/>
    </Frame>
  )
}
