import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.jsx';
import { getMyResult } from '../../services/operations/resultAPI.js';



const MyResults = () => {
    const dispatch = useDispatch();
    const {userid} = useParams();
    const User = useSelector((state) =>( state.currentUserReducer))
    
    const [quizes, setQuizes] = useState(null)
    const [loading, setLoading] = useState(true);
    function trueRound(value, digits){
        return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
    }
    useEffect(() => {
        dispatch(getMyResult(setLoading, setQuizes, userid));
    }, [])

    // const quizes = useSelector((state) => state.quizReducer?.data?.allQuiz);
    const filteredquizes=quizes?.filter((quiz)=>quiz?.quizId)
    return (
        <div className='home-container-1'>
            <LeftSidebar></LeftSidebar>
            <div className='home-container-2'>

                <div className='main-bar'>
                    <div className="main-bar-header">
                        <h1>Your Results</h1>
                        <h2>{User?.result.name}</h2>
                    </div>
                </div>
                {
                    loading?<div className='loader-position'><Loader/></div>:
                
                <div className="quizes-container">
                    {
                        filteredquizes?.length === 0 ? "Your have not taken any quiz.":
                        filteredquizes?.map((quiz, index) => (
                            <div key={index} className='quiz-name-container'>
                                <div className='quiz-name'>
                                    <div>
                                        <p style={{fontFamily:"Rubik", fontSize:"16px", fontWeight:"600"}}>{quiz?.quizId?.quizName}</p>
                                        <p style={{fontFamily:"Rubik", fontSize:"16px"}}>Average Score: {trueRound(quiz?.quizId?.average, 2)}</p>
                                    </div>
                                    <div>
                                        <p style={{fontFamily:"Roboto", fontSize:"16px"}}>{quiz?.quizId?.type} Quiz </p>
                                        <p style={{fontFamily:"Roboto", fontSize:"16px"}}>Created by {quiz?.quizId?.authorName?.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <p style={{fontFamily:"Roboto", fontSize:"14px"}}>Your Score</p>
                                    <p style={{fontFamily:"Roboto", fontSize:"14px", fontWeight:"600", color:"rgb(105, 116, 198)"}}> {quiz?.marks} / {quiz?.totalMarks}</p>
                                </div>
                                

                            </div>
                        ))

                    }

                </div>
                }
            </div>
        </div>
    )
}

export default MyResults