import React, { useEffect, useState } from 'react'
import QuestionList from '../../components/HomeMainbar/QuestionList';
import { useDispatch } from 'react-redux';
import { profileQuestions } from '../../services/operations/authAPI';
import Loader from '../../components/Loader/Loader';
import { useLocation } from 'react-router-dom';

const ProfileBio = ({currentProfile}) => {
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState([])
    const [loading,setLoading] = useState(true);

    const location = useLocation();
    

    useEffect(()=>{
        dispatch(profileQuestions(location.pathname.split('/')[2], setQuestions,setLoading))
    },[])
  return (
    <div>
        <div>
        {
            currentProfile?.tags ?(
                <>
                    <h4>Tags watched</h4>
                    {
                        currentProfile?.tags.map((tag) => (<p key={tag}>{tag}</p>))
                    }
                </> 
            ):(
                <p>0 tags watched</p>
            )
        }
        </div>
        <div>
            {
                currentProfile?.about?(
                    <>
                        <h4>About</h4>
                        <p>{currentProfile?.about}</p>
                    </>
                ):(
                    <p>No bio found</p>
                )
            }
        </div>
        <div className="">
            {
                loading ?<div className='loader-position'><Loader/></div>: <QuestionList questionList={questions.questionAsked} />
            }
           
        </div>
        
    </div>
  )
}

export default ProfileBio