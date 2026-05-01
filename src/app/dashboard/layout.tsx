import Frame from "@/src/components/mixed/frame"
import Toast from "@/src/components/ui/toast"
import Button from "@/src/components/ui/button"
import Card from "@/src/components/ui/card"

export default function Layout() {
  return (
    <Frame variant="custom" padded direction="column" specificStyle={{width:"100%", gap:"8px", height:"100vh", backgroundColor:"white"}}>
      <Toast variant="error" text="Error"/>
      <Toast variant="success" text="success"/>
      <Toast variant="warning" text="warning"/>
      <Toast variant="info" text="infosdvbh s fshdd  s dc s vgcgcccchccvhlvrtrdtrcfcgvjdjj;lsakdksakdjkas;lk;dk;lkgv"/>
      <Frame variant="custom" direction="row">
        <Button variant="regular" text="Hello"/>
        <Button variant="regular" text="Hello"/>
        <Button variant="textIcon" iconColor="yellow" iconName="icon-user-circle" iconPosition="left" text="Hello"/>
        <Button variant="textIcon" iconColor="green" iconName="icon-badge-alert" iconPosition="right" text="Hello"/>
        <Button variant="icon" size="xl" iconColor="green" iconName="icon-badge-alert" specificStyle={{backgroundColor: "blue"}}/>
        <Button variant="icon" size="lg" iconColor="green" iconName="icon-user-circle" specificStyle={{backgroundColor: "red"}}/>
      </Frame>
      <Card>
        <Frame variant="custom" specificStyle={{width: "300px", height:"300p"}}>
          Hello
        </Frame>
      </Card>
    </Frame>
  )
}

