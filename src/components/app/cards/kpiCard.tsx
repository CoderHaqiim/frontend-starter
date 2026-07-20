import Card from "../../ui/composites/card"
import Paragraph from "../../ui/primitives/paragraph"

type KpiCardProps = {
    title: string,
    value: string
}

export default function KpiCard({title, value}: KpiCardProps) {
  return (
    <Card width="stretch" height="100px" padding="lg" rounded="md" className="bg-[var(--color-white)]">
        <Paragraph size="xs" color="textColor2" weight="normal">{title}</Paragraph>
        <Paragraph size="xxl" color="textColor1" weight="medium">{value}</Paragraph>
    </Card>
  )
}
