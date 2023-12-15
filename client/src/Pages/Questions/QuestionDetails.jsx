import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import upvote from '../../assets/upvote.svg'
import downvote from '../../assets/downvote.svg'
import './Question.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAns from './DisplayAnswer'
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question.js";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

const QuestionDetails = () => {

    const { id } = useParams();
    const questionList = useSelector(state => state.questionsReducer)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const url = "https://bitbrige.netlify.app" + location.pathname;
    const [Answer, setAnswer] = useState("");
    const User = useSelector((state) => (state.currentUserReducer));
    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert("Login or Signup to answer a question")
            navigate('/Auth')
        } else {
            if (Answer.trim() === '') {
                alert("Enter an answer before submitting")
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User?.result?._id }, navigate))
                e.target.reset();
            }
        }
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
        window.location.reload();
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }
    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }

    return (
        <div className='question-details-page'>
            {
                questionList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        {

                            questionList.data.filter(question => question._id === id).map(question => (
                                <div className='main-bar' key={question._id}>
                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className='question-details-container-2'>
                                            <div className="question-votes">
                                                <img src={upvote} alt="" className='material-icons-like' onClick={handleUpVote} />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img src={downvote} className='material-icons-unlike' alt="downvoteButton" onClick={handleDownVote} ></img>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <p className='question-body'>{question.questionBody}</p>
                                                <div className='question-details-tags'>
                                                    {question?.questionTags?.map((tag) => (
                                                        <Link key={tag._id} to={`/Tags/${tag._id}`}>
                                                            <p >{tag.tagName}</p></Link>
                                                    ))}
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <CopyToClipboard text={url}>
                                                            <button type='button' onClick={() => { alert(`Copied url: ${url}`) }}>Share</button>
                                                        </CopyToClipboard>
                                                        {
                                                            (User?.result?._id === question?.userId || User?.result?.role === 'admin') && (
                                                                <button type='button' onClick={handleDelete} >Delete</button>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <p>asked on {moment(question.askedOn).fromNow()}</p>
                                                        <Link to={`/Users/${question.userId._id}`} className='user-link'>
                                                            {
                                                                question.userId.role === "student" &&
                                                                <Avatar backgroundColor="white" px="2px" py="2px">{question.userId.name.charAt(0).toUpperCase()}</Avatar>
                                                            }{
                                                                question.userId.role === "admin" &&
                                                                <Avatar backgroundColor="purple" px="2px" py="2px"><FaUserTie /></Avatar>
                                                            }{
                                                                question.userId.role === "instructor" &&
                                                                <Avatar backgroundColor="green" px="2px" py="2px"><FaChalkboardTeacher /></Avatar>
                                                            }
                                                            
                                                            <div>
                                                                {question.userId.name}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        question.noOfAnswers !== 0 && (
                                            <section>
                                                <h3>{question.noOfAnswers} Answers</h3>
                                                <DisplayAns key={question._id} question={question}></DisplayAns>
                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your answer</h3>
                                        <form onSubmit={(e) => { handlePostAns(e, question.answer.length) }}>
                                            <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea>
                                            <input type="Submit" name="" id="" className='post-ans-btn inner-grad-btn' value='Post Your Answer' />
                                        </form>
                                        <p>
                                            Checkout other questions tagged
                                            {
                                                question?.questionTags?.map((tag) => (
                                                    <Link key={tag._id} to={`/Tags/${tag._id}`} className='ans-tag'>{tag.tagName}</Link>
                                                ))
                                            } or
                                            <Link to='/AskQuestion' className='all-links'> ask your own question</Link>
                                        </p>
                                    </section>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default QuestionDetails