import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
function Header({ insideDashboard,insideAllStudent }) {
    return (
        <div>
            <nav class="bg-blue-300  w-full z-20 top-0 start-0 ">
                <div class=" flex flex-wrap items-center justify-between  p-4">

                    <div><Link to={'/'}> <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">Student Management</span></Link></div>
                    <div>
                        {
                            insideDashboard && <button className='border p-1 transition  hover:-translate-y-1 hover:scale-110 rounded bg-red-400'>Logout</button>
                        }
                        {
                            insideAllStudent &&
                            <div className='flex gap-7 justify-center items-center flex-wrap'>
                                <div className=''><TextField className='' id="outlined-basic" label="Search by Name" variant="outlined" /></div>
                                <div><Link to={'/dashboard'}><button className='border p-1 transition  hover:-translate-y-1 hover:scale-110 rounded bg-green-400'>Back</button></Link></div>
                                <div><button className=' border p-1 transition  hover:-translate-y-1 hover:scale-110 rounded bg-red-400'>Logout</button></div>
                            </div>
                            
                        }
                    </div>

                </div>
            </nav>

        </div>
    )
}

export default Header