'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { userSchema } from '@/schema/userSchema'
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
import userAuthService from '@/appwrite/auth'
import { useToast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'

const page = () => {
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const signupWithGoogle = async()=> {
      userAuthService.googleLogin()
      router.push('/page')
      
    }
    const signupWithSpotify = async()=> {
      userAuthService.spotifyLogin()
      router.push('/page')
    }

    const onSubmit = async(data: z.infer<typeof userSchema>)=> {
        try {
            const user = await userAuthService.createUser({name: data.name, email: data.email, password: data.password})
            if(user){
                toast({
                    description: 'User has been created successfully'
                })
                router.push('/page')
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
                toast({
                    description: 'User has been created successfully',
                    variant: 'destructive'
                })
                
            }
        }
    }
  return (
    <div className='flex min-h-screen bg-[#000811] flex-col pt-12 items-center w-full'>
        <div className='m-8'>
            <h1 className='text-4xl font-semibold'>GifShip</h1>
            <span className='text-lg text-gray-600'>Let&apos;s get started</span>
        </div>
            <div className='w-[350px]'>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g., sample@gmail.com" {...field} />
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
        <Button type="submit" className='w-full'>Create Account</Button>
      </form>
    </Form>
            <div className='flex items-center w-full  justify-center space-x-2 my-6'>
            <Separator orientation='horizontal' className='w-24' />
            <span>or register with</span>
            <Separator orientation='horizontal' className='w-24' />
            </div>
    <div className='w-full flex justify-around'>
      <Button onClick={signupWithGoogle} className='w-40 bg-transparent border-gray-600 border-2 rounded-lg text-white px-5 hover:text-black'><FcGoogle style={{width: '20px', height: '20px'}} /> Google </Button>
      <Button onClick={signupWithSpotify} className='w-40 bg-transparent border-gray-600 border-2 rounded-lg text-white px-5 hover:text-black'><FaSpotify className='text-green-700' style={{width: '20px', height: '20px'}} /> Spotify </Button>
    </div>
            </div>
        
    </div>
  )
}

export default page