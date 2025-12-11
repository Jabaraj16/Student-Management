
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import Allstudent from './Pages/Allstudent'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
         <Route path='/login' element={<Auth insideLogin/>}/>
        <Route path='/register' element={<Auth />}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/all-students' element={<Allstudent/>}/>
       
      </Routes>
    </>
  )
}

export default App
