import React from 'react'

const Footer = () => {
  return (
    // <footer className='flex flex-col bg-neutral tablet:h-64 w-full  border-t-[0.1px] border-collapse border-white border-opacity-50 px-5'>
    //     <div>

    //   <h3 className='text-2xl'>Peer to Peer Learning Platform</h3>

    //     </div>
    //     <div>

    //     </div>
    //     <div className='flex'>
    //         <p>A project by </p>
    //         <span className='bg-black border-[0.5px] rounded-full w-8 h-8'></span>

    //     </div>
    // </footer>



    <footer className="footer flex flex-col footer-center bg-neutral text-primary-content p-10">
  <aside>
    <h1 className="text-2xl">Peer to Peer</h1>
    
    <p className="font-bold">
      Peer to Peer Learning platform.
      <br />
      Providing a reliable platform for students to learn from each other.
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className='w-full'>
    <div className="flex  justify-between items-center w-full ">


    <div className='flex flex-wrap items-center gap-1'>
                
            <p>A project by </p>
                <span className='w-auto flex items-center'>

             <p className='bg-gray-600 border-[0.5px] rounded-full w-7 h-7 ml-1'></p>
             <a href="https://www.linkedin.com/in/natnael-assefa-/" className='text-gray-500'>@Natnael Biruk</a>
                </span>

                <span className='w-auto flex items-center'>

<p className='bg-gray-600 border-[0.5px] rounded-full w-7 h-7 ml-1'></p>
<a href="https://www.linkedin.com/in/meheret-alemu-wolde/" className='text-gray-500'>@Meheret Alemu</a>
   </span>
   <span className='w-auto flex items-center'>

<p className='bg-gray-600 border-[0.5px] rounded-full w-7 h-7 ml-1'></p>
<a href="https://www.linkedin.com/in/nathan-fisseha-397835302/" className='text-gray-500'>@Nathan Fisseha</a>
   </span>



        </div>
      
     
        <a
  href="https://github.com/CodeForgeLabs/Peer2PeerLearning" // Link to your GitHub profile or repo
  target="_blank"
  rel="noopener noreferrer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="fill-current">
    <path
      d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.1 2 3 1.4 3.7 1 .1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.5 1.3-3.4-.2-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0c2.3-1.6 3.4-1.3 3.4-1.3.7 1.7.3 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.8-5.5 6.1.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 0z">
    </path>
  </svg>
</a>

    </div>
  </nav>
</footer>
  )
}

export default Footer
