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
import Image from 'next/image'
import { space } from '../../design/spacing'
import { fontWeight } from '../../design/typograhy'

export default function SignupPage() {
  return (
    <Frame width="stretch" height="100vh" justify="center" padding="xs" align="center" className="bg-[var(--color-white]">
        <Frame width="stretch" justify='center' align='center' height="stretch" className="overflow-hidden bg-[var(--color-white)]">
            <Frame width="400px" height="stretch" rounded="md" direction='column' className="bg-[var(--color-accent1)]">
            </Frame>
            <Frame justify="center" align="center" width="auto" height="stretch" scroll='hidden' padding='lg' className='flex-1' >
                <Frame width="450px" height="max-content" direction="column" gap="sm">
                    <Frame width="stretch" height="hug" className='mb-[var(--space-xl)]'>
                        <Heading size="xxl" type='h1'>Create new account</Heading>
                    </Frame>
                    <Form variant="plain" url="/auth/signup">
                        <Frame direction='column' width="stretch" height="stretch">
                            <Label text='Username' size='md'/>
                            <Input outline name="username" rounded='sm' variant='default' type='text' size='md' border placeholder='Username'/>
                            <div className='hidden text-[0.6rem] font-[500] text-[red]'>Error message here</div>
                        </Frame>
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
                        <Button propagate role='submit' rounded='xl' variant="fill" size='xl'width="stretch">Create new account</Button>  
                    </Form>
                    <Frame height={30} justify='center' align="center" width="stretch" >
                        <Paragraph size='sm' color="textColor1" className='justify-center text-center z-[5] bg-[var(--color-white)]' specificStyle={{width: "70px"}}>OR</Paragraph>
                        <hr className='w-[70%] border-0 bg-[var(--color-outline)] h-[1px] absolute'/>
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
                    <Frame width="stretch" height="hug" gap="md" className='mt-[var(--space-lg)]'>
                        <Paragraph size='sm'>Already have an account?</Paragraph>
                        <LinkComponent href="/login" variant="inline" underline>
                            <Paragraph size='sm' weight="normal" color="accent1">Log in</Paragraph>
                        </LinkComponent>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    </Frame>
  )
}
