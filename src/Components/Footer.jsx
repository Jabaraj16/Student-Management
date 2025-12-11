import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <footer class="bg-neutral-primary-soft rounded-base shadow-xs   bg-blue-300">
                <div class="w-full  mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between sm:content-center">
                        
                          <Link to={'/'}>  <span class="text-heading self-center text-2xl font-semibold whitespace-nowrap">Student-Management</span></Link>

                         <div className='flex flex-col justify-center items-center'>
                        <span className='text-center'>Contact Us</span>
                        <div className='flex gap-2 mt-3'>
                             <input type="email"  class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Your@mail"  />
                            <button type="submit" class="text-white bg-blue-600 bg-brand box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5">Submit</button>
                        </div>
                         </div>
                    </div>
                    <hr class="my-6 border-default sm:mx-auto lg:my-8" />
                    <span class="block text-sm text-body sm:text-center"> &copy; 2025 <a href="https://flowbite.com/" class="hover:underline">Jabaraj</a>. All Rights Reserved.</span>
                </div>
            </footer>


        </div>
    )
}

export default Footer