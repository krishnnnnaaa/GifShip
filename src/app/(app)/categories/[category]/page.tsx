'use client'
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Loader2, Verified } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IGif } from "@giphy/js-types";
import axios from "axios";
import env from "@/environment/config";
import GifsGrid from "@/components/GifsGrid";
import { usePathname } from "next/navigation";

const page = () => {
  const [categoryData, setCategoryData] = useState<[IGif]>()
  const pathname = usePathname()
  const category = pathname.split('/').pop();  

  const showCategoryGifs = async()=> {
      try {
          const giphyies = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${env.giphyKey}&q=${category}&limit=50&offset=0&rating=g&bundle=messaging_non_clips`)
          if(giphyies){
            setCategoryData(giphyies.data.data)
          }
      } catch (error) {
          if(error instanceof Error){
              console.log(error);
          }
      }
  }
  useEffect(() => {
      showCategoryGifs()
  }, [])
  return (
    <>
      <Navbar />
      <Search />
      <div>
        <div className="flex w-[85%] mx-auto my-8 items-center">
          <span className="text-3xl font-semibold">Reaction Gifs</span>
          <HoverCard>
            <HoverCardTrigger>
              <span>
                <Verified className="text-white dark:text-black fill-blue-600 text-3xl" />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">Verified</HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <div className='flex flex-wrap justify-center px-8'>
        {
          !categoryData && <Loader2 className="animate-spin" size={40}/>
        }
            {
                categoryData && categoryData.map((item) => (
                    <GifsGrid gif={item.images.fixed_height_downsampled.url} height={item.images.fixed_height_downsampled.height} width={item.images.fixed_height_downsampled.width} key={item.id}/>
                ))
            }
        </div>
    </>
  );
};

export default page;
