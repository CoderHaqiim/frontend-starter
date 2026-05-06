import React from 'react'
import Frame from '@/src/components/mixed/frame'
import Form from '@/src/components/ui/form'
import Label from '@/src/components/ui/label'
import Input from '@/src/components/ui/input'
import Button from '@/src/components/ui/button'
import Paragraph from '@/src/components/ui/paragraph'
import Heading from '@/src/components/ui/heading'
import LinkComponent from '@/src/components/ui/link'

export default function page() {
  return (
    <Frame variant="custom" direction='column' centered padding="lg" specificStyle={{backgroundColor:"var(--background2)", alignItems:"center", minHeight:"100vh", height:"max-content"}}>
        <Frame variant='custom' direction="column" specificStyle={{width: "600px", gap:"8px", height:"max-content"}}>
            <Form>
                <Heading type='heading1' text="Log-in to your account"/>
                <Frame direction='column' variant="stretch" specificStyle={{gap:"2px"}}>
                    <Label text='Username' size='md'/>
                    <Input type='text' size="lg" border placeholder='username'/>
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                </Frame>
                <Frame direction='column' variant="stretch" specificStyle={{gap:"2px"}}>
                    <Label text='Password' size='md'/>
                    <Input type='text' size='lg' border placeholder='password'/>
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                </Frame>
                <Button id="login-btn" variant="custom" specificStyle={{backgroundColor:"var(--accent-color1)", color:"var(--background1)", display:"flex", justifyContent:"center", height:"45px", borderRadius:"100px", width:"100%"}}>Login</Button>
                <Paragraph size='sm' specificStyle={{gap:"4px"}}>
                    Forgot your password? 
                    <LinkComponent underline variant='hug' href=''>
                        Reset password
                    </LinkComponent>
                </Paragraph>
            </Form>
            <Paragraph size='md' specificStyle={{padding:"8px 16px", gap:"8px"}}>
                <>Don&apos;t have an account?</>
                <LinkComponent href="/signup" variant="hug" underline>Signup</LinkComponent>
            </Paragraph>
        </Frame>
    </Frame>
  )
}
