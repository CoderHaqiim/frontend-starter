import Button from "@/src/components/ui/button"
import Frame from "@/src/components/mixed/frame"

export default function Layout() {
  return (
    <div className="bg-white flex flex-col">
        <Frame variant="fixed" rounded specificStyle={{width:"200px", height:"200px", backgroundColor:"yellow"}}/>
        <Frame variant="hug" specificStyle={{backgroundColor:"pink"}}>
            Frame2
        </Frame>
    </div>
  )
}

