import React, { useEffect } from 'react';
import IdeaCard from './IdeaCard';
import { useGetIdeasQuery } from '../features/api/apiSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
import { formatDistanceToNow } from 'date-fns';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const Ideas = () => {
  const session = useSession();
  const router = useRouter();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, router]);

  const [filter, setFilter] = React.useState('Most recent');
  const { data: Ideas, error, isLoading } = useGetIdeasQuery();

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading ideas</div>;

  // Sort ideas based on the selected filter
  const sortedIdeas = Ideas
    ? [...Ideas]
        .filter((question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (filter === 'Most recent') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          } else if (filter === 'Most upvotes') {
            return b.voteCount - a.voteCount;
          }
          return 0;
        })
    : [];

  return (
    <div className='flex flex-wrap justify-evenly pc:mx-20 tablet:px-4 max-tablet:px-4 mt-11 mb-8'>
      <div className='flex-col max-pc:w-full pc:w-2/3'>
        <div className='flex justify-between mb-4'>
          <p className='pc:text-xl max-pc:text-lg'>{sortedIdeas.length} Ideas</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm m-1">
              {filter}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li onClick={() => setFilter('Most recent')}>
                <a>Most recent</a>
              </li>
              <li onClick={() => setFilter('Most upvotes')}>
                <a>Most upvotes</a>
              </li>
            </ul>
          </div>
        </div>

        {sortedIdeas.map((idea, index) => (
          <IdeaCard
            key={idea.id || index}
            id={idea.id}
            username={idea.author.username}
            title={idea.title}
            description={idea.body}
            speciality='Software Engineer'
            profileImage={idea.author.profilePicture}
            upvotes={idea.voteCount}
            tags={idea.tags}
            reputation={idea.author.reputation}
            shared_ideas={idea.author.shared_idea}
            questions_asked={idea.author.questions_asked}
            createdAt={formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
          />
        ))}
      </div>

      <div className='max-pc:w-full pc:w-1/4'>
        <p>Most popular tags</p>
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
  );
};

export default Ideas;
