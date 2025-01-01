"use client"
import React, { use, useState } from 'react'
import RelatedTopics from '@/app/components/RelatedTopics'
import Image from 'next/image'
import CardSkeleton from '@/app/components/CardSkeleton'
import Comments from '@/app/components/Comments'
import TextBox from '@/app/components/TextBox'
import { usePathname, useRouter } from 'next/navigation'
import { useGetQuestionByIdQuery , useGetAnswerByIdQuery , useCreateAnswerMutation  , useGetCommentsByIdQuery , useCreateCommentMutation, useVoteMutation , useDeleteQuestionMutation , useDeleteCommentMutation} from '@/app/features/api/apiSlice'
import { useSession } from 'next-auth/react'









const Page  = () => {
  const session = useSession()
  const router = useRouter()
  const [answerContent , setAnswerContent] = useState("")
  const [commentContent, setCommentContent] = useState('');
  const pathname = usePathname();
  const id = pathname.split('/').pop() || ''
  const { data: question, error, isLoading } = useGetQuestionByIdQuery(id)
  const  {data: answers , error: answerError , isLoading: answerLoading  } = useGetAnswerByIdQuery(id)
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useGetCommentsByIdQuery(id);
  const [createAnswer] = useCreateAnswerMutation();
  const [createComment] = useCreateCommentMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [deleteComment] = useDeleteCommentMutation();
   const [vote] = useVoteMutation();
        const handleVote = async (e: React.MouseEvent, isUpvote: boolean) => {
          
          try {
            await vote({ category: "questions", id, isUpvote });
          } catch (err) {
            console.error('Failed to vote:', err);
          }
        };

  


  if (error || answerError || commentsError)
    return <p>error</p>
  if (isLoading || answerLoading || commentsLoading)
    return <p>load</p>


  const handleSubmit = async () => {
    try {
      await createAnswer({
        body: answerContent,
        id : id,
      }).unwrap();
      setAnswerContent('');
    } catch (err) {
      console.error('Failed to save the answer: ', err);
    }
  };

  const handleDeletion = async ( ) => {
    try {
      await deleteQuestion(id).unwrap();
    } catch (err) {
      console.error('Failed to delete the question: ', err);
    }
    router.push('/')

  }
  const handleDeletionComment = async (commentId: string) => {
      try {
        await deleteComment(commentId).unwrap();

    } catch (err) {
      console.error('Failed to delete the question: ', err);
    }
    

  }
    

  const handleSubmitComment = async () => {
    try {
      await createComment({
        body: commentContent,
        id:id,
      }).unwrap();
      setCommentContent('');
    } catch (err) {
      console.error('Failed to save the comment: ', err);
    }
  };

  
  
  
  return (
    <div className='flex flex-wrap justify-evenly pc:mx-20 pc:px-4   mt-8 mb-8'>



      <div className='pc:w-2/3 max-pc:w-full  flex flex-col tablet:gap-6 max-tablet:gap-10'>


            { isLoading || !question ? <CardSkeleton /> : <div className='max-tablet:px-4 tablet:px-6 py-4  border rounded-md border-gray-600 border-opacity-40'>


              <div className=' border-b-[1px] border-gray-600 border-opacity-30 mb-2 py-4'>
                <div className='w-full flex justify-between items-center'>

              <p className='text-2xl   py-2'>{question.title}</p>
              {
                session.data && question.author.username === session.data.username ? <svg onClick={handleDeletion} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> : " "
              }
              
                </div>
              <p className='flex text-gray-400 text-sm'>{10  + " days ago"} &#183; {1  + " replies"} &#183; {20 +  " views"}  </p>
              </div>



              <div className='flex max-tablet:flex-col mt-4'>


              <div className=" flex tablet:flex-col max-pc:items-center  max-tablet:w-full tablet:w-12 mb-4">
              <Image        className="mask max-tablet:w-11  tablet:w-12 tablet:h-12 rounded-full"
                          width="48"
                          height="48"
                          src= {question.author.profilePicture}
                          alt="Avatar Tailwind CSS Component" />
                <p className="text-secondary ml-2 tablet:hidden">{question.author.username} <span className="text-gray-400">&#183;  Software Engineer</span> </p>
                                  <div className="flex flex-col items-center w-full mt-4 max-tablet:hidden">
                          <button
                          onClick={(e) => handleVote(e, true)}
                           className="flex justify-center items-center hover:bg-base-300 w-full h-12 rounded-t-md">
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
                  <span className="text-success">{question.voteCount}</span>
                            <button 
                            onClick={(e) => handleVote(e, false)}
                            className="flex justify-center items-center hover:bg-base-300 w-full h-12 rounded-b-md">
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
              <p className="text-secondary max-tablet:hidden mb-2">{question.author.username} <span className="text-gray-400">&#183; Software Engineer</span>  </p>
              <p className=''>{question.body}</p>

                  <div className="flex items-center  flex-wrap my-4 gap-2 ">
                  {question.tags.map((tag , index) => (
                        <div key={index} className="flex items-center tag px-2 py-[2px] border rounded-md mr-2 bg-base-200 shadow-sm text-sm font-medium  ">{tag}</div>
                      ))}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tablet:size-5 max-tablet:size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>

                    </div>

                <div className=' pl-6'>
                    {comments && comments.map((comment) => (
                        <div key={comment.id} className=' flex justify-between border-t-[1px] border-base-300 py-2'>
                            <p className='text-[13px]'>{comment.body} <span className='text-secondary mx-1'>-{" "+ comment.author.username}</span><span className='mx-1 text-gray-600'>{comment.createdAt}</span></p>
                            {
                session.data && comment.author.username === session.data.username ? <svg onClick={() => handleDeletionComment(comment.id)} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#434343"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> : " "
              }
                            
                            
                        </div>
                    ))}

                <div className="flex items-center border-y-[1px]">
                  <input
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                   type=" text-[13px]" placeholder="Add a comment" className="w-full px-2 py-1 outline-none bg-transparent" />
                  <button
                  onClick={handleSubmitComment}
                   className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                  </button>
                </div>
                </div>

                </div>
              </div>
            </div>
            }


            
            {
              <div className='px-4 py-4  border rounded-md border-gray-600 border-opacity-40'>
                <p className='font-bold  my-3 pb-3 '>{answers ? answers.length : 0} Answers</p>
                {answers && answers.map((answer) => (
                  <Comments  isQuestion = {true} key={answer.id} id={answer.id} username={answer.author.username} profileImage={answer.author.profilePicture} upvotes={answer.voteCount} description={answer.body} createdAt={answer.createdAt} isAccepted = {answer.accepted} author={question?.author.username || ""} />
                ))}
                </div>
              } 






            <div className='flex flex-col gap-4 py-4 border rounded-md border-gray-600 tablet:px-7 max-tablet:px-3 border-opacity-40'>
              <p className='font-semibold text-xl'>Answer</p>
              <TextBox  setAnswerContent = {setAnswerContent}  answerContent = {answerContent}/>
              
              <button
            
               onClick={handleSubmit}
              className=' btn py-2 rounded-xl bg-base-300'
              >send</button>

              </div> 


          

      </div>

      <RelatedTopics />
    </div>
  )
}

export default Page



