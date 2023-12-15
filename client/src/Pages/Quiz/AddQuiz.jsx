import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createQuiz } from "../../actions/quiz";
import "./AddQuiz.css";
import toast from 'react-hot-toast'
const answers = [];

const AddQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);

  const [quizName, setQuizName] = useState("General Quiz");
  const [quizAuthor] = useState(User?.result?._id);
  const [quizType, setQuizType] = useState("Practice");

  const [currentquiz, setCurrentQuiz] = useState([]);
  console.log(currentquiz);
  var obj = {};
  var temp = [];

  function addQuestion(e) {
    e.preventDefault();
    if (document.getElementById("questionName").value === "") {
      toast.error("Please add question title name");
    } else {
      console.log(document.getElementById("quizName"));
      obj = {
        ques: document.getElementById("questionName").value,
        options: temp,
        ans: document.getElementById("correctOption").value,
        answerDescription: document.getElementById("answerDescription").value,
      };
      answers.push(undefined);
      document.getElementById("questionName").value = "";
      document.getElementById("correctOption").value = "";
      setCurrentQuiz([...currentquiz, obj]);
      currentquiz.push(obj);
      obj = {};
      temp = [];
      // console.log(currentquiz);
    }
  }

  function addOption() {
    if (document.getElementById("option").value === "") {
      toast.error("Add some options please");
    } else {
      temp.push(document.getElementById("option").value);
      document.getElementById("option").value = "";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let i = 0; i < currentquiz.length; i++) {
      currentquiz[i].ans = answers[i];
    }

    let cnt = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === undefined) {
        continue;
      } else {
        cnt++;
      }
    }

    if (cnt === answers.length && currentquiz.length !== 0) {
      dispatch(
        createQuiz({ quizName, quizAuthor, quizType, currentquiz }),
        navigate("/Quiz")
      );
    } else if(currentquiz.length === 0){
      toast.error("Please add at least one question.")
    }
     else {
      toast.error("Answer all the questions");
    }
  }

  function handleSelect(index, value) {
    answers[index] = value;
  }

  return (
    <div className="home-container-1">
      <LeftSidebar></LeftSidebar>
      <div className="home-container-2">
        <div className="main-bar">
          <div id="add-quiz-header">
            <h1>Create your own quiz</h1>
          </div>
          <div className="create-quiz-container">
            <form action="" onSubmit={handleSubmit}>
              <p id="quiz-type-box">
                <label htmlFor="" id="quizType">
                  Quiz type :
                </label>
                <input
                  type="radio"
                  name="quizType"
                  id="Assessment"
                  value="Assessment"
                  onClick={(e) => {
                    setQuizType("Assessment");
                  }}
                />
                <label htmlFor="Assessment">Assessment</label>
                <input
                  type="radio"
                  name="quizType"
                  id="Practice"
                  value="Practice"
                  onClick={(e) => {
                    setQuizType("Practice");
                  }}
                />
                <label htmlFor="Practice">Practice</label>
              </p>

              <label>
                <p id="quiz-name-heading">Quiz Name</p>
                <input
                  type="text"
                  id="quizName"
                  onChange={(e) => {
                    setQuizName(e.target.value);
                  }}
                />
              </label>
              <ol id="ques-num" type="1">
                {currentquiz?.map((question, index) => (
                  <div className="quiz-question" key={question?._id}>
                    <li>
                      <p>{question.ques}</p>
                      <ol type="a">
                        {question.options?.map((opt, i) => (
                          <li key={opt}>
                            <input
                              type="radio"
                              name={`ForQues${index}`}
                              onChange={() => handleSelect(index, opt)}
                              id={`ForQues${index}${i}`}
                            />
                            <label htmlFor={`ForQues${index}${i}`}>{opt}</label>
                          </li>
                        ))}
                        <div id="correct-option-div">
                          <p>Correct option: {question.ans}</p>{" "}
                          <p>{question.ans_desc}</p>
                        </div>
                      </ol>
                    </li>
                  </div>
                ))}
              </ol>
              <div className="add-quiz-question">
                <label>
                  <p id="ques-desc">Question </p>
                  <textarea
                    type="text"
                    name=""
                    id="questionName"
                    placeholder="Enter Question"
                  />
                </label>

                <label>
                  <p id="option-heading">Option</p>{" "}
                  <input
                    id="option"
                    type="text"
                    placeholder="Enter options one by one"
                  />{" "}
                  <input
                    className="inner-grad-btn"
                    id="add-option-btn"
                    type="button"
                    value="Add option"
                    onClick={addOption}
                  />
                </label>
                <div className="add-quiz-ans">
                <label id="correct-option-label">
                    <p>Correct option</p>{" "}
                    <input
                      type="text"
                      name=""
                      id="correctOption"
                      placeholder="Enter the correct option"
                    />
                  </label>
                  <label>
                    <p id="ans-desc">Answer Description</p>{" "}
                    <textarea
                      rows="2"
                      cols="200"
                      id="answerDescription"
                      placeholder="Enter answer description"
                    />
                  </label>
                </div>

                <br />
                <p>
                  <input
                    type="button"
                    className="inner-grad-btn"
                    id="add-question-btn"
                    value="Add Question"
                    onClick={addQuestion}
                  />
                </p>
              </div>

              <button type="submit" className="grad-btn" id="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
