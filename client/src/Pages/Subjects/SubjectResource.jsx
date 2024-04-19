import React from 'react'
import Loader from '../../components/Loader/Loader.jsx'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar.jsx'
import { useState } from 'react'

const SubjectResource = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
        <div>
      {
        loading ? <div className='loader-position'><Loader /></div> :
          <div className="main-bar">
            <div className="main-bar-header">
              <h1>Subject name resource</h1>
            </div>
            
            <div className="resource-container">
              
            </div>

          </div>
      }
    </div>
        </div>
    </div>
  )
}

export default SubjectResource