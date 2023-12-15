import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question.js'
import './AskQuestion.css'
import toast from 'react-hot-toast'

const AskQuestion = () => {
    const [selectedSubject, setSubject] = useState(undefined);
    const [dropDown, setDropDown] = useState(false);
    const [questionTitle, setQuestionTitle] = useState(undefined)
    const [questionBody, setQuestionBody] = useState(undefined)
    const [validWords, setValidWords] = useState('')
    let questionTags = []
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => (state.currentUserReducer))

    const subjects=[
      {
            "_id":"655a5b3cfad70e6d022c1a7c",
            "subjectName": "General Questions"
      },
      {
        "_id":"6559b7667aad4a8fff67f68e",
        "subjectName": "DCN"
      },
      {
        "_id":"6559b7cb7aad4a8fff67f6a6",
        "subjectName": "Data Structures"
      },
      {
        "_id":"6559b8267aad4a8fff67f6a8",
        "subjectName": "Operating Systems"
      },
      {
        "_id":"6559b85f7aad4a8fff67f6aa",
        "subjectName": "Computer Graphics"
      },
      {
        "_id":"6559b8877aad4a8fff67f6ac",
        "subjectName": "Automata Theory"
      },
      {
        "_id":"6559b8a37aad4a8fff67f6ae",
        "subjectName": "Java"
      },
      {
        "_id":"6559b8d17aad4a8fff67f6b0",
        "subjectName": "Object Oriented Programming"
      },
      {
        "_id":"6559b8f27aad4a8fff67f6b2",
        "subjectName": "Cryptography"
      },
      {
        "_id":"6559b9217aad4a8fff67f6b4",
        "subjectName": "Discrete Mathematics"
      },
      {
        "_id":"6559b94b7aad4a8fff67f6b6",
        "subjectName": "Software Engineering"
      },
      {
        "_id":"655a5c0dfad70e6d022c1a7e",
        "subjectName": "Web Development"
      }
    ]

    function selectSubject(e){
        setSubject(e.target.value);
        // console.log(subject);
        // setDropDown(!dropDown);
    }

    function handleClick(e){
        setDropDown(!dropDown)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = '';
        for (let i = 0; i < validWords.length; i++) {
            if (validWords[i] !== ' ') {
                temp += validWords[i];
            }
            else {
                if (temp !== '') {
                    questionTags.push(temp);
                    temp = '';
                }
            }
        }
        if (temp !== '') {
            questionTags.push(temp);
            temp = '';
        }
        if (questionTags.length !== 0 && selectedSubject!==undefined && questionTitle!==undefined && questionBody!==undefined) {
            dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id ,selectedSubject}), navigate('/'));

            // console.log(questionTitle, questionBody, questionTags);
        }
        else if(questionTitle===undefined){
          toast.error("Please enter question title to submit");
        }
        else if(questionBody===undefined){
          toast.error("Please enter question body to submit");
        }
        else
        toast.error("Please Enter tags and subject to submit");

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "\n");
        }
    }

    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>Ask a public Question</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Your title must summarize the problem</p>
                            <input type="text" autoComplete='off' name='questionTitle' id='ask-ques-title' placeholder='Example: How to center a div' onChange={(e) => { setQuestionTitle(e.target.value) }} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Describe your problem in detail</p>
                            <textarea name="questionBody" id="ask-question-body" cols='' rows="10" onChange={(e) => { setQuestionBody(e.target.value) }} onKeyUp={handleEnter} placeholder='Example: I want to center the div using flex property but I am unable to do so, here is my code.  '></textarea>

                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add tags to describe what your question is about</p>
                            <input type="text" autoComplete='off' name='questionTsag' id='ask-ques-tags' onChange={(e) => { setValidWords(e.target.value) }} placeholder='Example: css html frontend' />
                        </label>
                        <label htmlFor="ask-ques-subject">
                            <h4>Subject</h4>
                            <span>Select a subject for question  </span>
                            <select name="subject" id="subject" onChange={(e)=>{
                                            setSubject(document.getElementById('subject').value);
                                        }}>
                                <option value="none" selected disabled hidden>Select</option>
                                { 
                                    subjects.map((subject)=>(
                                        <option value={subject.subjectName}>{subject.subjectName}</option>
                                    ))
                                }
                            </select>
                        </label>
                        <br />
                        <input type="submit" value='Review your question' className='review-btn border-gradient border-gradient-purple grad-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion