import Frame from "@/src/components/mixed/frame"
import Toast from "@/src/components/ui/toast"
import Button from "@/src/components/ui/button"

export default function Layout() {
  return (
    <Frame variant="custom" padded direction="column" specificStyle={{width:"100%", gap:"8px", height:"100vh", backgroundColor:"white"}}>
      <Toast variant="error" text="Error"/>
      <Toast variant="success" text="success"/>
      <Toast variant="warning" text="warning"/>
      <Toast variant="info" text="infosdvbh s fshdd  s dc s vgcgcccchccvhlvrtrdtrcfcgvjdjj;lsakdksakdjkas;lk;dk;lkgv"/>
      <Button variant="regular" text="Click Here" specificStyle={{backgroundColor:"#010101"}}/>
    </Frame>
  )
}

