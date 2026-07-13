import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { Business } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"

type SmallBusinessOverviewProps = {
    business: Business
}

export default function SmallBusinessOverview({business}: SmallBusinessOverviewProps) {

    const {selectedBusiness, setSelectedBusiness} = useSelectedBusiness()

    const hoverStyles = 
    `after:left-[-9px] after:top-[-9px]
    after:absolute after:pointer-events-none 
    after:w-[calc(100%+18px)] after:h-[calc(100%+18px)] 
    after:rounded-[inherit] hover:after:bg-[var(--color-background2)]
    focus:after:border-[var(--color-accent1)] 
    focus:after:border-[2px] ${selectedBusiness?.id === business?.id? "after:bg-[var(--color-background3)] after:border-[var(--color-outline)] after:border-[1px]" : ""}`

    
  return (
    <div className={`w-[160px] rounded-[var(--radius-sm)] flex justify-center items-center relative shrink-0 h-[160px] ${hoverStyles}`}>
        <button onClick={() => setSelectedBusiness(business && business)} className={`w-full realtive z-[2] border-[1px] border-[var(--color-outline)] isolate z-0 shrink-0 flex justify-start p-[10px] align-start h-full rounded-[var(--radius-sm)] bg-[var(--color-white)] cursor-pointer`}>
            <span className="text-[12px] text-left text-[color:var(--color-textColor1)] font-[700]">{shortenText(business?.name, 18)}</span>
        </button>
    </div>
  )
}

