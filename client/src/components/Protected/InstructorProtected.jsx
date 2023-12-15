import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InstructorProtected = () => {
    const User = useSelector((state) => state.currentUserReducer);
  return (
    (User?.result.role==='admin' || User?.result.role==='instructor') ? <Outlet /> : <Navigate to="/Auth" />
  )
}

export default InstructorProtected