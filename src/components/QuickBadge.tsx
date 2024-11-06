import env from '@/environment/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const QuickBadge = () => {
    const [trendingData, setTrendingData] = useState<string[]>()
    const showTrending = async()=> {
        try {
            const trendingGifTerms = await axios.get(`https://api.giphy.com/v1/trending/searches?api_key=${env.giphyKey}`)
            if(trendingGifTerms){
                setTrendingData(trendingGifTerms.data.data)
                setTrendingData(prev => prev?.slice(0,8))
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
    <div className='flex space-x-3 justify-around w-[85%] mx-auto md:overflow-auto overflow-x-scroll'>
        {
            trendingData && trendingData.map((item: any) => (
                <div key={item} className='border-2 cursor-pointer dark:border-gray-800 border-black dark:hover:bg-gray-800 rounded-3xl py-2 px-5'>
        {item}
    </div>
            ))
    }
    </div>
  )
}

export default QuickBadge