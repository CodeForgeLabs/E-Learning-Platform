"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Question {
    id : string;
    username: string;
    title: string;
    description: string;
    speciality: string;
    upvotes: number;
    tags: string[];
    profileImage: string;
  }
  
  const IdeaCard: React.FC<Question> = ({ username, title, description,speciality ,  upvotes, tags , profileImage , id }) => {
    const router = useRouter();
  return (
    <div onClick = {() => router.push(`idea/${id}`)} className="flex max-tablet:flex-wrap border-t-[1px] border-gray-600 border-opacity-50  py-3 mt-5">
      <div className=" flex max-tablet:items-center  max-tablet:w-full mb-4">
      <Image        className="mask max-tablet:w-11  tablet:w-12 tablet:h-12 rounded-full"
                  width="48"
                  height="48"
                  src= {profileImage}
                  alt="pfp" />
        <p className="text-secondary ml-2 tablet:hidden">{username} <span className="text-gray-400">&#183;  {speciality }</span> </p>
      </div>
      <div className="tablet:px-4 max-tablet:px-1 tablet:w-[85%] max-tablet:w-full">
        <p className="text-secondary mb-4 max-tablet:hidden">{username} <span className="text-gray-400">&#183;  {speciality }</span> </p>
        <p className="font-medium mb-2">{title}</p>
        <p className="font-extralight overflow-hidden text-ellipsis  sm:whitespace-normal  max-tablet:line-clamp-2 tablet:line-clamp-3">{description}</p>
        <div className="flex items-center  flex-wrap mt-4 gap-2 ">
          {tags.map((tag , index) => (
            <div key={index} className="flex items-center tag px-2 py-[2px] rounded-xl mr-2  shadow-sm text-sm font-medium bg-secondary text-base-300">{tag}</div>
          ))}

<button className="flex justify-center items-center  ">
      

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

        <span className="ml-1 font-light">10  <span className="font-thin opacity-50">&#183;  1 month ago</span></span>
        </button>
      </div>

      
        </div>
      <div className="max-tablet:hidden w-10">
        <div className="flex flex-col items-center w-full mt-4 ">
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
    </div>
  )
}

export default IdeaCard
