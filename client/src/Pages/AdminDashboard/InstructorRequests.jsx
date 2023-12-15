import React from 'react'
import { useSelector } from 'react-redux';

const InstructorRequests = () => {
    const users = useSelector((state) => state.usersReducer);
  return (
    <div className='instructor-request-container'>
        {
            users.map((user)=>(
                <div className="instructor-card">
                    <div className="card-header">
                        <h4>{user.name}</h4>
                    </div>
                    <div className="card-body">
                        <p>{user.email}</p>
                        <div>
                            <button className='inner-grad-btn req-btn'>Confirm</button>
                            <button className='inner-grad-btn req-btn'>Reject</button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default InstructorRequests