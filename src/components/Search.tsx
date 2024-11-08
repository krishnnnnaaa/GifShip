'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


const Search = ({value=''}) => {
  const router = useRouter()
  const {toast} = useToast()
  const [query, setQuery] = useState('')
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setQuery(e.target.value)
  }

  const handleSubmit = ()=> {
    if(query.length > 0){
      router.push(`/search?q=${query}`)
    }else{
      toast({
        description: 'Please input something'
      })
    }
  }
  
  return (
    <div className='w-[85%] mx-auto flex space-x-3 py-8'>
        <Input onChange={(e)=> handleInput(e)} defaultValue={value} type="email" className='bg-white text-black font-semibold' placeholder="Search all the gifs" />        
        <Button onClick={handleSubmit} className='bg-fuchsia-600 text-white hover:bg-fuchsia-700 px-5'><SearchIcon/></Button>
    </div>
  )
}

export default Search