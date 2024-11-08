'use client'
import GifsGrid from '@/components/GifsGrid'
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import env from '@/environment/config'
import { IGif } from '@giphy/js-types'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<[IGif]>()
    const showResult = async(query:string)=> {
        try {
            const giphyies = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${env.giphyKey}&q=${query}&limit=50&offset=0&rating=g&bundle=messaging_non_clips`)
            if(giphyies){
                setResult(giphyies.data.data)
            }
        } catch (error) {
            if(error instanceof Error){
                console.log(error);
            }
        }
    }
    useEffect(() => {
        setQuery(searchParams.get('q') as string)
            showResult(query)
    }, [query, searchParams])
    
    
  return (
    <div>
        <Navbar/>
        <Search value={query}/>
        <div className='w-[85%] mx-auto'>
            <span className='text-2xl'>Search result for {query}</span>
        </div>
        <div className='flex flex-wrap justify-center px-8'>
        {
          !result && <Loader2 className="animate-spin" size={40}/>
        }
            {
                result && result.map((item) => (
                    <GifsGrid gif={item.images.fixed_height_downsampled.url} height={item.images.fixed_height_downsampled.height} width={item.images.fixed_height_downsampled.width} key={item.id}/>
                ))
            }
        </div>
    </div>
  )
}

export default page