import Frame from "@/src/components/mixed/frame"
import Toast from "@/src/components/ui/toast"
import Button from "@/src/components/ui/button"
import Card from "@/src/components/ui/card"
import { navItems } from "@/src/utils/navItems"

export default function Layout() {
  return (
    <Frame variant="custom" direction="column" specificStyle={{width:"100%", gap:"8px", height:"100vh", backgroundColor:"white"}}>
      <Frame variant="custom" border direction="column" padded specificStyle={{width:"250px", height:"100%"}}>
        {
          navItems.map(item => <Button key={item.id} variant="nav" text={item.text} iconName={item.icon} iconPosition="left"/>)
        }
      </Frame>
      <Card>
        <Frame variant="custom" specificStyle={{width: "300px", height:"300p"}}>
          Hello
        </Frame>
      </Card>
    </Frame>
  )
}

