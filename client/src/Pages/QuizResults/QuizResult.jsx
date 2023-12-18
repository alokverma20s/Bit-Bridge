import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { quizzes } from '../../services/operations/resultAPI';

const QuizResult = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const userid = location.pathname.split('/')[2];
    const User = useSelector((state) =>( state.currentUserReducer))
    
    const [quizes, setQuizes] = useState(null)
    const [loading, setLoading] = useState(true);

    function trueRound(value, digits){
        return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
    }
    
    useEffect(() => {
        dispatch(quizzes(setLoading, setQuizes, userid));
    }, [])

    const navigate= useNavigate();

    return (
        <div className='home-container-1'>
            <LeftSidebar></LeftSidebar>
            <div className='home-container-2'>

                {
                    <div className='main-bar'>
                        <div className="main-bar-header">
                            <h1>Quizes set by </h1>
                            <h2>{User?.result.name}</h2>
                        </div>

                    </div>
                }
                {
                    loading?<div className='loader-position'><Loader/></div>:
                    <div className="quizes-container">
                        {
                            quizes?.length === 0 ? "Your have not Created any quiz.":
                            quizes?.map((quiz, index) => (
                                <div key={index} className='quiz-name-container'>
                                    <div className='quiz-name'>
                                        <div>
                                            <p>{quiz?.quizName}</p>
                                            <p>Average marks: {trueRound(quiz.average, 2)}</p>
                                        </div>
                                        <div>
                                            <p>{quiz.type} Quiz </p>
                                            
                                        </div>
                                    </div>
                                    <button className='inner-grad-btn' style={{padding: "7px 14px"}} onClick={()=>{
                                        navigate(`/QuizResult/${User?.result?._id}/${quiz._id}`);
                                    }}>View All participants</button>

                                </div>
                            ))

                        }

                    </div>
                }
            </div>
        </div>

    )
}

export default QuizResult