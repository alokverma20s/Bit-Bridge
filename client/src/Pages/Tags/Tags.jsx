import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagQuestions';
import './Tags.css'
import { Link } from 'react-router-dom';
import { backend_URL } from '../../api/url'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';

const Tags = () => {

    const url = `${backend_URL}/tag/getTags`
    const [tagsList, setTagsList] = useState(null)
    const [loading, setLoading] = useState(true);

    async function fetchTags() {
        setLoading(true)
        const a = await axios.get(url);
        setTagsList(a?.data?.data);
        setLoading(false);
        // console.log(a?.data.data);
    }
    useEffect(() => {
        fetchTags();
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
                                    <Link key={tag?._id} to={`/Tags/${tag?._id}`} className='subject-link tag'>
                                        <div>
                                            <h5 className='all-tags'>{tag?.tagName}</h5>
                                            <p>{tag?.tagDescription}</p>
                                        </div>
                                    </Link>

                                ))
                            }
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Tags