import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getTagsData } from '../../services/operations/tagAPI';

const TagsList = () => {

    const dispatch = useDispatch();

    const {tagId} = useParams();
    const [tagData, setTagData] = useState(null)
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      dispatch(getTagsData(setLoading, setTagData, tagId));
    }, [])
  const questionList = tagData?.question;

  return (
    <div className='home-container-1'>
    <LeftSidebar></LeftSidebar>
    <div className='home-container-2'>
        <div className='main-bar'>
            <div className='main-bar-header'>
                <h1 style={{textTransform:"uppercase"}}>{tagData?.tagName}</h1>
                {/* <button onClick={checkAuth} className='ask-btn'>Ask Question</button> */}
            </div>
            <p style={{fontFamily:"Roboto", lineHeight:"20px", fontWeight:"500"}}>{tagData?.tagDescription}</p>
            <br />
            <div>
                {
                    loading||questionList === null ?
                    <div className='loader-position'><Loader/></div> :
                        <div>
                            <p style={{fontFamily:"Roboto"}}>{questionList?.length} questions </p>
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