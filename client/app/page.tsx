"use client"
import React , {useEffect} from 'react'
import Loading from './components/Loading'

import LeaderBoard from './components/LeaderBoard'
import QuestionCard from './components/QuestionCard'
import { useRouter } from 'next/navigation'
import ShareQuestions from './components/ShareQuestions'
import { useGetQuestionsQuery } from './features/api/apiSlice'
import { useSession } from 'next-auth/react'



const Homepage = () => {

  const session = useSession()
  const [filter, setFilter] = React.useState('Most recent')
  const [shareQuestion, setShareQuestion] = React.useState(true)
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, router]);


  const { data: Questions, error, isLoading } = useGetQuestionsQuery();
  
  

  if (isLoading) 
    return <Loading />;

  if (error) 
    return <div>Error loading questions</div>;
  
      
  
  return (
    <div className='flex flex-grow'>
      {isLoading ? (

          <Loading />
      
      ) : (
        <div className='flex flex-wrap justify-between pc:mx-[3%] tablet:px-4  max-tablet:px-4 mt-11 mb-8'>
        <div className='flex-col max-pc:w-full pc:w-2/3 '>



            <div className='mb-2'>

            <div className='flex justify-between items-center'>
              <p className='text-3xl'>Questions</p>
              <button onClick = {() => router.push("/ideas/newidea")} className='btn btn-sm '>Ask Question</button>

            </div>
                      <p className='flex items-center text-xs pr-10 mt-2'> <span onClick={() => setShareQuestion(!shareQuestion)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      </span>Engage in threaded, public discussions on technical topics with Peer-to-Peer, your go-to platform for collaborative learning and knowledge sharing.</p>
            < ShareQuestions shareQuestion = {shareQuestion} setShareQuestion = {setShareQuestion} />
            </div>



            <div className='flex items-end justify-between mb-4'>
            <p className=' pc:text-lg max-pc:text-base'>{Questions ? Questions.length : 0} Questions</p>
            <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm  m-1">{filter} <svg
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
                                        d="M19 9l-7 7-7-7"
                                    />
                                    </svg>
 </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li onClick={() => setFilter("Most recent")}><a>Most recent</a></li>
            <li onClick={() => setFilter("Most upvotes")}><a>Most upvotes</a></li>
        </ul>
                </div>
        </div>


        {Questions && Questions.map((question , index) => (
            <QuestionCard
            key={question.id || index} // Use a unique property like `id` if available, otherwise fallback to index
            id={question.id}
            username={question.author.username}
            title={question.title}
            description={question.body}
            speciality='Software Engineer'
            profileImage={question.author.profilePicture}
            upvotes={question.voteCount}
            tags={question.tags}
            reputation={ question.author.reputation}
          />
        ))}


            </div>



        
        <div className='max-pc:w-full pc:w-[32%]'>

        <div className=' border-b border-b-gray-600 border-opacity-40 pb-7'>
                <p>
                    Most popular tags
                </p>

                
                <div className='flex flex-wrap gap-2 mt-4'>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>BACKEND</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>JAVA</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>IDE</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>TOOLS</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>FOOTBALL</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>MESSI</div>
                    <div className='tag px-4 rounded-sm font-medium bg-secondary text-base-300'>SPORTS</div>
                </div>

        </div>

        <LeaderBoard />
        </div>

    </div>
      )}
      
    </div>
  )
}

export default Homepage


