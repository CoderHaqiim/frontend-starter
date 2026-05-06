import React from 'react'

export default function SubmitComponent() {
  return (
    <div className='w-[66px] h-[30px] flex bg-[var(--background3)] items-center border-[2px] border-[var(--accent-color1)] px-[2px] rounded-[100px] bg-[var(--accent-color)]'>
        <div className={`h-[23px] w-[33px] flex justify-center items-center rounded-[100px] bg-[var(--accent-color1)]`}>
            <div className='w-[8px] h-[8px] bg-[var(--background1)] rounded-[100%]'></div>
        </div>
    </div>
  )
}
