import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Button from '@/src/components/ui/primitives/button'
import TransactionManager from '@/src/components/app/transactionManager'

export default function Item3() {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-lg)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex h-max w-full flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Transactions</Heading>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
          >
            New Transaction
          </Button>
        </Frame>
      </Frame>

      <TransactionManager />
    </Frame>
  )
}