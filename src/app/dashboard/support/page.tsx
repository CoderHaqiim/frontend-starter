import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Button from '@/src/components/ui/primitives/button'
import SupportManager from '@/src/components/app/supportManager'

export default function Item2() {
  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Support</Heading>
        </Frame>
        <Frame>
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus">New Ticket</Button>
        </Frame>
      </Frame>
      <SupportManager/>
    </Frame>
  )
}
