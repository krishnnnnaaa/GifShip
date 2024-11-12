'use client'
import userAuthService from '@/appwrite/auth'
import { useToast } from '@/hooks/use-toast'
import { signinSchema } from '@/schema/signinSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import logo from "../../logo.png"
import { FaSpotify } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { Separator } from '@/components/ui/separator'
import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  const {toast} = useToast()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = async(data: z.infer<typeof signinSchema>)=> {
      try {
        setIsSubmitting(true)
          const user = await userAuthService.login({ email: data.email, password: data.password})
          if(user){
              toast({
                  description: 'User has been logged-in successfully'
              })
              router.push('/page')
          }
      } catch (error) {
          if(error instanceof Error){
              console.log(error);
              toast({
                  description: 'Somethings went wrong',
                  variant: 'destructive'
              })
              
          }
      }finally{
        setIsSubmitting(false)
      }
  }

  return (
    <div>
        <div className='flex min-h-screen bg-[#000811] flex-col pt-12 items-center w-full'>
        <div className='m-8 text-center'>
        <Image src={logo} className='mx-auto' height={150} width={150} alt="logo"/>
            <span className='text-xl md:text-lg text-fuchsia-600 my-4'>Welcome again</span>
        </div>
            <div className='w-[350px]'>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl md:text-base'>Email</FormLabel>
              <FormControl>
                <Input className='md:h-auto h-12 md:text-base text-xl' type='email' placeholder="e.g., example@gmail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl md:text-base'>Password</FormLabel>
              <FormControl>
              <Input className='md:h-auto h-12 md:text-base text-xl' type='password' placeholder="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} 
        className='w-full text-white bg-fuchsia-600 hover:bg-fuchsia-800 md:text-base text-xl'>
          {
            isSubmitting ? (
              <Loader2Icon className='animate-spin'/>
            ) : (
              'Login'
            )
          }
          </Button>
      </form>
    </Form>
            </div>
        
    <div className='my-5 md:text-sm text-base'>
              <span>Don&apos;t have an account? </span>
              {"  "}
              <Link className='underline text-fuchsia-600' href={'/signup'}>Register</Link>
            </div>
    </div>
    </div>
  )
}

export default page