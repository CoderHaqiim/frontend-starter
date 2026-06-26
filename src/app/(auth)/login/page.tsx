"use client"

import Frame from '@/src/components/mixed/frame'
import Form from '@/src/components/ui/form'
import Label from '@/src/components/ui/label'
import Input from '@/src/components/ui/input'
import Button from '@/src/components/ui/button'
import Paragraph from '@/src/components/ui/paragraph'
import LinkComponent from '@/src/components/ui/link'
import Heading from '@/src/components/ui/heading'
import { colors } from '../../design/colors'

export default function Page() {
  return (
    <Frame variant="page" direction='row' centered specificStyle={{backgroundColor:"var(--background2)"}}>
        <Frame variant="custom" direction='column' specificStyle={{backgroundColor: colors["accent1"], width:"400px", height:"100vh"}}></Frame>
        <Frame centered variant="custom"specificStyle={{flex:"1"}} >
            <Frame variant='custom' padding='lg' direction="column" specificStyle={{width:"500px", gap:"8px", height:"max-content"}}>
                <Form variant="plain" url="/auth/login">
                    <Heading type='display' text="Login to your account"/>
                    <Frame direction='column' variant="stretch">
                        <Label text='Email' size='md'/>
                        <Input outline name="email" variant='default' type='text' size='lg' border placeholder='Username'/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                    </Frame>
                    <Frame direction='column' variant="stretch">
                        <Label text='Password' size='md'/>
                        <Input outline name="password" variant="default" type='text' size="lg" border placeholder="Email"/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                    </Frame>
                    <Button  
                        text='Login'
                        propagate
                        role='submit'
                        id="login-btn" 
                        variant="regular" 
                        size='xl'
                        specificStyle={{
                            justifyContent:"center", 
                            width:"100%"
                        }}/>
                        
                </Form>
                <Paragraph size='sm' specificStyle={{gap:"8px"}}>
                    <span>Dont have an account?</span>
                    <LinkComponent href="/signup" variant="hug" underline>Signup</LinkComponent>
                </Paragraph>
            </Frame>
        </Frame>
    </Frame>
  )
}
