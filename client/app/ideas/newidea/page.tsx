import React from 'react'
import NewTopic from '@/app/components/NewTopic'
import LeaderBoard from '@/app/components/LeaderBoard'

const page = () => {
  return (
    <div className='flex flex-wrap'>
        <NewTopic />
        <LeaderBoard />

      
    </div>
  )
}

export default page
