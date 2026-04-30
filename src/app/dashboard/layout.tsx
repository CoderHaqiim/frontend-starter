import Frame from "@/src/components/mixed/frame"
import Toast from "@/src/components/ui/toast"

export default function Layout() {
  return (
    <Frame variant="custom" direction="column" specificStyle={{width:"100%", height:"100vh", backgroundColor:"white"}}>
      <Toast/>
    </Frame>
  )
}

