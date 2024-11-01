import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'


const Search = () => {
  return (
    <div className='w-[85%] mx-auto flex space-x-3 py-8'>
        <Input type="email" className='bg-white text-black font-semibold' placeholder="Search all the gifs" />        
        <Button className='bg-fuchsia-600 text-white hover:bg-fuchsia-700 px-5'><SearchIcon/></Button>
    </div>
  )
}

export default Search