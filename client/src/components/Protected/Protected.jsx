import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = () => {
    const User = useSelector((state) => state.currentUserReducer);
  return (
    User?.result.role==='admin' ? <Outlet /> : <Navigate to="/Auth" />
  )
}

export default Protected