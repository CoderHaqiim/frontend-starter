"use client"

import { useBackdropState } from "@/src/store/backdropState"
import useFirstFieldFocus from "@/src/hooks/firstFieldFocus"
import { ReactNode, isValidElement, useRef } from "react"
import CreateCustomerForm from "../../../app/forms/createCustomer"
import CreateInventoryItemForm from "../../../app/forms/createInventoryItem"
import CreateTaskForm from "../../../app/forms/createTask"
import EditBusinessForm from "../../../app/forms/editBusiness"
import ScheduleModal from "../../../app/forms/scheduleModal"
import Frame from "./frame"

type BackdropProps = {
    children?: ReactNode,
}

export default function Backdrop({children}: BackdropProps) {
  const {backdropOpen, backdropContent} = useBackdropState()
  const backdropRef = useRef<HTMLDivElement | null>(null)

  // The first field of the modal takes the focus as it opens, so the form behind it
  // is ready to be typed into.
  useFirstFieldFocus(backdropRef, backdropOpen)

  const selectBackdropContent = ()=> {
    if (isValidElement(backdropContent)) {
      return backdropContent
    }

    switch(backdropContent){
      case "create-task-form": return <CreateTaskForm/> 
      case "edit-business-form": return <EditBusinessForm/> 
      case "create-inventory-item-form": return <CreateInventoryItemForm/> 
      case "create-customer-form": return <CreateCustomerForm/> 
      case "create-schedule-form": return <ScheduleModal/> 
      default: return null 
    }
  }

  return (
    <Frame ref={backdropRef} className="w-full h-[100vh] justify-center items-center bg-[#00000040] inset-0 z-3000" 
        specificStyles={{
            display: backdropOpen? "flex" : "none",
            position: "fixed",
            top: 0,
            left:0
        }}>
         {children ?? selectBackdropContent()}
    </Frame>
  )
}
