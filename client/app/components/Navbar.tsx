"use client"
import React from 'react'
import ThemeController from './ThemeController'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router  = useRouter()
  return (<div className='flex-col   justify-center items-center'>
    <div className="flex justify-between border-b-[1px] border-base-300 navbar bg-base-100 ">
  <div className="navbar-start">

    {/* from burger menu */}
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Questions</a></li>
        <li>
          <a>Get started</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a onClick={() => router.push("/ideas")}>Ideas</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl " onClick={() => router.push("/")}>Peer to Peer</a>
  </div>


  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li onClick={() => router.push("/")}><a>Questions</a></li>
      <li>
        <details>
          <summary>Get started</summary>
          <ul className="p w-40 box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px border-[0.5px] border-base-300">
            <li><a onClick={() => router.push("/requirements")}>Requirement analysis</a></li>
            <li><a>Documentation</a></li>
            <li><a>use case</a></li>
          </ul>
        </details>
      </li>
      <li><a onClick={() => router.push("/ideas")}>Ideas</a></li>
    </ul>
  </div>
  

  <input placeholder='Search......' className='bg-base-200   h-8 pc:w-3/4 tablet:w-[60%] max-tablet:hidden outline-none border rounded-md p-1 '></input>
  

  <div className="navbar-end w-1/4">
    <a className="btn btn-ghost btn-sm " onClick={() => router.push("/login")}>Login</a>
  <ThemeController  />
  </div>



</div>
<div className='px-5 mt-3'>

<input placeholder='Search......' className=' bg-transparent w-full h-10 tablet:hidden   outline-none border rounded-lg  px-2  '></input>

</div>

  </div>
    
  )
}

export default Navbar



