import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useSelector } from 'react-redux';
import InstructorRequests from './InstructorRequests';
import './AdminDashboard.css'

const AdminDashboard = () => {
    const User = useSelector((state) => state.currentUserReducer);
  return (
    <div className='home-container-1'>
        <LeftSidebar></LeftSidebar>
        <div className='home-container-2'>
            <div className="main-bar">
                <div className="main-bar-header">
                    <h1>Admin Dashboard</h1>
                    <h3>Welcome {User?.result.name}</h3>
                </div>
                <div className="admin-dashboard-container">
                <h3>Pending Instructor requests</h3>
                  <InstructorRequests/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard