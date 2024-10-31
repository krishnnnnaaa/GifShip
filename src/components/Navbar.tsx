"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center py-3 px-4 justify-between bg-black">
      <div>
        <h1>GIFSHIP</h1>
      </div>
      <div>
        <ul className="flex items-center">
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center mx-4 border-b-4 border-fuchsia-600	hover:bg-fuchsia-600 transition-all">Reactions</li>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center mx-4 border-b-4 border-green-600	hover:bg-green-600 transition-all">Sports</li>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center mx-4 border-b-4 border-sky-600	hover:bg-sky-600 transition-all">Anime</li>
            <li className="pt-2 pb-1 cursor-pointer w-20 text-center mx-4 border-b-4 border-lime-600	hover:bg-lime-600 transition-all">Cats</li>
            <li className="bg-violet-800 px-4 cursor-pointer mx-4 py-2 rounded-none text-white text-base hover:bg-violet-900">
                Login
            </li>
        
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
