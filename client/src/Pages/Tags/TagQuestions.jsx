import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { backend_URL } from '../../api/url'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const TagsList = () => {

    const {tagId} = useParams();
    const url=`${backend_URL}/tag/getTagsQues/${tagId}`
    const [tagData, setTagData] = useState(null)
    const [loading, setLoading] = useState(true);
    
    async function fetchTags(){
      setLoading(true)
      const a = await axios.get(url);
      setTagData(a?.data?.data);
      setLoading(false);
    }
    useEffect(() => {
      fetchTags();
    }, [])
  const questionList = tagData?.question;

  return (
    <div className='home-container-1'>
    <LeftSidebar></LeftSidebar>
    <div className='home-container-2'>
        <div className='main-bar'>
            <div className='main-bar-header'>
                <h1>{tagData?.tagName}</h1>
                {/* <button onClick={checkAuth} className='ask-btn'>Ask Question</button> */}
            </div>
            <p>{tagData?.tagDescription}</p>
            <br />
            <div>
                {
                    questionList === null ?
                        <h1>Loading...</h1> :
                        <div>
                            <p>{questionList?.length} questions </p>
                            <QuestionList questionList={questionList}></QuestionList>
                        </div>
                }
            </div>
        </div>
    </div>
</div>
  )
}

export default TagsList