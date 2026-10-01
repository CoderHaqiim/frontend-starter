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



export default function LoginPage() {
  return (
    <Frame className="w-full h-[100vh] justify-center p-[var(--space-xs)] items-center bg-[var(--color-white]">
        <Frame className="w-full justify-center items-center h-full overflow-hidden bg-[var(--color-white)]">
            <Frame className="w-[400px] h-full rounded-[var(--radius-md)] flex-col bg-[var(--color-background1)]">
            </Frame>
            <Frame scroll='hidden' className='jusitfy-center w-full justify-center items-center flex-1 h-full p-[var(--space-lg)]' >
                <Frame className="w-[450px] h-[max-content] flex-col gap-[var(--space-sm)]">
                    <Frame className="w-full h-max mb-[var(--space-xl)]">
                        <Heading size="xxl" type='h1'>Log in to your account</Heading>
                    </Frame>
                    <Form url="/api/post" successTitle="Signed in" errorTitle="Login failed">
                        <input type="hidden" name="action" value="login" />
                        <Frame className="flex-col w-full h-full">
                            <Label text='Email' size='md'/>
                            <Input required outline rounded='sm' name="email" variant="default" type='text' size="md" border placeholder="Email"/>
                        </Frame>
                        <Frame className="flex-col w-full h-full">
                            <Label text='Password' size='md'/>
                            <Input required outline rounded='sm' name="password" variant="password" type='text' size='md' border placeholder='Password'/>
                        </Frame>
                        <Button propagate role='submit' rounded='xl' variant="fill" size='xl'width="stretch">Log in</Button>  
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
                        <Paragraph size='sm'>Don&apos;t have an account?</Paragraph>
                        <Link href="/signup">
                            <Paragraph size='sm' weight="normal" color="accent">Signup</Paragraph>
                        </Link>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    </Frame>
  )
}