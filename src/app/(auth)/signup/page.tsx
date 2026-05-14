"use client"

import { http } from '@/src/http/client'
import Frame from '@/src/components/mixed/frame'
import Form from '@/src/components/ui/form'
import Label from '@/src/components/ui/label'
import Input from '@/src/components/ui/input'
import Button from '@/src/components/ui/button'
import Paragraph from '@/src/components/ui/paragraph'
import LinkComponent from '@/src/components/ui/link'
import Heading from '@/src/components/ui/heading'
import Toggle from '@/src/components/ui/toggle'

export default function Page() {
  return (
    <Frame variant="page" direction='column' centered padding="xl" specificStyle={{backgroundColor:"var(--background2)"}}>
        <Frame variant='custom' direction="column" specificStyle={{width:"500px", gap:"8px", height:"max-content"}}>
            <Form url="/auth/signup">
                <Heading type='heading1' text="Create new account"/>
                <Frame direction='column' variant="stretch" specificStyle={{gap:"2px"}}>
                    <Label text='Username' size='md'/>
                    <Input outline name="username" variant='default' type='text' size='lg' border placeholder='Username'/>
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                </Frame>
                <label htmlFor="gender">
                    <input type="radio" name="gender" value="male"/>
                    <input type="radio" name="gender" value="female"/>
                </label>
                <Frame direction='column' variant="stretch" specificStyle={{gap:"2px"}}>
                    <Label text='Email' size='md'/>
                    <Input outline name="email" variant="default" type='text' size="lg" border placeholder="Email"/>
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                </Frame>
                <Frame direction='column' variant="stretch" specificStyle={{gap:"2px"}}>
                    <Label text='Password' size='md'/>
                    <Input outline name="password" variant="password" type='text' size='lg' border placeholder='Confirm Password'/>
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                </Frame>
                <Frame 
                    direction='column' 
                    variant="stretch" 
                    specificStyle={{gap:"2px"}}
                >
                    <Label 
                        text='Confirm Password' 
                        size='md'
                    />
                    <Input 
                        name='confirmPassword' 
                        variant='password' 
                        type='text' 
                        size="lg" 
                        border 
                        placeholder='password'
                        outline
                    />
                    <div className='hidden text-[0.6rem] font-[500] text-[red]'>
                        Error message here
                    </div>
                </Frame>
                <Toggle name='agreement'/>
                <Button  
                    propagate
                    role='submit'
                    id="sign-btn" 
                    variant="custom" 
                    specificStyle={{
                        backgroundColor:"var(--accent-color1)", 
                        color:"var(--background1)", 
                        display:"flex", 
                        justifyContent:"center", 
                        height:"45px", 
                        fontSize:"14px", 
                        fontWeight:"600", 
                        borderRadius:"100px", 
                        width:"100%"
                    }}>
                        Signup
                </Button>
            </Form>
            <Paragraph size='md' specificStyle={{padding:"8px 16px", gap:"8px"}}>
                <>Already have an account?</>
                <LinkComponent href="/login" variant="hug" underline>Login</LinkComponent>
            </Paragraph>
        </Frame>
    </Frame>
  )
}