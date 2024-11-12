"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/schema/userSchema";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import logo from '../../logo.png'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userAuthService from "@/appwrite/auth";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // const signupWithGoogle = async () => {
  //   userAuthService.googleLogin();
  //   router.push("/page");
  // };
  // const signupWithSpotify = async () => {
  //   userAuthService.spotifyLogin();
  //   router.push("/page");
  // };

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      setIsSubmitting(true);
      const user = await userAuthService.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (user) {
        toast({
          description: "User has been created successfully",
        });
        router.push("/page");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-[#000811] flex-col pt-12 items-center w-full">
      <div className="m-8 text-center">
      <Image src={logo} className="mx-auto" height={150} width={150} alt="logo"/>
        <span className="text-lg text-fuchsia-600">Let&apos;s get started</span>
      </div>
      <div className="w-[350px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl md:text-base'>Full Name</FormLabel>
                  <FormControl>
                  <Input className='md:h-auto h-12 md:text-base text-xl' placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl md:text-base'>Email</FormLabel>
                  <FormControl>
                  <Input type="email" className='md:h-auto h-12 md:text-base text-xl' placeholder="e.g., example@gmail.com" {...field} />
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
                  <Input type="password" className='md:h-auto h-12 md:text-base text-xl' placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-800 text-white md:text-base text-xl"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="my-5">
        <span>Already have an account? </span>
        {"  "}
        <Link className="underline text-fuchsia-600" href={"/login"}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default page;
