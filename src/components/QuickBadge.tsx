import env from '@/environment/config'
import axios from 'axios'
import { LucideSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const QuickBadge = () => {
    const router = useRouter()
    const [trendingData, setTrendingData] = useState<string[]>()
    const showTrending = async()=> {
        try {
            const trendingGifTerms = await axios.get(`https://api.giphy.com/v1/trending/searches?api_key=${env.giphyKey}`)
            if(trendingGifTerms){
                setTrendingData(trendingGifTerms.data.data)
                setTrendingData(prev => prev?.slice(0,6))
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
    const handleQuickSearch =(item:string)=> {
        router.push(`/search?q=${item}`)
    }
  return (
        <div className='overflow-x-scroll md:overflow-x-auto px-4'>
    <div className='flex space-x-3 justify-around w-max mx-auto'>
        {
            trendingData && trendingData.map((item: string) => (
                <div onClick={()=> handleQuickSearch(item)} key={item} className='border-2 flex items-center cursor-pointer dark:border-gray-800 border-black dark:hover:bg-gray-800 rounded-3xl py-2 px-5'>
                    <LucideSearch size={15} className='mx-2 text-fuchsia-600'/> 
        {item}
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default QuickBadge