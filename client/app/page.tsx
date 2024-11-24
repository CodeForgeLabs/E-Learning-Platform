"use client"
import React , {useEffect} from 'react'
import Loading from './components/Loading'
import { useDispatch , useSelector } from 'react-redux'
import {setInitialLoading} from './features/loading/loadingSlice'
import { RootState } from './store'
import LeaderBoard from './components/LeaderBoard'
import QuestionCard from './components/QuestionCard'
import { useRouter } from 'next/navigation'
import ShareQuestions from './components/ShareQuestions'


const Homepage = () => {
  const [filter, setFilter] = React.useState('Most recent')
  const [shareQuestion, setShareQuestion] = React.useState(true)
  const router = useRouter()

    const Questions = [
        {
          id: "1",
          username: "JohnDoe",
          upvotes: 12,
          title: "How can I optimize database queries for high-traffic websites?",
          description:
            "I am working on a web application that handles a lot of user data and faces frequent database interactions. What are the best practices for optimizing queries and improving database performance?",
          profileImage: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
          tags: ["DATABASE", "PERFORMANCE", "OPTIMIZATION" , "MONGO" , "SQL"],
        },
        {
          id: "2",
          username: "CodeMaster",
          upvotes: 8,
          title: "What are the best practices for managing large state in Redux?",
          description:
            "I have a React app with a complex state management requirement. How can I efficiently manage a large state in Redux without compromising performance?",
          profileImage: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
          tags: ["REACT", "REDUX", "STATE-MANAGEMENT"],
        },
        {
          id: "3",
          username: "JaneTech",
            upvotes: 5,
          title: "How do microservices handle cross-service communication securely?",
          description:
            "I am designing a system based on microservices architecture and want to know the best way to handle secure communication between services. Should I use OAuth2, JWT, or some other method?",
          profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
          tags: ["MICROSERVICES", "SECURITY", "API"],
        },
        {
          id: "4",
          username: "DevGuru",
            upvotes: 3,
          title: "What is the best way to deploy a Next.js app with server-side rendering?",
          description:
            "I am building a Next.js app and plan to use server-side rendering. What are the recommended deployment strategies and hosting options for a production environment?",
          profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
          tags: ["NEXTJS", "DEPLOYMENT", "SSR"],
        },
        {
          id: "5",
          username: "SoccerFan99",
            upvotes: 10,
          title: "What strategies do professional football teams use to handle penalty shootouts?",
          description:
            "I’ve always been curious about the mental and tactical preparation teams go through during penalty shootouts. What factors determine the success rate in such high-pressure scenarios?",
          profileImage: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
          tags: ["FOOTBALL", "STRATEGY", "SPORTS"],
        },
      ];
      
  

  const initialLoading = useSelector((state : RootState) => state.loading.initialLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (initialLoading ) {
      setTimeout(() => {
        dispatch(setInitialLoading())
      }, 2000)
      
    }
    
  })
  return (
    <div className='flex flex-grow'>
      {initialLoading ? (

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
            <p className=' pc:text-lg max-pc:text-base'>{Questions.length} Questions</p>
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


        {Questions.map((idea , index) => (
            <QuestionCard
            key={idea.id || index} // Use a unique property like `id` if available, otherwise fallback to index
            id={idea.id}
            username={idea.username}
            title={idea.title}
            description={idea.description}
            speciality='Software Engineer'
            profileImage={idea.profileImage}
            upvotes={idea.upvotes}
            tags={idea.tags}
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
