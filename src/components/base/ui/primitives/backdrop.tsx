"use client"

import { useBackdropState } from "@/src/store/backdropState"
import { ReactNode, isValidElement } from "react"
import CreateCustomerForm from "../../../app/forms/createCustomer"
import CreateInventoryItemForm from "../../../app/forms/createInventoryItem"
import CreateInvoiceForm from "../../../app/forms/createInvoice"
import CreateReceiptForm from "../../../app/forms/createReceipt"
import CreateTaskForm from "../../../app/forms/createTask"
import EditBusinessForm from "../../../app/forms/editBusiness"
import ScheduleModal from "../../../app/forms/scheduleModal"
import Frame from "./frame"

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
      case "create-task-form": return <CreateTaskForm/> 
      case "edit-business-form": return <EditBusinessForm/> 
      case "create-inventory-item-form": return <CreateInventoryItemForm/> 
      case "create-invoice-form": return <CreateInvoiceForm/> 
      case "create-receipt-form": return <CreateReceiptForm/> 
      case "create-customer-form": return <CreateCustomerForm/> 
      case "create-schedule-form": return <ScheduleModal/> 
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
