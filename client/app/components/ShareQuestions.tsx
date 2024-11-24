import React from 'react';

const ShareQuestions: React.FC<{ shareQuestion: boolean  , setShareQuestion : (shareQuestion: boolean) => void}> = ({ shareQuestion , setShareQuestion }) => {
  return (
    <div className={` transition-all duration-1000 ease-in-out transform ${shareQuestion ?  "" : "hidden"} flex gap-1 flex-col border border-gray-600 border-opacity-50 rounded-lg p-4 my-4`}>
      <p className=' flex justify-between text-xl font-bold'>NEW! Ask and Explore Together <button  onClick = {() => setShareQuestion(!shareQuestion)} className=" btn-sm  btn-square">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button></p>
      <p className='text-sm'>Welcome to Peer to Peer, a space for public, threaded conversations where you can ask questions, explore ideas and dive deeper into technical topics with the community.</p>
      <div className="relative flex flex-col items-start pc:ml-7 tablet:ml-5 max-tablet:ml-3 mt-2">
        {/* Vertical line */}
        <div className="absolute h-full border-l-2 border-gray-300 left-6"></div>
        
        {/* First point */}
        <div className="flex relative z-10  rounded-full ml-[1px] ">
            <span className='h-12 bg-base-100'>
            <svg  className = "stroke-secondary" xmlns="http://www.w3.org/2000/svg" width="43" height="43" fill="none" viewBox="0 0 430 430">
            <mask id="nNHWqmfORPa" width="305" height="245" x="95" y="175" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
              <path fill="#fff" d="M95 220h51.667L180 255l33.333-35H285c11.046 0 20-8.954 20-20v-25h95v245H95z" />
            </mask>
            <g mask="url(#nNHWqmfORPa)">
              <path stroke="#4030e8" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" d="M145 195c-11.046 0-20 8.954-20 20v130c0 11.046 8.954 20 20 20h71.667L250 400l33.333-35H355c11.046 0 20-8.954 20-20V215c0-11.046-8.954-20-20-20z" />
            </g>
            <path stroke="#4030e8" strokeLinecap="round" strokeWidth="6" d="M186 325h65m-65-35h130m-130-35h130" />
            <path stroke="#121331" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" d="M75 50c-11.046 0-20 8.954-20 20v130c0 11.046 8.954 20 20 20h71.667L180 255l33.333-35H285c11.046 0 20-8.954 20-20V70c0-11.046-8.954-20-20-20z" />
            <path stroke="#4030e8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="m180 85 14.695 29.775 32.858 4.774-23.777 23.176 5.613 32.726L180 160l-29.389 15.451 5.613-32.726-23.777-23.176 32.858-4.774z" />
          </svg>

            </span>
          
          <div className='pl-4'>
            <p className='font-medium'>Ideas and Questions on Peer to Peer</p>
            <p className='text-sm'>Our beta release now lets you start or join discussions using any topic tag.</p>
            <p className='text-sm'>Learn more about Conversations</p>
          </div>
        </div>
        
        {/* Second point */}
        <div className="flex items-center relative z-10 rounded-full mt-4 ml-[1px]" >
        <span className=' flex justify-end h-9  ml-1 z-10 bg-base-100'>
        <svg className='fill-secondary stroke-1' xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="M393.33-200q-95.66 0-164.5-63.67Q160-327.33 160-421.33T228.83-579q68.84-63.67 164.5-63.67h280L562.67-753.33 609.33-800 800-609.33 609.33-418.67l-46.66-46.66L673.33-576H392.67q-67.67 0-116.84 44.33-49.16 44.34-49.16 110.34T275.83-311q49.17 44.33 116.84 44.33H694V-200H393.33Z"/></svg>
          </span>
          <div className='pl-4'>
            <p className='font-medium'>{"What's next"}</p>
            <p className='text-sm'>This is just the beginning! We’re committed to making it even easier for everyone to collaborate, exchange valuable insights, and grow together.</p>
            <p className='text-sm underline text-secondary'>About us</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareQuestions;