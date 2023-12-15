import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"
import axios from 'axios';
import {MdDelete} from "react-icons/md"

import './Quiz.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { backend_URL } from '../../api/url';

const Quizpaper = ({quizArray, quiz, index}) => {
    // console.log(quiz);
    const navigate=useNavigate();
    const location = useLocation();
    const User = useSelector((state) =>( state.currentUserReducer ))
    //   console.log(User);

      function redirect(){
        if(User===null){
            toast.error("Please login to take quiz");
            navigate('/Auth');
        }
        else{
            navigate(`/Quiz/${quiz._id}`);
        }
      }

      async function deleteQuiz(quizId){
        const a = await axios.get(`${backend_URL}/quiz/deleteQuiz/${quizId}`);
        console.log(a);
        quizArray.splice(index);
        window.location.reload();
      }
      

  return (
    <div className='quiz-name-container'>
        <div className='quiz-name'>
            <div>
                <p>{index}</p> 
                <p>{quiz?.quizName}</p>
            </div>
            <div>
                <p>{quiz.type} Quiz </p>
                <p>Created by {quiz?.authorName?.name}</p>
            </div> 
        </div> 
            <button className='inner-grad-btn' onClick={redirect}>Take Quiz</button> 
        {
            
            (User?.result?.role==="instructor" || User?.result?.role==="admin")&&
            <MdDelete className='delete-quiz' onClick={()=>deleteQuiz(quiz._id)}/>
        }  
        
    </div>
  )
}

export default Quizpaper;