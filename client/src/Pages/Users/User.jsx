import React from 'react'
import { Link } from 'react-router-dom'
import './Users.css'
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import Avatar from '../../components/Avatar/Avatar';

const User = ({user}) => {
  return (
        <Link to={`/Users/${user._id}`} className='user-profile-link'>
          {
              user.role === "student" && <h3>{user.name.charAt(0).toUpperCase()}</h3>   
          }{
              user.role === "instructor" && <h3 id='admin-avatar'><FaChalkboardTeacher /></h3>   
          }{
              user.role === "admin" && <h3 id='instructor-avatar'><FaUserTie /></h3>
          }
          <h5>{user.name}</h5>
        </Link>
        
  )
}

export default User