import Card from "../../ui/composites/card"
import Spinner from "../../ui/composites/spinner"

export default function KpiLoader(){
  return (
     <Card width="100%" height="100px" padding="lg" rounded="md" className="flex-1 justify-center items-center bg-[var(--color-white)]">
        <Spinner size="xs"/>
    </Card>
  )
}
