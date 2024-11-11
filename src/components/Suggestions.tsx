import env from '@/environment/config'
import { IGif } from '@giphy/js-types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GifsGrid from './GifsGrid'
import { Loader2 } from 'lucide-react'

const Suggestions = ({query}: {query:string}) => {
        const [data, setData] = useState<[IGif]>()
        const showRelated = async()=> {
            try {
                const giphyies = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${env.giphyKey}&q=${query}&limit=50&offset=0&rating=g&bundle=messaging_non_clips`)
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
            showRelated()
        }, [])
  return (
    <div>
        <div className='font-extrabold my-8 w-full mx-auto text-center'><h1 className='text-4xl'>You May Like</h1></div>
        <div className='flex flex-wrap justify-center px-8'>
        {
          !data && <Loader2 className="animate-spin" size={40}/>
        }
            {
                data && data.map((item) => (
                    <GifsGrid slug={item.slug} gif={item.images.fixed_height_downsampled.url} height={item.images.fixed_height_downsampled.height} width={item.images.fixed_height_downsampled.width} key={item.id}/>
                ))
            }
        </div>
    </div>
  )
}

export default Suggestions