'use client'
import GifCard from '@/components/GifCard'
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import env from '@/environment/config'
import { IGif } from '@giphy/js-types'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const page = () => {
    const [gifData, setGifData] = useState<IGif>()
    const pathname = usePathname()
    const slug = pathname.split('/').pop();  
    const gifId = slug?.split('-').pop()
    const givenHeight = gifData?.images?.original?.height;
    const givenWidth = gifData?.images?.original?.width;
    

    const fetchGidf = async()=> {
        try {
            const giphyies = await axios.get(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${env.giphyKey}`)
            if(giphyies){
                setGifData(giphyies.data.data)
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }
    useEffect(() => {
        fetchGidf()
    }, [])
  return (
    <div>
        <Navbar/>
        <Search/>
        <GifCard authorDescription={gifData?.user?.description as string} src={gifData?.source as string} authorInstagram={gifData?.user?.instagram_url as string} authorName={gifData?.user?.display_name as string} authorWebsite={gifData?.user?.website_url as string} date={gifData?.import_datetime as string} gif={gifData?.images.original.url as string} height={givenHeight && givenHeight < 400 ? '500' : gifData?.images.original.height as unknown as string } isVerified={gifData?.user?.is_verified as boolean} title={gifData?.title as string} width={givenWidth && givenWidth < 400 ? '500' : gifData?.images.original.width as unknown as string} key={gifData?.id} embed={gifData?.embed_url as string} />
    </div>
  )
}

export default page