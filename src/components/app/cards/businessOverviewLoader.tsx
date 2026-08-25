import Card from '../../ui/composites/card'
import Spinner from '../../ui/composites/spinner'
import { useTheme } from '../themeProvider'

export default function BusinessOverviewLoader() {
    const {colors} = useTheme()
  return (
    <Card width="289px" padding="sm" height="250px" className='justify-center items-center' 
        specificStyles={{
            position: "relative",
            border: `solid 1px ${colors["outline1"]}`,
            flexShrink: 0,
            background: colors["white"],
        }}>
        <Spinner/>
    </Card>
  )
}
