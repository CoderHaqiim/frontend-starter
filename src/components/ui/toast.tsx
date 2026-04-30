import Frame from "../mixed/frame"
import Icon from "./icon"
import Paragraph from "./paragraph"

export default function Toast() {
  return (
    <Frame variant="hug" padded rounded specificStyle={{border:"solid 0.5px #999999"}}>
        {/* <Icon variant="icon-sm" name="icon-badge-alert" /> */}
    </Frame>
  )
}
