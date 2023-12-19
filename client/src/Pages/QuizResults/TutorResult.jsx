import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchQuizResults } from '../../services/operations/resultAPI';

const TutorResult = () => {

    const dispatch = useDispatch();
    const {userid, quizid} = useParams();

    const User = useSelector((state) => (state.currentUserReducer))

    const [participants, setParticipants] = useState(null);
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchQuizResults(setLoading, setParticipants, setQuizData, userid, quizid));
    }, [])

    function trueRound(value, digits) {
        return (Math.round((value * Math.pow(10, digits)).toFixed(digits - 1)) / Math.pow(10, digits)).toFixed(digits);
    }

    return (


        <div className="">
            {loading ? <div className='loader-position'><Loader /></div> :
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
                                            {
                                                participant?.userName?
                                                    <div>
                                                        <p>{participant?.userName?.name}</p>
                                                        <p>{participant?.userName?.email}</p>
                                                    </div>
                                                    :<div>
                                                        <p>Past User</p>
                                                        <p></p>
                                                    </div>
                                                    
                                        }

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
    
                    <div className="quizes-container">
                        {
                            participants?.map((participant, index) => (
                                <div key= {index} className='quiz-name-container'>
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
            }
        </div>


    )
}

export default TutorResult