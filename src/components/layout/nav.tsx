import Frame from '../mixed/frame'
import Logo from '../ui/logo'
import Button from '../ui/button'
import Searchbar from '../ui/searchbar'
import { space, spaceVariables } from '@/src/app/design/space'
import { colors, colorVariables } from '@/src/app/design/colors'

export default function Nav() {
  return (
    <nav className='flex z-[500] items-center justify-center w-full h-[60px]'>
        <Frame variant="stretch" specificStyle={{justifyContent:"space-between", height:"100%", alignItems: "center", padding:`0px ${space["lg"]}`, backgroundColor:"white"}}>
          <Logo/>
          <Frame variant='custom' specificStyle={{gap:space["md"], height:"100%", alignItems:"center"}}>
            <Searchbar/>
            <Button size="md" iconName="icon-bell" id="notification-btn" variant="icon" specificStyle={{border:"solid 1px var(--outline-color2)", borderRadius:"8px"}}>
              <span className={`w-[20px] font-[600] flex items-center justify-center absolute top-[-8px] rounded-[var(--lg)] right-[-8px] text-[9px] bg-[var(--accent1)] h-[20px] text-[white] border-[2px] border-[white]`} style={{...spaceVariables, ...colorVariables}}>
                10
              </span>
            </Button>
            <Button size="md" iconName="icon-user" id="profile-btn" variant="icon" specificStyle={{border:"solid 1px var(--outline-color2)", borderRadius:"50%"}}/>
          </Frame>
        </Frame>
    </nav>
  )
}
