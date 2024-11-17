"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Ideas from '../components/Ideas'

const Page = () => {
  const router = useRouter()
  return (
    <div>
    <div className=' flex flex-col  w-full gap-4 bg-base-300 mt-5 max-tablet:py-5 max-tablet:px-5 tablet:px-10 tablet:py-6'>
        <h1 className='max-tablet:text-3xl tablet:text-6xl'>Got an Idea?</h1>
        <div className=' flex gap-3 max-tablet:flex-col tablet:items-center'>
        <p>share your idea to improve the peer to peer platform </p>
        <button onClick = {() => router.push("/ideas/newidea")} className='btn '>Submit an idea</button>
        </div>
    </div>

      <Ideas />
      
    </div>
  )
}

export default Page
