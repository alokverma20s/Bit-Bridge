import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { backend_URL } from '../../api/url';

const QuizResult = () => {
    const location = useLocation();
    const userid = location.pathname.split('/')[2];
    const User = useSelector((state) =>( state.currentUserReducer))
    const urlMyResultsUserId= `${backend_URL}/result/${userid}`;
    
    const [quizes, setQuizes] = useState(null)
    const [loading, setLoading] = useState(true);

    function trueRound(value, digits){
        return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
    }
    
    async function fetchQuizResult(){
      setLoading(true)
      const a = await axios.get(urlMyResultsUserId);
      setQuizes(a?.data?.quiz);
      console.log(a.data.quiz[0]);
      setLoading(false);
    //   console.log(quizes);
    }
    useEffect(() => {
      fetchQuizResult();
    }, [])

    // const quizes = useSelector((state) => state.quizReducer?.data?.allQuiz);
    // console.log(quizes);

    const navigate= useNavigate();

    // function redirectQuizResult(quizId){
    //     if(User===null){
    //         toast.error("Please login to view all results");
    //         navigate('/Auth');
    //     }
    //     else{
    //         navigate(`/QuizResult/${User?.result?._id}/${quizId}`);
    //     }
    // }

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
                <div className="quizes-container">
                    {
                        quizes?.length === 0 ? "Your have not Created any quiz.":
                        quizes?.map((quiz, index) => (
                            <div className='quiz-name-container'>
                                <div className='quiz-name'>
                                    <div>
                                        <p>{quiz?.quizName}</p>
                                        <p>Average marks: {trueRound(quiz.average, 2)}</p>
                                    </div>
                                    <div>
                                        <p>{quiz.type} Quiz </p>
                                        
                                    </div>
                                </div>
                                <button className='inner-grad-btn' onClick={()=>{
                                    navigate(`/QuizResult/${User?.result?._id}/${quiz._id}`);
                                }}>View All participants</button>

                            </div>
                        ))

                    }

                </div>
            </div>
        </div>

    )
}

export default QuizResult