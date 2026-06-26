import Frame from '@/src/components/mixed/frame'
import Heading from '@/src/components/ui/heading'

export default function Item3() {
  return (
    <Frame variant="custom" padding="md" specificStyle={{width: "100%", height:"100%"}}>
      <Heading type="h1" text="Item3"/>
    </Frame>
  )
}
