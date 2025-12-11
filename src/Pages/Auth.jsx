import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { LoginAdminAPI, registerAdminAPI } from '../Connections/allAPI';
function Auth({ insideLogin }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [registerValue, setRegisterValue] = useState({
    email: "",
    password: ""
  })
//register
  const handleRegister = async (e) => {
    e.preventDefault()
    const { email, password } = registerValue
    if (!email || !password) {
      toast.error("Enter email/password")
    } else {
      try {
        const result = await registerAdminAPI(registerValue)
        if (result.status === 201) {
          setTimeout(() => {
            setIsLoading(true)
            toast.success("Register Sucessfully")
            navigate("/login")
            setRegisterValue({
              email: "",
              password: ""
            })
          }, 3000)
        }
        else {
          //console.log(result.response.data.message);

          toast.error(result.response.data.message);
          setTimeout(() => {
            navigate("/login")

          }, 3000)
          setRegisterValue({
            email: "",
            password: ""
          })

        }
      } catch {
        console.log(result.response.data.message)
      }
    }
  }
  //login
  const handleLogin=async(e)=>{
    e.preventDefault()
    const {email,password}=registerValue
    if (!email || !password) {
      toast.error("Enter email/password to Login")
    } else {
      try{
        const loginData=await LoginAdminAPI(registerValue)

        if(loginData.status===200){
          toast.success("Login Sucessfully")
          const token=loginData.data.token
         //console.log(token)
         setIsLoading(true)
          sessionStorage.setItem("token",token)
          setTimeout(()=>{
            
            navigate("/dashboard")
          },3000)
          
          
          
        }else{
          toast.error(loginData.response.data.message)
        }
        
      }catch{

      }
    }
  }




  console.log(registerValue);

  return (
    <div
      className='text-black bg-sky-500 flex justify-center  items-center' style={{ height: '100vh' }}>
      <div className='bg-lime-50 rounded outline-2 outline-offset-2 outline-solid w-100 p-7 flex justify-center items-center flex-col'>
        {
          insideLogin ? <h1>LOGIN INTO YOUR ACCOUNT</h1> : <h1>SIGN INTO YOUR ACCOUNT</h1>
        }
        <form class="max-w-sm mx-auto flex flex-col">
          <div class="mb-5 mt-6 w-75">
            <input type="email" value={registerValue.email} onChange={(e) => setRegisterValue({ ...registerValue, email: e.target.value })} class=" mt-6 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@admin.com" required />

            <input type="password" value={registerValue.password} onChange={(e) => setRegisterValue({ ...registerValue, password: e.target.value })} class=" mt-6 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="*********" required />
          </div>
          {
            insideLogin ? <button onClick={(e) => handleLogin(e)} type="submit" class="text-black p-3 font-bold bg-blue-300 hover:bg-blue-400 ">LOGIN
              {isLoading && <i class="fa-solid fa-spinner fa-spin"></i>}
            </button>

              :
              <button type="button" onClick={(e) => handleRegister(e)} class="text-black p-3 font-bold bg-blue-300  hover:bg-blue-400">SIGN IN</button>
          }
        </form>
        {
          insideLogin ? <p className='mt-3'>New User? <Link to={'/register'}>Sign in</Link></p> : <p className='mt-3'>Already a User? <Link to={'/login'}>Login</Link></p>
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth