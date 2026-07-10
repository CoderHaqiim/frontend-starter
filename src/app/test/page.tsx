import PageComponent from "@/src/components/layout/page"
import Button from "@/src/components/ui/primitives/button"
import Modal from "@/src/components/ui/composites/modal"
import Toast from "@/src/components/ui/composites/toast"


export default function Test() {
  return (
    <PageComponent 
      scrollable
      padding="lg"
    >


      <Toast variant="success" title="Hello" text="This is a toast"/>
      <Toast variant="error" text="This is a looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong toast"/>
      <Modal 
        title="Good modal"
        id="id1"
      >
        Hello
      </Modal>
      <Button variant="fill" size="xxl">Hello</Button>
      <div className="w-[60px] h-max text-[length:var(--bodySize-xs)]">Lalalal</div>
      <div className="w-[60px] h-max text-[length:var(--bodySize-sm)]">Lalalal</div>
      <div className="w-[60px] h-max text-[length:var(--bodySize-md)]">Lalalal</div>
    </PageComponent>
  )
}
