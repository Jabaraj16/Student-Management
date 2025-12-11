import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Components/Modal'
function Dashboard() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Header insideDashboard />

            <div class=" h-screen ">
                <div className="grid lg:grid-cols-2 md:grid-cols-2  h-full">
                    <div className='  flex content-center items-center justify-center '>
                        <img src="https://www.vidyalayaschoolsoftware.com/webassets/images/school_software_1.png" alt="" />
                    </div>
                    <div className=' flex content-center items-center justify-center flex-wrap gap-20'>
                       <div onClick={() => setOpen(true)} className='flex flex-col justify-center items-center p-5 border transition hover:translate-y-1 hover:scale-105 shadow-xl'>

                        <img width={'150px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-IX4l0gifWfsMKntrIPOfz4Kag8aNbaPxPw&s" alt="" />
                        <h1 className='mt-3'>Add Student</h1>
                       </div>


                        <Link to={'/all-students'}>
                            <div className='flex flex-col justify-center items-center p-5 border transition hover:translate-y-1 hover:scale-105 shadow-xl'>
                            <img width={'150px'} src="https://media.istockphoto.com/id/1269224972/vector/human-raised-hand-icon-vector-for-your-web-site-design-logo-app-ui-illustration.jpg?s=612x612&w=0&k=20&c=D1dfM-IixLaYHHGhVZ0HUf-UjPiM1lJofWHwKQ7q188=" alt="view all student" />
                            <h1 className='mt-3'>View Student</h1>
    
                           </div>
                        </Link>
                       
                    </div>

                </div>
            </div>
            
            
            <Footer />
            <Modal open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default Dashboard