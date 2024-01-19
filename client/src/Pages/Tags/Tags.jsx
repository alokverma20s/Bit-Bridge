import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Tags.css'

import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { getTags } from '../../services/operations/tagAPI';
import { IoIosAddCircleOutline } from "react-icons/io";
import TagCard from './TagCard';

const Tags = () => {
    
    const dispatch = useDispatch();
    const [tagsList, setTagsList] = useState(null)
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        dispatch(getTags(setLoading, setTagsList));
    }, [])

    

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <div className="main-bar">
                    <div className='main-bar-header'>
                        <h1 className='tags-h1'>Tags</h1>
                    </div>

                    <p className='tags-p'>A tag is a keyword or label that categorizes your question with other, similar questions. <br></br><br></br>Using the right tags make it easier for others to find and answer your question.</p>
                    {loading ? <div className='loader-position'><Loader /></div> :
                        <div className='tags-list-container'>
                            {
                                tagsList?.map((tag) => (
                                    // <TagsList tag={tag} key={tagsList.id}/>
                                    
                                    <TagCard key={tag?._id} tag={tag}></TagCard>
                                ))
                            }
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Tags