import Calculator from "@/src/components/app/cards/calculatorCard";
import Table from "@/src/components/ui/composites/table";
import CreateBusinessForm from "@/src/components/app/forms/createBusiness";
import ProfileCard from "@/src/components/app/cards/profileCard";
import TransactionManager from "@/src/components/app/transactionManager";
export default function page() {

  return (
    <div className={`w-[100%] h-[100%]`}>
      <TransactionManager/>
    </div>
  )
}
