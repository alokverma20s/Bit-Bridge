import React from 'react'
import { Link } from 'react-router-dom'
import './Users.css'
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

const User = ({user}) => {
  return (
        <Link to={`/Users/${user._id}`} className='user-profile-link flex items-center justify-start no-underline bg-[#ffffff36] rounded-[1rem]'>
          {
              user.role === "student" && <h3 className='flex justify-center items-center m-[15px] p-[8px] bg-[#6974C6] text-white text-base font-medium h-8 w-8 rounded-[50%] min-w-[20px]'>{user.name.charAt(0).toUpperCase()}</h3>   
          }{
              user.role === "instructor" && <h3 className='h-8 w-8' id='admin-avatar'><FaChalkboardTeacher /></h3>   
          }{
              user.role === "admin" && <h3 className='h-8 w-8' id='instructor-avatar'><FaUserTie /></h3>
          }
          <h5>{user.name}</h5>
        </Link>
        
  )
}

export default User