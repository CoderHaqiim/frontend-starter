"use client"

import Frame from '@/src/components/ui/primitives/frame'
import Form from '@/src/components/ui/composites/form'
import Label from '@/src/components/ui/primitives/label'
import Input from '@/src/components/ui/primitives/input'
import Button from '@/src/components/ui/primitives/button'
import Paragraph from '@/src/components/ui/primitives/paragraph'
import LinkComponent from '@/src/components/ui/primitives/navLink'
import Heading from '@/src/components/ui/primitives/heading'
import { colors } from '../../design/colors'
import Image from 'next/image'
import { space } from '../../design/spacing'
import { fontWeight } from '../../design/typograhy'
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
                    <Form url="/auth/login">
                        <Frame className="flex-col w-full h-full">
                            <Label text='Email' size='md'/>
                            <Input outline rounded='sm' name="email" variant="default" type='text' size="md" border placeholder="Email"/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Frame className="flex-col w-full h-full">
                            <Label text='Password' size='md'/>
                            <Input outline rounded='sm' name="password" variant="password" type='text' size='md' border placeholder='Password'/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Button propagate role='submit' rounded='xl' variant="fill" size='xl'width="stretch">Log in</Button>  
                    </Form>
                    <Frame className="justify-center h-[30px] items-center w-full" >
                        <Paragraph size='sm' color="textColor1" className='justify-center text-center z-[5] bg-[var(--color-white)]' specificStyle={{width: "70px"}}>OR</Paragraph>
                        <hr className='w-[70%] border-0 bg-[var(--color-outline1)] h-[1px] absolute'/>
                    </Frame>
                    <Frame>
                         <Button rounded='xl' variant="outline" size='xl'width="stretch" specificStyles={{border:`1px solid ${colors["accent"]}`}}>
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
                        <Paragraph size='sm'>Don't have an account?</Paragraph>
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