"use client"

import { ReactNode, isValidElement } from "react"
import Frame from "./frame"
import { useBackdropState } from "@/src/store/backdropState"
import CreateBusinessForm from "../../app/forms/createBusiness"
import CreateTaskForm from "../../app/forms/createTask"
import EditBusinessForm from "../../app/forms/editBusiness"
import CreateInventoryItemForm from "../../app/forms/createInventoryItem"
import CreateInvoiceForm from "../../app/forms/createInvoice"
import CreateGoalForm from "../../app/forms/createGoal"
import CreateCustomerForm from "../../app/forms/createCustomer"

type BackdropProps = {
    children?: ReactNode,
}

export default function Backdrop({children}: BackdropProps) {
  const {backdropOpen, backdropContent} = useBackdropState()

  const selectBackdropContent = ()=> {
    if (isValidElement(backdropContent)) {
      return backdropContent
    }

    switch(backdropContent){
      case "create-business-form": return <CreateBusinessForm/> 
      case "create-task-form": return <CreateTaskForm/> 
      case "edit-business-form": return <EditBusinessForm/> 
      case "create-inventory-item-form": return <CreateInventoryItemForm/> 
      case "create-invoice-form": return <CreateInvoiceForm/> 
      case "create-goal-form": return <CreateGoalForm/> 
      case "create-customer-form": return <CreateCustomerForm/> 
      default: return null 
    }
  }

  return (
    <Frame className="w-full h-[100vh] justify-center items-center bg-[#00000040] inset-0 z-3000" 
        specificStyles={{
            display: backdropOpen? "flex" : "none",
            position: "fixed"
        }}>
         {children ?? selectBackdropContent()}
    </Frame>
  )
}
