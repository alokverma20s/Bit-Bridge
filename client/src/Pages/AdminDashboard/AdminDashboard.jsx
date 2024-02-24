import React, { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useDispatch, useSelector } from 'react-redux';
import InstructorRequests from './InstructorRequests';
import './AdminDashboard.css'
import { addDepartment } from '../../services/operations/departmentAPI';


const AdminDashboard = () => {
    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const [dept, setDept] = useState(null);

    function handleDeptSubmit(){
      dispatch(addDepartment(dept));
    }

  return (
    <div className='home-container-1'>
        <LeftSidebar></LeftSidebar>
        <div className='home-container-2'>
            <div className="main-bar">
                <div className="main-bar-header">
                    <h1>Admin Panel</h1>
                    <h3>Welcome {User?.result.name}</h3>
                </div>
                <div className="admin-dashboard-container">
                <h3>Pending Instructor requests</h3>
                  <InstructorRequests/>
                </div>
                <div>
                  <h3>Add Department</h3>
                  <form action="" onSubmit={handleDeptSubmit}>
                    <label htmlFor="">
                      <p>Enter Department name: </p>
                      <input type="text" name="" id="" onChange={(e)=>{setDept(e.target.value)}}/>
                    </label>
                    <button type='submit'>Add Department</button>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard