import Button from "@/src/components/ui/button"
import Frame from "@/src/components/mixed/frame"

export default function Layout() {
  return (
    <div className="bg-white">
        <Button background="#010101" color="white" variant="btn-regular" text="hello"/>
        <Button background="#010101" color="#FFFF00" icon="icon-eye" variant="btn-regular-icon-left" text="hello world"/>
        <Button background="[#010101]" color="[white]" icon="icon-eye" variant="btn-regular-icon-right" text="hello world"/>
        <Frame variant="frame-fixed" rounded specificStyle={{width:"200px", height:"200px", backgroundColor:"yellow"}}/>
        <Frame variant="frame-hug" specificStyle={{backgroundColor:"pink"}}>
            Frame2
        </Frame>
    </div>
  )
}
