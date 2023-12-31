import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import './Quiz.css';
import { useDispatch } from 'react-redux'
import { submitQuiz } from '../../actions/quiz'

import { getQuizById } from '../../services/operations/QuizAPI'


const QuizQuestions = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentquiz, setCurrentquiz] = useState(undefined);

  useEffect(() => {
    dispatch(getQuizById(setLoading, setCurrentquiz, id));
  }, [])

  console.log(currentquiz);
  const length = currentquiz?.questions?.length;
  const ansArray = Array(length).fill(undefined);
  console.log(ansArray);

  const navigate = useNavigate();
  var path = useLocation();
  var [flag, setFlag] = useState(true);
  const [submited, setsubmited] = useState(false);

  const User = useSelector((state) => (state.currentUserReducer))
  const userid = User?.result._id;
  const quizid = currentquiz?._id;


  function startQuiz(e) {
    setFlag(false);
  }

  function handleSubmit(e) {
    setsubmited(true);

    flag = true;
    console.log(flag);

    toast.success("Quiz has been submitted");
    dispatch(submitQuiz({ ansArray, userid, quizid }, navigate('/Quiz')));
    // e.preventDefault();
  }
  window.onfocus = function (ev) {
    console.log("flag " + flag);
  };


  function handleSelect(optionId, index) {
    ansArray[index] = optionId;
    console.log(ansArray);
  }


  return (
    <div className="quiz-start-container">
      {
        flag &&
        <div className='main-bar'>
          <div className="main-bar-header">
            <h1>{currentquiz?.quizName}</h1>
            <h2>{currentquiz?.type} Quiz</h2>
          </div>
          <p><b>Warning:</b> Once the quiz is started you cannot change tabs or click anywhere outside the window. In case you do so the quiz will be automatically submitted.</p>
          <form action="">
            <label htmlFor="">
              <p>Name: </p>
              <input type="text" name="" id="" value={User?.result?.name} />
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
              if (!flag) {
                console.log("lost focus");
                // handleSubmit(ev);
                // console.log(flag);
                // alert("Quiz auto submitted");
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
                  currentquiz?.questions?.map((question, index) => (
                    <div className="quiz-question">
                      <li>
                        <p><b>{question?.ques}</b></p>
                        <ol type="a">
                          {
                            question?.options?.map((opt) => (
                              <li key={opt._id} className='option-outer'>

                                <label htmlFor={opt._id} className='custom-radio'>
                                  
                                  <input type='radio' name={question._id} id={opt._id} onChange={() => handleSelect(opt._id, index)} />
                                  <span className='custom-radio-button'></span>
                                  {opt.option}
                                </label>
                              </li>
                            ))
                          }
                        </ol>
                      </li>

                      {currentquiz.type === "Practice" && <details>
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

    </div>

  )
}

export default QuizQuestions