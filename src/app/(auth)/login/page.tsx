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
    <Frame width="stretch" height="100vh" justify="center" padding="xs" align="center" className="bg-[var(--color-white]">
        <Frame width="stretch" justify='center' align='center' height="stretch" className="overflow-hidden bg-[var(--color-white)]">
            <Frame width="400px" height="stretch" rounded="md" direction='column' className="bg-[var(--color-background1)]">
            </Frame>
            <Frame justify="center" align="center" width="auto" height="stretch" scroll='hidden' padding='lg' className='flex-1' >
                <Frame width="450px" height="max-content" direction="column" gap="sm">
                    <Frame width="stretch" height="hug" className='mb-[var(--space-xl)]'>
                        <Heading size="xxl" type='h1'>Log in to your account</Heading>
                    </Frame>
                    <Form variant="plain" url="/auth/login">
                        <Frame direction='column' width="stretch" height="stretch">
                            <Label text='Email' size='md'/>
                            <Input outline rounded='sm' name="email" variant="default" type='text' size="md" border placeholder="Email"/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Frame direction='column' width="stretch" height="stretch">
                            <Label text='Password' size='md'/>
                            <Input outline rounded='sm' name="password" variant="password" type='text' size='md' border placeholder='Password'/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
                        <Button propagate role='submit' rounded='xl' variant="fill" size='xl'width="stretch">Log in</Button>  
                    </Form>
                    <Frame height={30} justify='center' align="center" width="stretch" >
                        <Paragraph size='sm' color="textColor1" className='justify-center text-center z-[5] bg-[var(--color-white)]' specificStyle={{width: "70px"}}>OR</Paragraph>
                        <hr className='w-[70%] border-0 bg-[var(--color-outline)] h-[1px] absolute'/>
                    </Frame>
                    <Frame>
                         <Button rounded='xl' variant="outline" size='xl'width="stretch" specificStyles={{border:`1px solid ${colors["accent1"]}`}}>
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
                    <Frame width="stretch" height="hug" gap="md" className='mt-[var(--space-lg)]'>
                        <Paragraph size='sm'>Don't have an account?</Paragraph>
                        <Link href="/signup">
                            <Paragraph size='sm' weight="normal" color="accent1">Sign up</Paragraph>
                        </Link>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    </Frame>
  )
}
