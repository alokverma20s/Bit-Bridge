import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addDesc } from '../../services/operations/tagAPI';

const TagCard = ({ tag }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editFlag, setEditFlag] = useState(false);
    const [description, setDescription] = useState(tag.description);
    const [tempDesc, setTempDesc] = useState('');
    const User = useSelector((state) => (state.currentUserReducer))
    function handleClick() {
        setEditFlag(!editFlag);
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addDesc(description, tag?._id, setTempDesc));
        setEditFlag(!editFlag);
    }
    return (
        <div className='tag'>
            <div className='tags-header'>
                <Link key={tag?._id} to={`/Tags/${tag?._id}`} className='subject-link'><h5 className='all-tags'>{tag?.tagName}</h5></Link>
                {
                    User?.result?.role === 'admin' && <span onClick={handleClick} className='add-desc-btn'><MdModeEdit /></span>
                }
            </div>
            {
                editFlag ?
                    <form action="" onSubmit={handleSubmit}>
                        <textarea type="text" rows='3' cols='10' onChange={(e)=>{setDescription(e.target.value)}}/>
                        <button type='submit' className='inner-grad-btn' style={{ padding: "4px 10px", margin: "2px" }}>Add description</button>
                    </form>
                    :
                    <p>{tempDesc === ''? tag?.tagDescription: tempDesc}</p>
            }

        </div>
    )
}

export default TagCard