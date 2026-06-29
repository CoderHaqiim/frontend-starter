import PageComponent from "@/src/components/layout/page"
import Button from "@/src/components/ui/primitives/button"


export default function Test() {
  return (
    <PageComponent 
      scrollable
      padding="lg"
    >
      <Button text="hello" size="xs" variant="regular"/>
      <Button text="hello" size="sm" variant="regular"/>
      <Button text="hello" size="md" variant="regular"/>
      <Button text="hello" size="lg" variant="regular"/>
      <Button text="hello" size="xl" variant="regular"/>
      <Button text="hello" size="xxl" variant="regular"/>
      <Button text="hello" size="xs" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
      <Button text="hello" size="sm" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
      <Button text="hello" size="md" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
      <Button text="hello" size="lg" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
      <Button text="hello" size="xl" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
      <Button text="hello" size="xxl" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="textIcon"/>
    </PageComponent>
  )
}
