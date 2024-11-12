'use client'
import dataImage from '@/appwrite/image'
import GifsGrid from '@/components/GifsGrid'
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface favouriteGifs {
  $collectionId: string,
  $createdAt: string,
  $databaseId: string,
  $permission: string[],
  $updatedAt: string,
  alt_text: string,
  gifId: string,
  slug: string,
  title: string,
  type: string,
  url: string,
  width: number,
  height: number
}

const page = () => {
    const [favourites, setFavourites] = useState<favouriteGifs[] | undefined>(undefined)
    useEffect(() => {
        const getImages = async()=>{
            const response = await dataImage.getImages()
            console.log(response?.documents)
            setFavourites(response?.documents as favouriteGifs[] | undefined)
        }
        getImages()
    }, [])
    
  return (
    <div>
        <Navbar/>
        <Search/>
        <div className='flex flex-wrap flex-col px-8 w-[85%] mx-auto'>
          <div className='mb-6'>
            <span>My Favourites</span>
          </div>
        {
          !favourites && 
          <div className='w-full mx-auto'>
          <Loader2 className="animate-spin mx-auto" size={40}/>
          </div>
        }
        <div className='flex flex-wrap'>

            {
              favourites && favourites.map((item) => (
                <GifsGrid  slug={item.slug} gif={item.url} key={item.gifId} width={item.width as unknown as number} height={item.height as unknown as number}/>
              ))
            }
            </div>
        </div>
    </div>
  )
}

export default page