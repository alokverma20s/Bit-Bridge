import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import Loader from '../../components/Loader/Loader';
import { acceptInstrut, getPendingInstructor, rejectInstrut } from '../../services/operations/adminAPI';

const InstructorRequests = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(undefined);

    useEffect(() => {
        dispatch(getPendingInstructor(setLoading, setUsers));
    }, [])

    async function handleConfirm(_id, index){
        dispatch(acceptInstrut(_id));
        setUsers(users.filter((user)=>{return user._id!==_id}));
    }

    async function handleReject(_id, index){
        dispatch(rejectInstrut(_id));
        setUsers(users.filter((user)=>{return user._id!==_id}));
    }
    
  return (
    <>
    {
        loading?<div className='loader-position'><Loader/></div>:
        <div className='instructor-request-container'>
            {
                users?.length===0?<p>No pending requests</p>:
                users?.map((user, index)=>(
                    <div key={index} className="instructor-card">
                        <div className="card-header">
                            <h4>{user?.name}</h4>
                        </div>
                        <div className="card-body">
                            <p>{user?.email}</p>
                            <p>Requested {moment(user?.joinedOn).fromNow()}</p>
                            <div className='req-btn-container'>
                                <button className='req-btn' onClick={()=>handleConfirm(user._id, index)}>Confirm</button>
                                <button className='req-btn' onClick={()=>handleReject(user._id, index)}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    }
    </>
  )
}

export default InstructorRequests