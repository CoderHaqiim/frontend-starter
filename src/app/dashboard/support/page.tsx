import SupportManager from '@/src/components/app/supportManager'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'

export default function Item2() {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Support</Heading>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            New Ticket
          </Button>
        </Frame>
      </Frame>

      <SupportManager />
    </Frame>
  )
}