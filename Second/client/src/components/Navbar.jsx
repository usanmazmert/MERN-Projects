import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className='h-[50px] bg-primary flex justify-center'>
        <div className='w-[100%] max-w-[1024px] text-white items-center justify-between flex'>
            <Link to= "/">
              <span className='text-lg font-light'><span className='text-white font-medium'>mert</span>booking</span>
            </Link>
            {user ? user.details.username : (
            <div className='grid gap-2 grid-cols-2'>
                <button className='py-1.5 px-2.5 transition ease-in-out duration-500 hover:bg-gray-600 rounded-full'>Register</button>
                <button className='py-1.5 px-2.5 transition ease-in-out duration-500 hover:bg-gray-600 rounded-full'>Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar