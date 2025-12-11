import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import StudentCard from '../Components/StudentCard'

function Allstudent() {
  return (
    <div>
        <Header insideAllStudent/>
         <StudentCard/>
        <Footer/>
    </div>
  )
}

export default Allstudent