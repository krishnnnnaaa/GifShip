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
    // const signupWithGoogle = async()=> {
    //   const result = await userAuthService.googleLogin()
    //   console.log('result: ', result);
      
    //   await userAuthService.getThisUser()
      
    // }
    // const signupWithSpotify = async()=> {
    //   await userAuthService.spotifyLogin()
    //   router.push('/page')
    // }

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
        <div className='m-8'>
            <h1 className='text-4xl font-semibold'>GifShip</h1>
            <span className='text-lg text-fuchsia-600 my-4'>Welcome again</span>
        </div>
            <div className='w-[350px]'>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g., example@gmail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className='w-full text-white bg-fuchsia-600 hover:bg-fuchsia-800'>
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
            {/* <div className='flex items-center w-full  justify-center space-x-2 my-6'>
            <Separator orientation='horizontal' className='w-24' />
            <span>or continue with</span>
            <Separator orientation='horizontal' className='w-24' />
            </div>
    <div className='w-full flex justify-around'>
      <Button onClick={signupWithGoogle} className='w-40 bg-transparent border-gray-600 border-2 rounded-lg text-white px-5 hover:text-black'><FcGoogle style={{width: '20px', height: '20px'}} /> Google </Button>
      <Button onClick={signupWithSpotify} className='w-40 bg-transparent border-gray-600 border-2 rounded-lg text-white px-5 hover:text-black'><FaSpotify className='text-green-700' style={{width: '20px', height: '20px'}} /> Spotify </Button>
    </div> */}
            </div>
        
    <div className='my-5'>
              <span>Don&apos;t have an account? </span>
              {"  "}
              <Link className='underline text-fuchsia-600' href={'/signup'}>Register</Link>
            </div>
    </div>
    </div>
  )
}

export default page