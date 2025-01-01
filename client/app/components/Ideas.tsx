import React, { useEffect } from 'react'
import IdeaCard from './IdeaCard'
import { useGetIdeasQuery } from '../features/api/apiSlice'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from './Loading'



const Ideas = () => {
  const session = useSession()
  const router = useRouter()
  
    useEffect(() => {
      if (session.status === 'unauthenticated') {
        router.push('/login');
      }
    }, [session, router]);
    const [filter, setFilter] = React.useState('Most recent')

    const { data: Ideas, error, isLoading } = useGetIdeasQuery();

    if (isLoading) 
      return <Loading />;
  
    if (error) 
      return <div>Error loading questions</div>;

    
  return (
    <div className='flex flex-wrap justify-evenly pc:mx-20 tablet:px-4  max-tablet:px-4 mt-11 mb-8'>
        <div className='flex-col max-pc:w-full pc:w-2/3 '>

            <div className='flex justify-between mb-4'>


            <p className=' pc:text-xl max-pc:text-lg'>690 Ideas</p>
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

        {Ideas && Ideas.map((idea , index) => (
            <IdeaCard
            key={idea.id || index} // Use a unique property like `id` if available, otherwise fallback to index
            id={idea.id}
            username={idea.author.username}
            title={idea.title}
            description={idea.body}
            speciality='Software Engineer'
            profileImage={idea.author.profilePicture}
            upvotes={idea.voteCount}
            tags={idea.tags}
            reputation={ idea.author.reputation}
          />
        ))}


            </div>





        <div className='max-pc:w-full pc:w-1/4'>
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
    </div>
  )
}

export default Ideas
