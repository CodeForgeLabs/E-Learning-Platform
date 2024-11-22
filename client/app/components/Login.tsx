"use client"
import React from 'react'
import Typingeffect from './Typingeffect'

const Login = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
 <Typingeffect />
      <p className="py-6">
        
      Log in to collaborate, share knowledge and build your reputation in the student learning community.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="" className="input input-bordered w-auto" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-secondary">Login</button>
        </div>

        <p>Don&#39;t have an account? <span className='text-secondary underline'>Sign up</span></p>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login
