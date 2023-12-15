import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './Subject.css';
import { backend_URL } from '../../api/url';

const SubjectName = () => {

    const location = useLocation();
    const subjectId = location.pathname.split('/')[2];

    const [subjectQuestions, setSubjects] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchSubjectQuestions(quizId){
        setLoading(true)
        // console.log(`${backend_URL}/subject/getSubjectQuestions/`+subjectId);
        const a = await axios.get(`${backend_URL}/subject/getSubjectQuestions/`+subjectId);
        setSubjects(a?.data?.questions);
        setLoading(false);
      }
    useEffect(() => {
        fetchSubjectQuestions();
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
                                <h1>Loading...</h1> :
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