import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { backend_URL } from '../../api/url';

const TutorResult = () => {

    const location = useLocation();
    const {userid, quizid} = useParams();

    const User = useSelector((state) => (state.currentUserReducer))
    const urlMyResultsUserId = `${backend_URL}/result/quizResult/${userid}/${quizid}`;

    const [participants, setParticipants] = useState(null);
    const [quizData, setQuizData] =useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchQuizResult() {
        setLoading(true)
        const a = await axios.get(urlMyResultsUserId);
        setLoading(false);
        setParticipants(a?.data?.quiz?.user);
        setQuizData(a?.data?.quiz);
        console.log(a.data.quiz);
    }
    //   console.log(quizes);
    useEffect(() => {
        fetchQuizResult();
    }, [])

    function trueRound(value, digits){
        return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
    }

    return (


        <div className="">
            {loading ? "Loading....":
                <div className='home-container-1'>
                <LeftSidebar></LeftSidebar>
                <div className='home-container-2'>
    
                    <div className='main-bar'>
                        <div className="main-bar-header">
                            <h1>Participants</h1>
                            <h3>Average: {trueRound(quizData?.average, 2)}</h3>
                            <h2>{quizData?.quizName}</h2>
                        </div>
                    </div>
    
                    <div className="quizes-container">
                        {
                            participants?.map((participant, index) => (
                                <div className='quiz-name-container'>
                                    <div className='quiz-name'>
                                        <div>
                                            <p>{participant?.userName?.name}</p>
                                            <p>{participant?.userName?.email}</p>
                                        </div>
                                        <div>
                                            <p>Score: {participant?.marks}/{quizData?.questions.length}</p>
                                        </div>
                                    </div>
                                    <p></p>
    
                                </div>
                            ))
    
                        }
                    </div>
                </div>
            </div>
            }
        </div>

        
    )
}

export default TutorResult