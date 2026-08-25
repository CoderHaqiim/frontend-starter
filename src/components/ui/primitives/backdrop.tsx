"use client"

import { ReactNode } from "react"
import Frame from "./frame"
import { useBackdropState } from "@/src/store/backdropState"
import CreateBusinessForm from "../../app/forms/createBusiness"
import CreateTaskForm from "../../app/forms/createTask"
import TaskManagerCard from "../../app/cards/taskManagerCard"

type BackdropProps = {
    children: ReactNode,
}

export default function Backdrop() {
  const {backdropOpen, setBackdropContent, setBackdropOpen, backdropContent} = useBackdropState()

  const selectBackdropContent = ()=> {
    switch(backdropContent){
      case "create-business-form": return <CreateBusinessForm/> 
      case "create-task-form": return <CreateTaskForm/> 
      default: return <CreateBusinessForm/> 
    }
  }

  return (
    <Frame className="w-full h-[100vh] justify-center items-center bg-[#00000040] inset-0 z-3000" 
        specificStyles={{
            display: backdropOpen? "flex" : "none",
            position: "fixed"
        }}>
         {selectBackdropContent()}
    </Frame>
  )
}
