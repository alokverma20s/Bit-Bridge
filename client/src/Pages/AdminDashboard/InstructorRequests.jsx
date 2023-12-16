import React from 'react'
import { useSelector } from 'react-redux';
import { backend_URL } from '../../api/url';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const InstructorRequests = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(undefined);
    async function fetchPendingRequests(quizId){
        setLoading(true)
        // console.log(`${backend_URL}/subject/getSubjectQuestions/`+subjectId);
        const a = await axios.get(`${backend_URL}/admin/getPendingInstructor`);
        setUsers(a?.data?.data);
        setLoading(false);
        // console.log(a.data.data);
      }
    useEffect(() => {
        fetchPendingRequests();
    }, [])

    async function handleConfirm(_id, index){
        const { data } = await axios.post(`${backend_URL}/admin/acceptInstrut`, {
            _id: _id,
        }
        )
        setUsers(users.filter((user)=>{return user._id!==_id}));
    }

    async function handleReject(_id, index){
        const { data } = await axios.post(`${backend_URL}/admin/rejectInstrut`, {
            _id: _id,
        }
        )
        setUsers(users.filter((user)=>{return user._id!==_id}));
    }
    
  return (
    <div className='instructor-request-container'>
        {
            users?.map((user, index)=>(
                <div className="instructor-card">
                    <div className="card-header">
                        <h4>{user?.name}</h4>
                    </div>
                    <div className="card-body">
                        <p>{user?.email}</p>
                        <div>
                            <button className='inner-grad-btn req-btn' onClick={()=>handleConfirm(user._id, index)}>Confirm</button>
                            <button className='inner-grad-btn req-btn' onClick={()=>handleReject(user._id, index)}>Reject</button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default InstructorRequests