'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import QuickBadge from '@/components/QuickBadge'
import Search from '@/components/Search'
import Trending from '@/components/Trending'
import React from 'react'

const page = () => {
  
  return (
    <div>
        <Navbar/>
        <Search/>
        <QuickBadge/>
        <Trending/>
        <Footer/>
    </div>
  )
}

export default page