import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addDesc } from '../../services/operations/tagAPI';
import axios from 'axios';

const TagCard = ({ tag }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editFlag, setEditFlag] = useState(false);
    const [description, setDescription] = useState(tag.description);
    const [tempDesc, setTempDesc] = useState('');
    const [wikiDesc, setWikiDesc] = useState('');
    const User = useSelector((state) => (state.currentUserReducer))
    function handleClick() {
        setEditFlag(!editFlag);
        // getWikiDesc();
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addDesc(description, tag?._id, setTempDesc));
        setEditFlag(!editFlag);
    }
    async function getWikiDesc(){
        try{
            const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exlimit=1&titles=${tag?.tagName}&explaintext=1&exsectionformat=plain`
            const a = await axios.get(url);
            const b = a?.query?.pages;
            setWikiDesc([Object.keys(b)[0]].extract);
            console.log(wikiDesc);
        }
        
        catch(e){
            console.log(e);
        }
    }
    
    return (
        <div className='tag'>
            <div className='tags-header'>
                <Link key={tag?._id} to={`/Tags/${tag?._id}`} className='tag-link'><h5 style={{textTransform:"uppercase", padding: "0px", margin:"0px"}}>{tag?.tagName}</h5></Link>
                {
                    User?.result?.role === 'admin' && <span onClick={handleClick} className='add-desc-btn'><MdModeEdit /></span>
                }
            </div>
            <div id='tag-content'>
            {
                editFlag ?
                    <form action="" onSubmit={handleSubmit}>
                        <textarea type="text" rows='3' cols='10' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                        <button type='submit' className='inner-grad-btn' style={{ padding: "4px 10px", margin: "2px" }}>Add description</button>
                    </form>
                    :
                    <p className='mt-[0.3rem]' style={{fontFamily:"Roboto", fontWeight:"400"}}>{tempDesc === ''? tag?.tagDescription: tempDesc}</p>
            }
            </div>
            

        </div>
    )
}

export default TagCard