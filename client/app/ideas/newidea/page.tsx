import React from 'react'
import NewTopic from '@/app/components/NewTopic'
import LeaderBoard from '@/app/components/LeaderBoard'

const page = () => {
  return (
    <div className='flex flex-wrap'>
        <NewTopic />
        <div className='pc:w-[30%] max-pc:w-full max-pc:px-5'>

        <LeaderBoard />
        </div>

      
    </div>
  )
}

export default page
