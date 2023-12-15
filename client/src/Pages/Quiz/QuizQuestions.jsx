import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import './Quiz.css';
import { useDispatch } from 'react-redux'
import { submitQuiz } from '../../actions/quiz'

import axios from 'axios'
import { backend_URL } from '../../api/url'


const QuizQuestions = () => {

      const dispatch = useDispatch();
      const [loading, setLoading] = useState(true);
      const {id}= useParams();
      const [currentquiz, setCurrentquiz] = useState(undefined);
      async function fetchQuiz(quizId){
        setLoading(true);
        console.log("Fetching quiz Data: ");
        const a = await axios.get(`${backend_URL}/quiz/getQuiz/${quizId}`);
        console.log("Quiz fetched");
        setCurrentquiz(a?.data?.quiz);
        setLoading(false);
      }
      useEffect(() => {
        fetchQuiz(id);
      }, [])

      console.log(currentquiz);
      const length = currentquiz?.questions?.length;
      const ansArray = Array(length).fill(undefined);
      console.log(ansArray);
      
      const navigate= useNavigate();
      var path=useLocation();
      var [flag, setFlag] = useState(true);
      const [submited, setsubmited] = useState(false);

      const User = useSelector((state) =>( state.currentUserReducer ))
      const userid = User?.result._id; 
      const quizid = currentquiz?._id;


      function startQuiz(e){
        setFlag(false);
      }

      function handleSubmit(e){
        setsubmited(true);
        console.log(submited);
        
        toast.success("Quiz has been submitted");
        dispatch(submitQuiz({ansArray, userid, quizid}, navigate('/Quiz')));
        // e.preventDefault();
      }
      window.onfocus = function (ev) {
          console.log("flag "+flag);
      };

      
      function handleSelect(optionId, index){
        ansArray[index]=optionId;
        console.log(ansArray);
      }
      

  return (
    <divc className="quiz-start-container">
        {
        flag && 
        <div className='main-bar'>
            <div className="main-bar-header">
                <h1>{currentquiz?.quizName}</h1>
                <h2>{currentquiz?.type} Quiz</h2>
            </div>
            {/* <p>Once the quiz is started you cannot change tabs or click anywhere outside the window. In case you do so the quiz will be automatically submitted.</p> */}
            <form action="">
              <label htmlFor="">
                <p>Name: </p>
                <input type="text" name="" id="" value={User?.result?.name}/>
              </label>
              <label htmlFor="">
                <p>Email: </p>
                <input type="text" name="" id="" value={User?.result?.email} />
              </label>
              <p>
                <button onClick={startQuiz} className='quiz-submit-btn'>Click here to start</button>
              </p>
              
            </form>
        </div>
        }
        {
        !flag &&
        <div className="main-bar">
          {
            window.onblur = async function (ev) {
              if(!flag){
                console.log("lost focus");
                // handleSubmit(ev);
                // console.log(flag);
                // toast.success("Your quiz has been auto submitted");
                // navigate('/Quiz');
              }
            }
          }
          
            <div className="main-bar-header">
                <h1>{currentquiz?.quizName}</h1>
                <h2>{currentquiz?.type} Quiz</h2>
            </div>
            <div className="quiz-questions-container">
              <form action="" onSubmit={handleSubmit}>
              <ol type='1'>
              {
                currentquiz?.questions?.map((question, index)=>(
                <div className="quiz-question">
                  <li>
                    <p>{question?.ques}</p>
                    <ol type = "a">
                    {
                          question?.options?.map((opt)=>(
                            <li key={opt._id}>
                                <input type='radio' name={question._id} id= {opt._id} onChange={()=>handleSelect(opt._id, index)}/>
                                <label htmlFor={opt._id}>{opt.option}</label>
                            </li>
                          )) 
                    }
                    </ol>  
                  </li>
                    
                    {currentquiz.type==="Practice" && <details>
                        <summary className='show-answer'>Show Answer</summary>
                        <div>
                          <p>Correct option: {question?.ans?.answer?.option}</p> <p>{question?.ans?.answerDescription}</p>
                        </div>
                    </details>}
                </div>
                ))
              }
              </ol>
              <button type='submit' className='quiz-submit-btn'>Submit</button>
              </form>
            </div>
        </div>
        } 
        
      </divc>

  )
}

export default QuizQuestions