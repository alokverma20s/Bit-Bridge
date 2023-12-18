import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './Subject.css';
import Loader from '../../components/Loader/Loader';
import { getQuestionsBySubject } from '../../services/operations/subjectAPI';

const SubjectName = () => {

    const location = useLocation();
    const dispatch = useDispatch()
    const subjectId = location.pathname.split('/')[2];

    const [subjectQuestions, setSubjects] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getQuestionsBySubject(setLoading, setSubjects, subjectId));
    }, [])

    const subjectName = subjectQuestions?.subjectName;
    return (
        <div className='home-container-1'>
            <LeftSidebar></LeftSidebar>
            <div className='home-container-2'>
                <div className='main-bar'>
                    <div className='main-bar-header'>
                        <h1>{subjectName}</h1>
                        {/* <button onClick={checkAuth} className='ask-btn'>Ask Question</button> */}
                    </div>
                    <div>
                        {
                            loading||subjectQuestions?.question === null ?
                            <div className='loader-position'><Loader/></div> :
                                <div>
                                    <p>{subjectQuestions?.question.length} questions </p>
                                    <QuestionList questionList={subjectQuestions?.question}></QuestionList>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectName