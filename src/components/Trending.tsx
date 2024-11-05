'use client'
import env from '@/environment/config'
import { IGif } from '@giphy/js-types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Trending = () => {
    const [data, setData] = useState<[IGif]>()
    const showTrending = async()=> {
        try {
            const giphyies = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${env.giphyKey}&limit=50&offset=0&rating=g&bundle=messaging_non_clips`)
            if(giphyies){
                setData(giphyies.data.data)
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }
    useEffect(() => {
        showTrending()
    }, [])
    
  return (
    <div>
        <div className='w-[85%] mx-auto my-8'>
            <h1 className='text-5xl font-semibold'>Trending Now</h1>
        </div>
        <div className='flex flex-wrap justify-center px-8'>
            {
                data && data.map((item) => (
                    <div key={item.id}>
                    <img className='m-2 rounded-lg' width={item.images.fixed_height_downsampled.width} height={item.images.fixed_height_downsampled.height} src={item.images.fixed_height_downsampled.url}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Trending