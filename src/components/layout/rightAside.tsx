import Aside from "./aside";
import Frame from "../ui/primitives/frame";
import { colors } from "@/src/app/design/colors";
import Card from "../ui/composites/card";
import Heading from "../ui/primitives/heading";
import { space } from "@/src/app/design/spacing";
import Button from "../ui/primitives/button";

export default function RightAside() {
  return (
    <Aside variant="right" 
      specificStyles={{
        width:"320px", 
        backgroundColor: colors["background2"]
        }}
    >
        <Frame 
          width="stretch" 
          height="hug" 
          direction="column"
          specificStyles={{
            gap: space["md"]
          }}
        >
            <Card padding="md" rounded="sm" width="stretch" height="150px" specificStyles={{
              backgroundColor: colors["white"]
            }}>
              <Frame width="full" height="hug" 
              specificStyles={{
                justifyContent: "space-between",
                paddingBottom: space["md"],
                borderBottom: `solid 1px ${colors["outline"]}`
              }}>
                <Heading type="h2" size="sm" text="Task manager" specificStyles={{
                  marginBottom: space["sm"]
                }}/>
                <Frame specificStyles={{
                  gap: space["sm"]
                }}>
                  <Button variant="text-icon" iconPosition="left" iconColor="white" text="Add task" size="sm" iconName="icon-plus"/>
                  <Button variant="icon" size="sm" border iconName="icon-expand"/>
                </Frame>
              </Frame>
              <Frame width="stretch" height="hug" specificStyles={{
                marginTop: space["md"],
                gap: space["xs"]
              }}>
                <Button variant="text" border text="Due Today" size="xs" specificStyles={{
                  backgroundColor: colors["accent2"],
                  color: colors["accent1"],
                  border:`solid 2px ${colors["accent1"]}`
                }}/>
                <Button variant="text" border text="Time" size="xs" specificStyles={{
                  // backgroundColor: colors["accent2"],
                  backgroundColor:"transparent",
                  color: colors["accent1"],
                }}/>
                <Button variant="text" border text="Due Today" size="xs" specificStyles={{
                  // backgroundColor: colors["accent2"],
                  backgroundColor:"transparent",
                  color: colors["accent1"],
                }}/>
              </Frame>
            </Card>
            <Card padding="md" rounded="sm" width="stretch" height="150px" specificStyles={{
              backgroundColor: colors["white"]
            }}>
              <Frame width="full" height="hug" 
              specificStyles={{
                justifyContent: "space-between",
                paddingBottom: space["md"],
                borderBottom: `solid 1px ${colors["outline"]}`
              }}>
                <Heading type="h2" size="sm" text="Calendar" specificStyles={{
                  marginBottom: space["sm"]
                }}/>
                <Frame specificStyles={{
                  gap: space["sm"]
                }}>
                  <Button variant="icon" size="sm" border iconName="icon-expand"/>
                </Frame>
              </Frame>
              <Frame width="stretch" height="hug" specificStyles={{
                marginTop: space["md"],
                gap: space["xs"]
              }}>
                <Button variant="text" border text="Due Today" size="xs" specificStyles={{
                  backgroundColor: colors["accent2"],
                  color: colors["accent1"],
                  border:`solid 2px ${colors["accent1"]}`
                }}/>
                <Button variant="text" border text="Time" size="xs" specificStyles={{
                  // backgroundColor: colors["accent2"],
                  backgroundColor:"transparent",
                  color: colors["accent1"],
                }}/>
                <Button variant="text" border text="Due Today" size="xs" specificStyles={{
                  // backgroundColor: colors["accent2"],
                  backgroundColor:"transparent",
                  color: colors["accent1"],
                }}/>
              </Frame>
            </Card>
        </Frame>
    </Aside>
  )
}