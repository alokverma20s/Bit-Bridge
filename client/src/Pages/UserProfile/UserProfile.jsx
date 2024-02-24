import React, { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import ProfileBio from './ProfileBio'
import EditProfileForm from './EditProfileForm'
import './UserProfile.css'


const UserProfile = () => {

    const {id}=useParams()
    const users= useSelector((state) => (state.usersReducer));
    const currentProfile = users.filter((user)=>user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [Switch, setSwitch] = useState(false);

  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <section className ="section-container">
            <div className='user-details-container'>
                <div className='user-details'>
                    <Avatar id="avatar" backgroundColor="rgb(105, 116, 198)" color='white' fontSize='40px' px="20px" py="20px">
                        {currentProfile?.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className='user-name'>
                        <h1 style={{fontFamily:"Roboto", fontSize:"24px"}}>{currentProfile?.name}</h1>
                        <p style={{color:"black"}}><FontAwesomeIcon icon={faBirthdayCake}/> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                    </div>
                    
                </div>
            <div>
                    {
                        currentUser?.result._id === id && (
                            <button type='button' onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                                <FontAwesomeIcon icon={faPen}/>Edit Profile
                            </button>
                        )
                    }
                </div>
                
            </div>
            <>
                {
                    Switch?(
                        <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                    ):(
                        <ProfileBio currentProfile={currentProfile}/>
                    )
                    
                }
            </>
        </section>
    </div>
    
    
  )
}

export default UserProfile