"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import logo from '../app/logo.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import env from "@/environment/config";
import userAuthService from "@/appwrite/auth";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setUserDetails, userStateType } from "@/app/features/userSlice";
import Image from "next/image";

const Navbar = () => {
  const { setTheme } = useTheme();
  const [user, setUser] = useState<userStateType>()
  const [userinitial, setUserInitial] = useState('Anonymous')
  const userState = useAppSelector((state)=> state.user)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    setUser(userState)
     userAuthService.getThisUser()
     .then(res=>{
     if(res){
       dispatch(setUserDetails({name: res.name, createdAt: res.$createdAt, email: res.email, id:res.$id, status: res.status}))
      }
  })
      .catch(err => console.log(err))
    }, [userState])
    useEffect(() => {
    const getInitial = async()=> {
      if(user){
        const initial = await userAuthService.getUserInitial(user.name)
        setUserInitial(initial as string)
      }
    }
    getInitial()
  }, [user])
  

  const logout = ()=> {
    userAuthService.logout()
    dispatch(setUserDetails({
      createdAt: '',
      email: '',
      id:'',
      name: '',
      status: false
    }))
    // setUser({
    //   createdAt: '',
    //   email: '',
    //   id:'',
    //   name: '',
    //   status: false
    // })
  }
  
  
  return (
    <div className="flex items-center py-3 px-4 justify-between dark:text-white text-black dark:bg-[#010B13]">
      <div>
        <Link href={'/page'}>
        <Image src={logo} height={90} width={90} alt="logo"/>
        </Link>
      </div>
      <div>
        <ul className="flex items-center">
              <Link href={`${env.originkey}categories/reactions/`}>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center md:block hidden mx-4 border-b-4 border-fuchsia-600	hover:bg-fuchsia-600 hover:text-white transition-all">
              Reactions
              </li>
              </Link>
              <Link href={`${env.originkey}categories/sports/`}>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center md:block hidden mx-4 border-b-4 border-green-600	hover:bg-green-600
             hover:text-white transition-all">
              Sports
              </li>
               </Link>
               <Link href={`${env.originkey}categories/anime/`}>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center md:block hidden mx-4 border-b-4 border-sky-600	hover:bg-sky-600
             hover:text-white transition-all">
              Anime
              </li>
               </Link>
               <Link href={`${env.originkey}categories/cats/`}>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center md:block hidden mx-4 border-b-4 border-lime-600	hover:bg-lime-600
             hover:text-white transition-all">
              Cat 
              </li>
               </Link>
              {
               user && user.status ?
             <DropdownMenu >
             <DropdownMenuTrigger>
             <Avatar className="mr-4">
               <AvatarImage src={userinitial}/>
               <AvatarFallback>AN</AvatarFallback>
             </Avatar>
             </DropdownMenuTrigger>
             <DropdownMenuContent>
               <DropdownMenuItem>
                <Link href={`/favourites`}>
                Favourite
                </Link>
                </DropdownMenuItem>
               <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
            :
           <Link href={`${env.originkey}login`}>
             <li className="bg-violet-800 px-4 cursor-pointer
            mx-4 py-2 rounded-none text-white text-base hover:bg-violet-900">
            Login
        </li> 
           </Link>
            }
        
            <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            </ul>
          
      </div>
    </div>
  );
};

export default Navbar;
