import Frame from '@/src/components/ui/primitives/frame'
import Heading from '@/src/components/ui/primitives/heading'
import Button from '@/src/components/ui/primitives/button'
import TransactionManager from '@/src/components/app/transactionManager'

export default function Item3() {
  return (
    <Frame width="stretch" direction="column" height="hug" gap="lg">
      <Frame justify="space-between" width="stretch" height="hug">
        <Frame width="stretch" gap="xs" height="hug" direction="column">
          <Heading size="xl" type="h1">Transactions</Heading>
        </Frame>
        <Frame>
          <Button variant="outline" size="sm" iconPosition="left" iconName="icon-plus">New Transaction</Button>
        </Frame>
      </Frame>
      <TransactionManager/>
    </Frame>
  )
}
