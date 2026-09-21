"use client"

import Form from '@/src/components/base/ui/composites/form'
import Button from '@/src/components/base/ui/primitives/button'
import Frame from '@/src/components/base/ui/primitives/frame'
import Heading from '@/src/components/base/ui/primitives/heading'
import Input from '@/src/components/base/ui/primitives/input'
import Label from '@/src/components/base/ui/primitives/label'
import Paragraph from '@/src/components/base/ui/primitives/paragraph'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'



export default function SignupPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const passwordsDoNotMatch = confirmPassword.length > 0 && password !== confirmPassword
    const passwordsMatch = password.length > 0 && password === confirmPassword

  return (
    <Frame className="w-full h-[100vh] justify-center p-[var(--space-xs)] items-center bg-[var(--color-white]">
        <Frame className="w-full justify-center items-center h-full overflow-hidden bg-[var(--color-white)]">
            <Frame className="w-[400px] h-full rounded-[var(--radius-md)] flex-col bg-[var(--color-background1)]">
            </Frame>
            <Frame scroll='hidden' className='w-full justify-center items-center flex-1 h-full p-[var(--space-lg)]' >
                <Frame className="w-[450px] h-[max-content] flex-col gap-[var(--space-sm)]">
                    <Frame className="w-full h-max mb-[var(--space-xl)]">
                        <Heading size="xxl" type='h1'>Create an account</Heading>
                    </Frame>
                    <Form url="/api/post">
                        <input type="hidden" name="action" value="signup" />
                        <Frame className="flex-col w-full h-full">
                            <Label text='Email' size='md'/>
                            <Input outline rounded='sm' name="email" variant="default" type='text' size="md" border placeholder="Email"/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Frame className="flex-col w-full h-full">
                            <Label text='Password' size='md'/>
                                   <Input
                                     outline rounded='sm' name="password" variant="password" type='text' size="md"
                                     border placeholder='Password'
                                     formFunc={(event) => setPassword(event.target.value)}
                                   />
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Frame className="flex-col w-full h-full">
                            <Label text='Confirm Password' size='md'/>
                                   <Input
                                     outline rounded='sm' name="confirm-password" variant="password" type='text' size="md"
                                     border placeholder='Password'
                                     formFunc={(event) => setConfirmPassword(event.target.value)}
                                   />
                                   <div className={`${passwordsDoNotMatch ? 'block' : 'hidden'} text-[0.6rem] font-[500] text-[red]`}>Passwords do not match</div>
                        </Frame>
                           <Button propagate role={passwordsMatch ? 'submit' : 'button'} rounded='xl' variant="fill" size='xl'width="stretch">Sign up</Button>  
                    </Form>
                    <Frame className="justify-center h-[30px] items-center w-full" >
                        <Paragraph size='sm' color="textColor1" className='justify-center text-center z-[5] bg-[var(--color-white)]' specificStyle={{width: "70px"}}>OR</Paragraph>
                        <hr className='w-[70%] border-0 bg-[var(--color-outline1)] h-[1px] absolute'/>
                    </Frame>
                    <Frame>
                         <Button rounded='xl' variant="outline" size='xl'width="stretch">
                            <Image
                              src="svgs/google-logo.svg"
                              alt="google-logo"
                              width={20}
                              height={20}
                            />
                            <Paragraph size='md' weight="medium" color="textColor1">
                                Sign in with Google
                            </Paragraph>
                        </Button>  
                    </Frame>
                    <Frame className="w-full h-max gap-[var(--space-md)] mt-[var(--space-lg)]">
                        <Paragraph size='sm'>Already have an account?</Paragraph>
                        <Link href="/login">
                            <Paragraph size='sm' weight="normal" color="accent">Login</Paragraph>
                        </Link>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    </Frame>
  )
}