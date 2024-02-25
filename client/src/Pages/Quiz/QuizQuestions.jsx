import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./Quiz.css";
import { useDispatch } from "react-redux";
import { submitQuiz } from "../../actions/quiz";

import { getQuizById } from "../../services/operations/QuizAPI";

const QuizQuestions = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentquiz, setCurrentquiz] = useState(undefined);

  useEffect(() => {
    dispatch(getQuizById(setLoading, setCurrentquiz, id));
  }, []);

  console.log(currentquiz);
  const length = currentquiz?.questions?.length;
  const ansArray = Array(length).fill(undefined);
  console.log(ansArray);

  const navigate = useNavigate();
  var path = useLocation();
  var [flag, setFlag] = useState(true);
  const [submited, setsubmited] = useState(false);

  const User = useSelector((state) => state.currentUserReducer);
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
    dispatch(submitQuiz({ ansArray, userid, quizid }, navigate("/Quiz")));
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
    <div>
      {flag && (
        <div style={{height:"100vh", backgroundColor:"rgb(225, 227, 244)", paddingTop:"180px"}}>
            <div className="quiz-details-container">
            <div className="main-bar-header">
              <h1>{currentquiz?.quizName}</h1>
              <h2>{currentquiz?.type} Quiz</h2>
            </div>
            <p style={{fontSize:"15px"}}>
              <b>Warning:</b> Once the quiz is started you cannot change tabs or
              click anywhere outside the window. In case you do so the quiz will
              be automatically submitted.
            </p>
            <div>
            <form action="">
              <label htmlFor="">
                <p style={{fontWeight:"600"}}>Name: </p>
                <input type="text" name="" id="" value={User?.result?.name} style={{backgroundColor:"white", color:"black"}}/>
              </label>
              <label htmlFor="">
                <p style={{fontWeight:"600"}}>Email: </p>
                <input type="text" name="" id="" value={User?.result?.email} style={{backgroundColor:"white", color:"black"}}/>
              </label>
              <p>
                <button onClick={startQuiz} className="quiz-submit-btn">
                  Click here to start
                </button>
              </p>
            </form>
            </div>
            </div>
            </div>
        
      )}
      {!flag && (
        <div className="quiz-start-outer">
        <div className="quiz-start-container">
        <div className="main-bar">
          {
            (window.onblur = async function (ev) {
              if (!flag) {
                console.log("lost focus");
                handleSubmit(ev);
                // console.log(flag);
                alert("Quiz auto submitted");
                // navigate('/Quiz');
              }
            })
          }

          <div className="main-bar-header">
            <h1>{currentquiz?.quizName}</h1>
            <h2>{currentquiz?.type} Quiz</h2>
          </div>
          <div className="quiz-questions-container">
            <form action="" onSubmit={handleSubmit}>
              <ol type="1">
                {currentquiz?.questions?.map((question, index) => (
                  <div className="quiz-question">
                    <li style={{fontSize:"18px"}}>
                      <p>
                        <b>{question?.ques}</b>
                      </p>
                      <ol type="a">
                        {question?.options?.map((opt) => (
                          <li key={opt._id} className="option-outer">
                            <label htmlFor={opt._id} className="custom-radio">
                              <input
                                type="radio"
                                name={question._id}
                                id={opt._id}
                                onChange={() => handleSelect(opt._id, index)}
                              />
                              <span className="custom-radio-button"></span>
                              {opt.option}
                            </label>
                          </li>
                        ))}
                      </ol>
                    </li>

                    {currentquiz.type === "Practice" && (
                      <details>
                        <summary className="show-answer">Show Answer</summary>
                        <div style={{marginTop:"20px"}}>
                          <p style={{display:"inline", color:"green", fontWeight:"600"}}>Correct option:</p><p style={{display:"inline", marginLeft:"10px"}}>{question?.ans?.answer?.option}</p>{" "}
                          {/* <p style={{color:"rgb(105, 116, 198)"}}>{question?.ans?.answerDescription}</p> */}
                        </div>
                      </details>
                    )}
                  </div>
                ))}
              </ol>
              <button type="submit" className="quiz-submit-btn-2">
                Submit
              </button>
            </form>
          </div>
        </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
