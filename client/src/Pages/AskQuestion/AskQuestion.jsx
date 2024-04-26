import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/question.js";
import { getSubjects } from '../../services/operations/subjectAPI';
import "./AskQuestion.css";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Select from 'react-select';

const AskQuestion = () => {
  const [selectedSubject, setSubject] = useState(undefined);
  const [dropDown, setDropDown] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(undefined);
  const [questionBody, setQuestionBody] = useState(undefined);
  const [validWords, setValidWords] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.currentUserReducer);
  const optionList = [];

  useEffect(() => {
    dispatch(getSubjects(setLoading, setSubjects));
  }, [])

  for(var i =0 ;i<subjects.length;i++){
    let obj={
      label: subjects.at(i).subjectName,
      value: subjects.at(i).subjectName,
    }
    optionList.push(obj);
  }

  function handleSelect1(data){
    setSubject(data.value);
  }


  function handleClick(e) {
    setDropDown(!dropDown);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      validWords.length !== undefined &&
      selectedSubject !== undefined &&
      questionTitle !== undefined &&
      questionBody !== undefined &&
      User 
    ) {
      const formData = new FormData();
      formData.append('questionTitle', questionTitle);
      formData.append('questionBody', questionBody);
      formData.append('questionTags', validWords);
      formData.append('userPosted', User?.result?.name);
      formData.append('userId', User?.result?._id);
      formData.append('selectedSubject', selectedSubject);
      formData.append('file', selectedImage);
      console.log(selectedSubject);
      dispatch(
        askQuestion(formData),
        navigate("/Questions")
      );

      // console.log(questionTitle, questionBody, questionTags);
    }else if(User == null){
      toast.error("Please login to post questions");
      navigate('/Auth');
    } else if (questionTitle === undefined) {
      toast.error("Please enter question title to submit");
    } else if (questionBody === undefined) {
      toast.error("Please enter question body to submit");
    } else toast.error("Please Enter tags and subject to submit");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1 className="text-2xl font-bold">Ask a public Question</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Your title must summarize the problem</p>
              <input
                type="text"
                autoComplete="off"
                name="questionTitle"
                id="ask-ques-title"
                placeholder="Example: How to center a div"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>Describe your problem in detail</p>
              <textarea
                name="questionBody"
                id="ask-question-body"
                cols=""
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyUp={handleEnter}
                placeholder="Example: I want to center the div using flex property but I am unable to do so, here is my code.  "
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add tags to describe what your question is about</p>
              <input
                type="text"
                autoComplete="off"
                name="questionTsag"
                id="ask-ques-tags"
                onChange={(e) => {
                  setValidWords(e.target.value);
                }}
                placeholder="Example: css html frontend"
              />
            </label>
            <label htmlFor="ask-ques-subject">
              <h4>Select Subject</h4>
            <div className="dropdown-container">
              <Select options={optionList} placeholder="Select Subject" onChange={handleSelect1} isSearchable={true}/>
              </div>
            </label>
            <br />
            <label>
              <h4>Upload image of your question (optional)</h4>

              {selectedImage && (
                <>
                  <div className="img-container">
                    <img className="img" alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)}/>
                  </div>

                    <span className="img-btn" onClick={() => setSelectedImage(null)}>
                      Remove
                    </span>
      
                </>
              )}

              <br />

              <input
                type="file"
                name="myImage"
                className="img-input"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </label>
            <input type="submit" value="Review your question" className="review-btn"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
