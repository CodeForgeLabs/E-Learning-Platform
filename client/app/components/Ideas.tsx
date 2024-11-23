import React from 'react'
import IdeaCard from './IdeaCard'


const Ideas = () => {
    const [filter, setFilter] = React.useState('Most recent')
    const Ideas = [{id: "1", username : "Natib", title : "Why sprigboot is better than Nodejs", description : "Spring Boot is built on the top of the spring and contains all the features of spring. And is becoming favourite of developer’s these days because of it’s a rapid production-ready environment which enables the developers to directly focus on the logic instead of struggling with the configuration and set up. Spring Boot is a microservice-based framework and making a production-ready application in it takes very less time. Prerequisite for Spring Boot is the basic knowledge Spring framework. For revising the concepts of spring framework" ,profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",  upvotes : 10, tags : ["BACKEND", "JAVA"]}, {
        id: "2",
        username: "Fish",
        title: "Why VS Code might be more useful than IntelliJ",
        description:
          "VS Code is lightweight and faster to open, making it ideal for interns or beginners who don't need the heavy feature set of IntelliJ. It's highly customizable with extensions, allowing users to tailor it to their specific needs without overwhelming complexity.",
        upvotes: 5,
        profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s",
        tags: ["IDE", "TOOLS"],
      },{
        id: "3",
        username: "Yenus",
        title: "Why Messi has proven that he is the best footballer",
        description:
          "Messi's unparalleled consistency in scoring and playmaking, combined with his ability to perform under pressure, has set him apart. Winning the World Cup, multiple Ballon d'Or awards, and dominating across different leagues solidifies his legacy as the greatest footballer of all time.",
        upvotes: 12,
        profileImage: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
        tags: ["FOOTBALL", "MESSI", "SPORTS"],
      },]
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

        {Ideas.map((idea , index) => (
            <IdeaCard
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
