import SupportManager from '@/src/components/app/supportManager'
import Section from '@/src/components/base/layout/section'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'

export default function Item2() {
  return (
    <Frame className="flex w-full flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
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
      </Section>

      <SupportManager />
    </Frame>
  )
}