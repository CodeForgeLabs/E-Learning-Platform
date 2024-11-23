import React from 'react'
import RelatedTopics from '@/app/components/RelatedTopics'
import Image from 'next/image'
import CardSkeleton from '@/app/components/CardSkeleton'
import Comments from '@/app/components/Comments'
import TextBox from '@/app/components/TextBox'

interface Comment {
  id: string;
  username: string;
  profileImage: string;
  
  upvotes: number;
  description: string;
  createdAt: string;
} 

interface Idea {
  id : string;
  username: string;
  title: string;
  description: string;
  speciality: string;
  upvotes: number;
  tags: string[];
  profileImage: string;
  comments : Comment[];
  createdAt: string;
}

const page  = () => {
  const loading = false
  const idea: Idea = {
    id: "1",
    speciality: "Software Engineer",
    username: "Natib",
    title: "Why Spring Boot is Better than Node.js?",
    description:
      "Spring Boot is built on the top of the Spring framework and contains all its powerful features. It has become a favorite of developers due to its rapid production-ready environment, enabling developers to focus directly on the logic rather than struggling with configuration and setup.\n\n" +
      "One of the standout features of Spring Boot is its rich ecosystem, which includes built-in support for data integration, security, and cloud deployments. This makes it highly suitable for enterprise-level applications requiring complex functionalities such as ERP systems, CRM, and project management tools. It integrates seamlessly with various database systems and APIs, reducing the overhead of manual configurations.\n\n" +
      "Spring Boot excels in building scalable, microservice-based applications that can handle complex workflows. It provides advanced tools for dependency injection, transaction management, and security, making it particularly strong in scenarios requiring heavy computation or multithreading. For instance, applications that demand extensive server-side logic or computations benefit greatly from its robust threading and scheduling capabilities.\n\n" +
      "While Node.js is lightweight and excels in handling asynchronous tasks and I/O operations, Spring Boot offers a more mature and structured environment for building large-scale, high-performance applications. It supports a vast array of plugins and extensions, and its backward compatibility ensures that legacy applications can be upgraded seamlessly.\n\n" +
      "Another factor is developer productivity. With its pre-configured templates and auto-configuration features, Spring Boot reduces development time significantly. Developers also benefit from its large community support and comprehensive documentation, which streamline troubleshooting and learning.\n\n" +
      "In summary, while Node.js might be a better fit for lightweight, real-time, and I/O-driven applications, Spring Boot shines when it comes to building robust, secure, and scalable enterprise-grade applications with complex requirements.",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
    upvotes: 10,
    createdAt: "10 days ago",
    comments: [{
      id: "10",
      username: "Fish",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
      description: "Great explanation! I've been using Spring Boot for a while now, and I can vouch for its power and flexibility. The ability to seamlessly integrate with various databases and APIs has been a game-changer for me. I've also found the community support to be extremely helpful whenever I've run into issues. Looking forward to more discussions on this topic!",
      upvotes: 5,
      
      createdAt: "1 month",
    } , 
     {
      id: "11",
      username: "Yenus"
      , profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
      description: "I've been using Node.js for most of my projects, but after reading your detailed comparison, I'm intrigued by Spring Boot's capabilities. The built-in support for data integration and security features seem particularly useful for the enterprise applications I work on. I'll definitely give it a try and see how it fits into my workflow. Thanks for sharing your insights!",
      upvotes: 3,
      createdAt: "2 weeks",
     }],
    tags: ["BACKEND", "JAVA", "SPRING BOOT" , "NODEJS"],
  };
  
  return (
    <div className='flex flex-wrap justify-evenly pc:mx-20 pc:px-4   mt-8 mb-8'>



      <div className='pc:w-2/3 max-pc:w-full  flex flex-col tablet:gap-6 max-tablet:gap-10'>


            { loading  ? <CardSkeleton /> : <div className='max-tablet:px-4 tablet:px-6 py-4  border rounded-md border-gray-600 border-opacity-40'>


              <div className=' border-b-[1px] border-gray-600 border-opacity-30 mb-2 py-4'>
              <p className='text-2xl   py-2'>{idea.title}</p>
              <p className='flex text-gray-400 text-sm'>{10  + " days ago"} &#183; {1  + " replies"} &#183; {20 +  " views"}  </p>
              </div>



              <div className='flex max-tablet:flex-col mt-4'>


              <div className=" flex tablet:flex-col max-pc:items-center  max-tablet:w-full tablet:w-12 mb-4">
              <Image        className="mask max-tablet:w-11  tablet:w-12 tablet:h-12 rounded-full"
                          width="48"
                          height="48"
                          src= {idea.profileImage}
                          alt="Avatar Tailwind CSS Component" />
                <p className="text-secondary ml-2 tablet:hidden">{idea.username} <span className="text-gray-400">&#183;  {idea.speciality }</span> </p>
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
                  <span className="text-success">{idea.upvotes}</span>
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
              <p className="text-secondary max-tablet:hidden mb-2">{idea.username} <span className="text-gray-400">&#183;  {idea.speciality }</span> </p>
              <p className=''>{idea.description}</p>

                  <div className="flex items-center  flex-wrap my-4 gap-2 ">
                  {idea.tags.map((tag , index) => (
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
                <p className='font-bold  my-3 pb-3 '>{idea.comments.length} replies</p>
                {idea.comments.map((comment) => (
                  <Comments key={comment.id} id={comment.id} username={comment.username} profileImage={comment.profileImage} upvotes={comment.upvotes} description={comment.description} createdAt={comment.createdAt} />
                ))}
                </div>
              } 






            <div className='flex flex-col gap-4 py-4 border rounded-md border-gray-600 tablet:px-7 max-tablet:px-3 border-opacity-40'>
              <p className='font-semibold text-xl'>Reply</p>
              <TextBox />
              <button className=' btn py-2 rounded-xl bg-base-300'>send</button>

              </div> 


          

      </div>

      <RelatedTopics />
    </div>
  )
}

export default page
