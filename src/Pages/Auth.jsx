import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Auth({insideLogin}) {
  const navigate=useNavigate()
  const handleLogin=()=>{
    navigate('/dashboard')
  }
  return (
    <div
      className='text-black bg-sky-500 flex justify-center  items-center' style={{ height: '100vh' }}>
      <div className='bg-lime-50 rounded outline-2 outline-offset-2 outline-solid w-100 p-7 flex justify-center items-center flex-col'>
        {
          insideLogin?<h1>LOGIN INTO YOUR ACCOUNT</h1>:<h1>SIGN INTO YOUR ACCOUNT</h1>
        }
        <form class="max-w-sm mx-auto flex flex-col">
        <div class="mb-5 mt-6 w-75">
          <input type="email" id="email" class=" mt-6 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@admin.com" required />

          <input type="password" id="email" class=" mt-6 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="*********" required />
        </div>
        {
          insideLogin?<button type="submit" onClick={handleLogin} class="text-black p-3 font-bold bg-blue-300 hover:bg-blue-400 ">LOGIN </button>:
          <button type="button" class="text-black p-3 font-bold bg-blue-300  hover:bg-blue-400">SIGN IN</button>
        }
       </form>
       {
        insideLogin?<p className='mt-3'>New User? <Link to={'/register'}>Sign in</Link></p>:<p className='mt-3'>Already a User? <Link to={'/login'}>Login</Link></p>
       }
      </div>
    </div>
  )
}

export default Auth