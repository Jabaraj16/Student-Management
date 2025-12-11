import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function LandingPage() {
    return (
        <div>
            <Header />
            <div className='flex content-center items-center container' style={{ height: '100vh', width: '100%' }}>
                <div className='grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1   justify-center items-center content-center'>
                    <div class="flex items-center justify-center content-center">
                        <img width={'500px'} src="https://wpschoolpress.com/wp-content/uploads/2023/03/student-management-system.png" alt="" />
                    </div>
                    <div className='p-3 ms-4'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex non, earum repellendus tenetur tempora quae laboriosam qui ad, minima voluptatum fugit. Consequatur in autem nesciunt nostrum omnis officia nemo dolor?
                        </p>
                        <Link to={"/login"}><button type="button" class=" mt-2  text-black p-3 font-bold bg-blue-300">GET START</button></Link>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default LandingPage