import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
import './UserProfile.css'

const EditProfileForm = ({currentUser, setSwitch}) => {

    const [name, setName] = useState(currentUser?.result.name)
    const [about, setAbout] = useState(currentUser?.result.about)
    const [tags, setTags] = useState(currentUser?.tags)
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(tags===""){
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags: currentUser?.result?.tags}))
        }
        else{
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}))
        }
        setSwitch(false);
    }
  return (
    <div>
        <h1 className='edit-profile-title'>
            Edit your Profile
        </h1>
        <h2 className='edit-profile-title-2'>
            Public information
        </h2>
        <form action="" className="edit-profile-form" onSubmit={handleSubmit}>
            <label htmlFor="name">
                <h3 style={{color:"rgb(105, 116, 198)"}}>Display name</h3>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{color:"black", backgroundColor:"white"}} />
            </label>
            <label htmlFor="about">
                <h3 style={{color:"rgb(105, 116, 198)"}}>About me</h3>
                <textarea rows="10" id="about" value={about} onChange={(e)=>setAbout(e.target.value)} style={{color:"black", backgroundColor:"white"}}></textarea>
            </label>
            <label htmlFor="tags">
                <h3 style={{color:"rgb(105, 116, 198)"}}>Interested tags/topics</h3>
                <p>Add tags separated by 1 space</p>
                <input type="text" name="" id="tags" onChange={(e)=> setTags(e.target.value)} style={{color:"black", backgroundColor:"white"}} />
            </label><br /> 
            <input type="submit" value="Save profile" className='submit-btn' />
            <button className='cancel-btn' onClick={()=>setSwitch(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default EditProfileForm