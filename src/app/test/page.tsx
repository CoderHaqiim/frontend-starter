"use client"

import Card from '@/src/components/ui/card'
import Frame from '@/src/components/mixed/frame'
import Button from '@/src/components/ui/button'
import Modal from '@/src/components/ui/modal'
import Paragraph from '@/src/components/ui/paragraph'
import Dropdown from '@/src/components/ui/dropdown'
import Tooltip from '@/src/components/ui/tooltip'
import Toast from '@/src/components/ui/toast'
import { space } from '../design/space'

export default function Test() {

  const cars = [
    { value: 'volvo', label: 'Volvo' },
    { value: 'saab', label: 'Saab' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'lexus', label: 'Lexus' },
  ]
  
  return (
    <Frame variant='page' padding='lg' centered>
      <Frame variant="stretch"  
                specificStyle={{
                  position: "fixed", 
                  zIndex:"1000", 
                  height:"max-content",
                  top:"0px", 
                  display:"flex",
                  left:"0px",
                  gap: space["sm"],
                  alignItems:"end",
                  flexDirection:"column",
                  padding: space['lg'],
                  pointerEvents: "none"
                  }}>
                <Toast variant="success" title="not connected" text="there are a lot of errors in the message here"/>
                <Toast variant="error" title="not connected" text="there are a lot of errors in the message here"/>
              </Frame>
      <Card variant='hug'>
          <div className='w-[400px] h-[300px]'>
            <Paragraph size="sm">Hello</Paragraph>
          </div>
      </Card>
      <Dropdown name='cars' options={cars}/>
      <Button size="xl" variant="regular" id="open-btn" text="hello"/>
      <Button variant="regular" size="lg" id="open-btn" text="hello"/>
      <Button variant="regular" size="md" id="open-btn" text="hello"/>
      <Button variant="regular" size="sm" id="open-btn" text="hello"/>
      <Button variant="regular" size="xs" id="open-btn" text="hello"/>
      <Button size="md" variant="textIcon" id="open-btn" text="hello" iconName="icon-eye" iconPosition='right' iconColor='var(--background1)'/>
      <Button size="md" variant="textIcon" id="open-btn" text="hello" iconName="icon-eye" iconPosition='left'/>
      <Modal isOpen={true} onClose={() => {}} title="Hello">
        <div className='w-full h-full flex items-center justify-center'>
          Modal content
        </div>
      </Modal>
      <button className='text-[10px] px-[8px] py-[4px] bg-[orange] rounded-[4px]'>hello</button>
      <Tooltip content="hello there everybody in the family house">
        <span>Hello</span>
      </Tooltip>
    </Frame>
  )
}
