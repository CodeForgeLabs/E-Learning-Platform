"use client"
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

interface Comment {
  id: string;
  username: string;
  profileImage: string;
  
  upvotes: number;
  description: string;
  createdAt: string;
  isQuestion : boolean;
  author: string;
  isAccepted: boolean;
} 

const Comments:React.FC<Comment>   = ({id , username , profileImage , description , createdAt , upvotes , isQuestion , author , isAccepted}) => {
  const session = useSession()
  
  return (
    

<div className='flex gap-3 max-tablet:flex-col mt-2 pt-4 border-t border-gray-600 border-opacity-20'>


<div className=" flex tablet:flex-col max-pc:items-center  max-tablet:w-full tablet:w-12 mb-4">
<Image        className="mask max-tablet:w-11  tablet:w-12 tablet:h-12 rounded-full"
            width="48"
            height="48"
            src= {profileImage}
            alt="Avatar Tailwind CSS Component" />
            <div className='flex justify-between tablet:hidden w-full'> <p className="text-secondary ml-2 tablet:hidden">{username} </p> <p className='text-gray-400'>{createdAt + " ago"}</p></div>
              
                <div className="flex flex-col items-center w-full mt-4 max-tablet:hidden">
               { 
               isAccepted ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg> : isQuestion && author == session?.data?.username  ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg> : " "
              

                }

            <button className="flex justify-center items-center hover:bg-base-300 w-full h-12 rounded-t-md">
                            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                    />
                    </svg>
                </button>
    <span className="text-success">{upvotes}</span>
              <button className="flex justify-center items-center hover:bg-base-300 w-full h-12 rounded-b-md">
              <svg
                xmlns="http://www.w3.org/
                2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
                </svg>

              </button>
              
                
                </div>
</div>

<div className=' max-tablet:px-2 tablet:pt-3  tablet:w-[90%]'>
  <div className='flex justify-between max-tablet:hidden'><p className="text-secondary max-tablet:hidden mb-1">{username}</p> <p className='text-gray-400'>{createdAt + " ago"}</p></div>

<p className=''>{description}</p>
      
    </div>
</div>

  )
}

export default Comments
