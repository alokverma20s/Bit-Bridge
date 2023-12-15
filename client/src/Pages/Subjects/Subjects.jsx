import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import SubjectsList from './SubjectsList'
import './Subject.css';

const Subjects = () => {
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className='home-container-2'>
            <SubjectsList />
        </div>
    </div>
  )
}

export default Subjects