'use client'
import env from '@/app/environment/config'
import axios from 'axios'
import React, { useEffect } from 'react'

const Trending = () => {
    const showTrending = async()=> {
        try {
            await axios.post(`https://api.giphy.com/v1/gifs/trending?api_key=${env.giphyKey}&limit=50&offset=0&rating=g&bundle=messaging_non_clips`)
        } catch (error) {
            
        }
    }
    useEffect(() => {
    }, [])
    
  return (
    <div>
        <div>
            <h1>Trending Now</h1>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Trending