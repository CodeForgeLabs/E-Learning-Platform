"use client"
import React, { useState } from 'react'
import RelatedTopics from '@/app/components/RelatedTopics'
import Image from 'next/image'
import CardSkeleton from '@/app/components/CardSkeleton'
import Comments from '@/app/components/Comments'
import TextBox from '@/app/components/TextBox'
import { useGetIdeaByIdQuery , useGetReplyByIdQuery , useCreateReplyMutation } from '@/app/features/api/apiSlice'
import { usePathname } from 'next/navigation'





const Page  = () => {
  
  const [answerContent , setAnswerContent] = useState("")
   const pathname = usePathname();
    const id = pathname.split('/').pop() || ''
  const { data: idea, error, isLoading } = useGetIdeaByIdQuery(id);
  const { data: reply, error: replyError, isLoading:replyLoading } = useGetReplyByIdQuery(id);
  const [createReply] = useCreateReplyMutation();

  const handleSubmit = async () => {
    try {
      await createReply({
        body: answerContent,
        id : id,
      }).unwrap();
      setAnswerContent('');
    } catch (err) {
      console.error('Failed to save the idea: ', err);
    }
  };
  if (error || replyError )
    return <p>error</p>
  if (isLoading || replyLoading) 
    return <p>load</p>
  
  return (
    <div className='flex flex-wrap justify-evenly pc:mx-20 pc:px-4   mt-8 mb-8'>



      <div className='pc:w-2/3 max-pc:w-full  flex flex-col tablet:gap-6 max-tablet:gap-10'>


            { isLoading  ? <CardSkeleton /> : <div className='max-tablet:px-4 tablet:px-6 py-4  border rounded-md border-gray-600 border-opacity-40'>


              <div className=' border-b-[1px] border-gray-600 border-opacity-30 mb-2 py-4'>
              <p className='text-2xl   py-2'>{idea?.title}</p>
              <p className='flex text-gray-400 text-sm'>{10  + " days ago"} &#183; {1  + " replies"} &#183; {20 +  " views"}  </p>
              </div>



              <div className='flex max-tablet:flex-col mt-4'>


              <div className=" flex tablet:flex-col max-pc:items-center  max-tablet:w-full tablet:w-12 mb-4">
              <Image        className="mask max-tablet:w-11  tablet:w-12 tablet:h-12 rounded-full"
                          width="48"
                          height="48"
                          src= {idea?.author?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s"}
                          alt="Avatar Tailwind CSS Component" />
                <p className="text-secondary ml-2 tablet:hidden">{idea?.author.username} <span className="text-gray-400">&#183;  Software Engineer</span> </p>
                                  <div className="flex flex-col items-center w-full mt-4 max-tablet:hidden">
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
                  <span className="text-success">{idea?.voteCount}</span>
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

              <div className=' max-tablet:px-2 tablet:px-4 tablet:py-2  tablet:w-[85%]'>
              <p className="text-secondary max-tablet:hidden mb-2">{idea?.author.username} <span className="text-gray-400">&#183;  Software Engineer</span> </p>
              <p className=''>{idea?.body}</p>

                  <div className="flex items-center  flex-wrap my-4 gap-2 ">
                  {idea?.tags && idea.tags.map((tag , index) => (
                        <div key={index} className="flex items-center tag px-2 py-[2px] border rounded-md mr-2 bg-base-200 shadow-sm text-sm font-medium  ">{tag}</div>
                      ))}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tablet:size-5 max-tablet:size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>

                    </div>

                </div>
              </div>
            </div>
            }


            
            {
              <div className='px-4 py-4  border rounded-md border-gray-600 border-opacity-40'>
                <p className='font-bold  my-3 pb-3 '>{reply ? reply.length : 0}replies</p>
                {reply && reply.map((comment) => (
                  <Comments key={comment.id} isQuestion = {false} id={comment.id} username={comment.author.username} profileImage={comment.author.profilePicture} upvotes={comment.voteCount} description={comment.body} createdAt={comment.createdAt}  isAccepted = {false} author={""}/>
                ))}
                </div>
              } 






            <div className='flex flex-col gap-4 py-4 border rounded-md border-gray-600 tablet:px-7 max-tablet:px-3 border-opacity-40'>
              <p className='font-semibold text-xl'>Reply</p>
              <TextBox answerContent={answerContent} setAnswerContent={setAnswerContent}/>
              <button 
              onClick={handleSubmit}
              className=' btn py-2 rounded-xl bg-base-300'>send</button>

              </div> 


          

      </div>

      <RelatedTopics />
    </div>
  )
}

export default Page
