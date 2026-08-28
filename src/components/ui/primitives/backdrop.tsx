"use client"

import { ReactNode, isValidElement } from "react"
import Frame from "./frame"
import { useBackdropState } from "@/src/store/backdropState"
import CreateBusinessForm from "../../app/forms/createBusiness"
import CreateTaskForm from "../../app/forms/createTask"

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
