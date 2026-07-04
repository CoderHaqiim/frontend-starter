import PageComponent from "@/src/components/layout/page"
import Button from "@/src/components/ui/primitives/button"


export default function Test() {
  return (
    <PageComponent 
      scrollable
      padding="lg"
    >
 
      <Button text="hello" size="xxl" variant="text"/>
      <Button text="hello" size="xs" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>
      <Button text="hello" size="sm" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>
      <Button text="hello" size="md" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>
      <Button text="hello" size="lg" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>
      <Button text="hello" size="xl" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>
      <Button text="hello" size="xxl" iconName="icon-user-circle" iconPosition="right" iconColor="white" variant="text-icon"/>

       <div className="w-[60px] h-max text-[length:var(--bodySize-xs)]">Lalalal</div>
      <div className="w-[60px] h-max text-[length:var(--bodySize-sm)]">Lalalal</div>
      <div className="w-[60px] h-max text-[length:var(--bodySize-md)]">Lalalal</div>

      <span style={{ fontSize: "var(--bodySize-xl)" }}>
        Test
      </span>
    </PageComponent>
  )
}
