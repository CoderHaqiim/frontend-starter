"use client"

import Frame from '@/src/components/ui/primitives/frame'
import Form from '@/src/components/ui/composites/form'
import Label from '@/src/components/ui/primitives/label'
import Input from '@/src/components/ui/primitives/input'
import Button from '@/src/components/ui/primitives/button'
import Paragraph from '@/src/components/ui/primitives/paragraph'
import LinkComponent from '@/src/components/ui/primitives/link'
import Heading from '@/src/components/ui/primitives/heading'
import { colors } from '../../design/colors'
import Page from '@/src/components/layout/page'

export default function SignupPage() {
  return (
    <Page 
    direction='row' 
    centered
    scrollable
    specificStyle={{backgroundColor:"var(--background2)"}}>
        <Frame width="400px" height="100vh" direction='column' 
        specificStyles={{
            backgroundColor: colors["accent1"]
            }}
        >

        </Frame>
        <Frame centered width="auto" height="stretch" specificStyles={{flex:"1"}} >
            <Frame width="500px" height="max-content" padding='lg' direction="column" specificStyles={{gap:"8px"}}>
                <Form variant="plain" url="/auth/signup">
                    <Heading size="xxl" type='h1' text="Create new account"/>
                    <Frame direction='column' width="stretch" height="stretch">
                        <Label text='Username' size='md'/>
                        <Input outline name="username" variant='default' type='text' size='xl' border placeholder='Username'/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                    </Frame>
                    <Frame direction='column' width="stretch" height="stretch">
                        <Label text='Email' size='md'/>
                        <Input outline name="email" variant="default" type='text' size="xl" border placeholder="Email"/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                    </Frame>
                    <Frame direction='column' width="stretch" height="stretch">
                        <Label text='Password' size='md'/>
                        <Input outline name="password" variant="password" type='text' size='xl' border placeholder='Confirm Password'/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                    </Frame>
                    <Frame direction='column' width="stretch" height="stretch">
                        <Label text='Confirm Password' size='md'/>
                        <Input name='confirmPassword' variant='password' type='text' size="xl" border placeholder='password' outline/>
                        <div className='hidden text-[0.6rem] font-[500] text-[red]'>
                            Error message here
                        </div>
                    </Frame>
                    <Button  
                        text='Sign up'
                        propagate
                        role='submit'
                        variant="text" 
                        size='xl'
                        specificStyles={{
                            width:"100%"
                        }}/>
                        
                </Form>
                <Paragraph size='sm' specificStyle={{gap:"8px"}}>
                    <span>Already have an account?</span>
                    <LinkComponent href="/login" variant="hug" underline>Login</LinkComponent>
                </Paragraph>
            </Frame>
        </Frame>
    </Page>
  )
}
