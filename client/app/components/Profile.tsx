import React from 'react'
import { signOut } from "next-auth/react";
import Image from 'next/image';

type ProfileProps = {
    isNavbar: boolean;
    isCard:boolean;
    reputation:number;
    profileImage:string;
    questions_asked : number;
    shared_ideas: number;
  };
  
  const Profile: React.FC<ProfileProps> = ({ isNavbar , reputation , isCard , profileImage , shared_ideas , questions_asked }) => {
    const level = (reputation: number): [number, number] => {
        if (reputation < 100) {
          return [1, reputation];
        } else if (reputation < 1000) {
          return [2, Math.floor(reputation / 10)];
        } else {
            
          return [3, Math.floor(reputation / 100)];
        }
      };

    
      const current  =  level(reputation)
      



  return (


    <div  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation(); // Prevent click propagation
            }}
        className={`dropdown h-12  ${isCard ? "  dropdown-right" : "dropdown-hover dropdown-bottom dropdown-end"  } `}>
  
  <div tabIndex={0} role="button" className="avatar">
  <div className={` ${current[0] == 3 ? "ring-warning" : current[0] == 2 ? "ring-info" : "ring-success"} ring-offset-base-100 w-10 rounded-full ring-1 ring-offset-1 `}>
    <Image src={profileImage} width={44} height={44} alt= "" />
  </div>

  </div>
  <ul tabIndex={0} className="flex flex-col justify-center  gap-1 dropdown-content menu bg-base-200 rounded-box z-[1] w-auto p-2 shadow">
    
  <div className="stats  pc:w-full max-pc:stats-vertical max-tablet:w-60 shadow">
  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>

    </div>
    <div className="stat-title">Questions Asked</div>
    <div className="stat-value">{questions_asked}</div>
    <div className="stat-desc">Jan 1st - now</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69 69" className="inline-block h-8 w-8 stroke-current">
  <linearGradient id="a" x1="21.577" x2="49.833" y1="-.87" y2="62.424" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#d810fb"></stop>
    <stop offset="1" stopColor="#3953ed"></stop>
  </linearGradient>
  <path fill="url(#a)" d="M49.19 7.559c-4.711-4.227-10.804-6.177-17.157-5.483-10.118 1.1-18.274 9.244-19.395 19.364-.784 7.08 1.755 13.893 6.964 18.692 2.432 2.239 4.142 4.983 5.003 7.982-1.51.511-2.607 1.925-2.607 3.605a3.826 3.826 0 0 0 3.821 3.822H43.18c1.005 0 1.822.817 1.822 1.822a1.824 1.824 0 0 1-1.822 1.822H25.819a1.823 1.823 0 0 1-1.734-2.382 1 1 0 1 0-1.903-.617 3.826 3.826 0 0 0 3.636 4.999h1.707a7.064 7.064 0 0 0 6.973 5.876 7.108 7.108 0 0 0 5.721-2.91 1 1 0 1 0-1.615-1.179 5.035 5.035 0 0 1-4.105 2.089 5.073 5.073 0 0 1-4.939-3.876h13.62a3.827 3.827 0 0 0 3.822-3.822 3.8 3.8 0 0 0-1.267-2.822 3.8 3.8 0 0 0 1.267-2.822 3.827 3.827 0 0 0-3.822-3.822H26.629c-.929-3.485-2.878-6.664-5.672-9.237-4.737-4.363-7.045-10.56-6.331-17.001 1.019-9.195 8.43-16.595 17.623-17.595 5.787-.628 11.321 1.142 15.604 4.984a20.033 20.033 0 0 1 6.648 14.895 20.06 20.06 0 0 1-6.519 14.781 19.364 19.364 0 0 0-3.854 4.842 1 1 0 1 0 1.744.978A17.42 17.42 0 0 1 49.33 40.2a22.056 22.056 0 0 0 7.171-16.257A22.037 22.037 0 0 0 49.19 7.559zm-6.009 42.338c1.005 0 1.822.817 1.822 1.822a1.824 1.824 0 0 1-1.822 1.822H25.819a1.823 1.823 0 0 1-1.821-1.822c0-1.004.817-1.822 1.821-1.822h17.362z"></path>
  <linearGradient id="b" x1="23.734" x2="51.99" y1="-1.833" y2="61.461" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#d810fb"></stop>
    <stop offset="1" stopColor="#3953ed"></stop>
  </linearGradient>
  <path fill="url(#b)" d="M33.881 40.133c-.403 0-.772-.244-.927-.626L26.85 24.365a.999.999 0 0 1 .763-1.36l5.279-.882-1.566-7.607a1 1 0 0 1 .979-1.201h6.778a1 1 0 0 1 .976.783l2.919 13.1a1 1 0 0 1-.741 1.189l-6.135 1.486-1.229 9.392a.999.999 0 0 1-.992.868zm-4.71-15.361 4.214 10.453.823-6.294a1 1 0 0 1 .756-.842l5.848-1.417-2.53-11.359h-4.75l1.528 7.423a.997.997 0 0 1-.814 1.188l-5.075.848z"></path>
</svg>
    </div>
    <div className="stat-title">Shared Ideas</div>
    <div className="stat-value">{shared_ideas}</div>
    
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block h-8 w-8">
  <g>
    <g>
      <path d="M485.034,492.524H26.975c-2.561,0-4.638-2.074-4.638-4.638s2.077-4.638,4.638-4.638h458.059
        c2.561,0,4.638,2.074,4.638,4.638S487.595,492.524,485.034,492.524z"></path>
      <g>
        <path d="M392.486 125.812l17.319 6.252C353.301 158.594 78.441 287.641 74.25 289.612c-2.319 1.092-3.315 3.854-2.224 6.173.788 1.68 2.457 2.663 4.198 2.663.661 0 1.334-.14 1.97-.439 4.191-1.971 279.041-131.014 335.55-157.546l-6.248 17.312c-.87 2.409.378 5.068 2.788 5.938.519.19 1.051.276 1.574.276 1.898 0 3.68-1.173 4.362-3.062l10.052-27.845c.87-2.409-.378-5.068-2.785-5.938l-27.847-10.055c-2.412-.888-5.07.376-5.938 2.785C388.831 122.284 390.079 124.943 392.486 125.812zM87.583 160.001c.695.371 1.437.557 2.18.557.927 0 1.901-.325 2.736-.881 1.391-1.067 2.133-2.783 1.809-4.545L90.18 130.83l17.623-17.206c1.252-1.206 1.717-3.061 1.159-4.73-.51-1.67-1.994-2.922-3.71-3.154l-24.395-3.571L69.913 80.046c-.742-1.577-2.365-2.551-4.128-2.551s-3.385.974-4.174 2.551l-10.899 22.122-24.395 3.571c-1.762.232-3.2 1.484-3.756 3.154-.557 1.67-.093 3.524 1.159 4.73l17.67 17.206-4.174 24.302c-.279 1.716.418 3.478 1.855 4.545 1.437 1.02 3.339 1.159 4.869.325l21.844-11.455L87.583 160.001zM131.874 351.866v122.113H64.255V351.866c0-2.551 2.087-4.638 4.638-4.638h58.343C129.833 347.229 131.874 349.316 131.874 351.866zM138.228 72.811l-4.174 24.302c-.278 1.762.417 3.525 1.855 4.545 1.438 1.02 3.339 1.159 4.87.371l21.844-11.502 21.797 11.502c.696.325 1.438.51 2.18.51.974 0 1.902-.279 2.737-.881 1.392-1.02 2.133-2.783 1.808-4.545l-4.127-24.302 17.624-17.206c1.298-1.206 1.715-3.061 1.206-4.73-.557-1.67-1.995-2.922-3.757-3.154l-24.395-3.571-10.899-22.076c-.788-1.623-2.411-2.597-4.174-2.597-1.762 0-3.385 1.02-4.174 2.597L147.55 44.149l-24.395 3.571c-1.762.232-3.2 1.484-3.757 3.154-.556 1.67-.093 3.525 1.206 4.777L138.228 72.811zM237.198 318.66v155.319h-67.665V318.66c0-2.551 2.087-4.638 4.638-4.638h58.39C235.111 314.022 237.198 316.109 237.198 318.66zM235.111 130.83l-4.174 24.302c-.325 1.716.371 3.478 1.809 4.545.835.557 1.762.881 2.736.881.742 0 1.484-.185 2.18-.557l21.798-11.455 21.797 11.455c1.577.835 3.478.696 4.916-.325 1.437-1.067 2.133-2.783 1.855-4.545l-4.174-24.302 17.623-17.206c1.299-1.206 1.763-3.061 1.206-4.73-.557-1.67-1.994-2.922-3.756-3.154l-24.395-3.571-10.899-22.122c-.789-1.577-2.412-2.551-4.174-2.551s-3.386.974-4.174 2.551l-10.899 22.122-24.395 3.571c-1.762.232-3.2 1.484-3.756 3.154-.511 1.67-.093 3.524 1.206 4.73L235.111 130.83zM342.476 277.337v196.642H274.81V277.337c0-2.551 2.087-4.638 4.638-4.638h58.39C340.389 272.699 342.476 274.786 342.476 277.337zM447.754 225.951v248.029h-67.619V225.951c0-2.551 2.041-4.638 4.638-4.638h58.344C445.667 221.313 447.754 223.4 447.754 225.951z"></path>
      </g>
    </g>
  </g>
</svg>
    </div>
    <div className="stat-title">Reputation</div>
    <div className="stat-value">{reputation}</div>
    <div className="stat-desc">↗︎</div>
  </div>
  
</div>


    <div className='flex   justify-center items-center'>
        <p>
            
        </p>
        {
            current[0] == 3 ? <Image src= './gold1.svg'  alt = 'g' width={50} height={50} /> : current[0] == 2 ? <Image src= './silver.svg'  alt = 's' width={32} height={32} /> : <Image src= './bronze.svg'  alt = 'b' width={50} height={50} />
        }

<div className="flex flex-col items-center w-60 ">
            <div className='flex justify-between px-1 w-full'>
            <span className="mr-2 text-xs">{current[0] == 3 ? "1k" : current[0] == 2 ? 100 : 0}</span>
            <span className="ml-2 text-xs">{current[0] == 3 ? "10k" : current[0] == 2 ? 1000 : 100}</span>

            </div>
            <progress className={` w-[95%]  progress ${current[0] == 3 ? "progress-warning" : current[0] == 2 ? "progress-info" : "progress-success"} progress-primary `} value={current[1]} max="100"></progress>
          </div>
    
    

    </div>
    <div className=''>
    {
            isNavbar ? <button 
            className=' w-full h-12 bg-base-300 text-secondary   rounded-md'
            onClick={() => signOut({ callbackUrl: "/" })}
             >Sign out</button> : ""
        }

    </div>
    
    
  </ul>
</div>
    
  )
}

export default Profile
