import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { RxTriangleUp } from "react-icons/rx";
import { RxTriangleDown } from "react-icons/rx";
import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import "./Question.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAns from "./DisplayAnswer";
import {
    postAnswer,
    deleteQuestion,
    voteQuestion,
} from "../../actions/question.js";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { getQuestions } from "../../services/operations/questions.js";

const QuestionDetails = () => {
    const { id } = useParams();
    const questionList = useSelector((state) => state.questionsReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const url = "https://bitbridge.netlify.app" + location.pathname;
    const [Answer, setAnswer] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const User = useSelector((state) => state.currentUserReducer);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState({});
    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            toast("Login or Signup to answer a question");
            navigate("/Auth");
        } else {
            if (Answer.trim() === "") {
                toast("Enter an answer before submitting");
            } else {
                const formData = new FormData();
                formData.append('id', id);
                formData.append('noOfAnswers', answerLength + 1);
                formData.append('answerBody', Answer);
                formData.append('userAnswered', User.result.name);
                formData.append('userId', User?.result?._id)
                formData.append('file', selectedImage);

                dispatch(postAnswer(formData, id, navigate));
                e.target.reset();
            }
        }
    };

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    };

    async function fetchData() {
        await getQuestions(setLoading, setQuestion, id);
    }
    useEffect(() => {
        fetchData();
    },[])

    const handleUpVote = () => {
        if (User == null) {
            toast("Login to vote a question", alert);
        } else{
            dispatch(voteQuestion(id, "upVote", User.result?._id));
            fetchData();
        }
    };
    const handleDownVote = () => {
        if (User == null) {
            toast("Login to vote a question", alert);
        } else{
            dispatch(voteQuestion(id, "downVote", User.result?._id));
            fetchData();
        }
    };

    return (
        <div className="question-details-page">
            {loading ? (
                <div className="loader-position">
                    <Loader />
                </div>
            ) : (
                <div className="main-bar" key={question?._id}>
                    <section className="question-details-container">
                        <h1 className="text-2xl p-4 font-medium">{question.questionTitle}</h1>
                        <div className="question-details-container-2">
                            <div className="question-votes">
                                <div onClick={handleUpVote} className="ques-vote-btn">
                                    <RxTriangleUp style={{ fontSize: "40px", color: "white" }} />
                                </div>
                                <p>{question?.upVote?.length - question?.downVote?.length}</p>
                                <div onClick={handleDownVote} className="ques-vote-btn">
                                    <RxTriangleDown style={{ fontSize: "40px", color: "white" }} />
                                </div>
                                {/* <img src={downvote} className='material-icons-unlike' alt="downvoteButton" onClick={handleDownVote} ></img> */}
                            </div>
                            <div style={{ width: "100%" }}>
                                <p className="question-body">{question.questionBody}</p>
                                {
                                    question?.imageURL && <img className=" p-4" src={question?.imageURL} alt="Question Image" />
                                }

                                <div className="question-details-tags">
                                    {question?.questionTags?.map((tag) => (
                                        <Link key={tag?._id} to={`/Tags/${tag?._id}`}>
                                            <p>{tag.tagName}</p>
                                        </Link>
                                    ))}
                                </div>
                                <div className="question-actions-user">
                                    <div>
                                        <CopyToClipboard text={url}>
                                            <button type="button" onClick={() => { toast.success(`Copied url: ${url}`); }}>
                                                Share
                                            </button>
                                        </CopyToClipboard>
                                        {(User?.result?._id === question?.userId?._id || User?.result?.role === "admin") && (
                                                <button type="button" onClick={handleDelete}>
                                                    Delete
                                                </button>
                                            )}
                                    </div>
                                    <div>
                                        <p>asked on {moment(question?.askedOn).fromNow()}</p>
                                        <Link to={`/Users/${question?.userId?._id}`} className="user-link mt-2">
                                            {question.userId?.role === "student" && (
                                                <Avatar backgroundColor="rgb(105, 116, 198)" px="2px" py="2px" color="white">
                                                    {question.userId?.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                            )}
                                            {question.userId?.role === "admin" && (
                                                <Avatar backgroundColor="white" px="2px" py="2px" color="black">
                                                    <FaUserTie />
                                                </Avatar>
                                            )}
                                            {question.userId?.role === "instructor" && (
                                                <Avatar backgroundColor="green" px="2px" py="2px" color="white">
                                                    <FaChalkboardTeacher />
                                                </Avatar>
                                            )}

                                            <div style={{ color: "rgb(105, 116, 198)", fontFamily: "Rubik", fontWeight: 600, }}>
                                                {question?.userId?.name}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {question.noOfAnswers !== 0 && (
                        <section>
                            <h3>{question.noOfAnswers} Answers</h3>
                            <br />
                            <DisplayAns
                                key={question?._id}
                                question={question}
                            ></DisplayAns>
                        </section>
                    )}
                    <section className="post-ans-container mt-4">
                        <h3>Your answer</h3>
                        <form onSubmit={(e) => { handlePostAns(e, question.answer.length); }} className="mt-2">
                            <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea>
                            <label>
                                <h4>Upload image of your answer (optional)</h4>

                                {selectedImage && (
                                    <>
                                        <div className="img-container">
                                            <img className="img" alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                        </div>

                                        <span className="img-btn" onClick={() => setSelectedImage(null)}>
                                            Remove
                                        </span>

                                    </>
                                )}

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
                            <input type="Submit" name="" id="" className="post-ans-btn ml-4" value="Post Your Answer" />

                        </form>
                        <p className="mt-4">
                            Checkout other questions tagged
                            {question?.questionTags?.map((tag) => (
                                <Link key={tag?._id} to={`/Tags/${tag?._id}`} className="ans-tag" style={{ color: "rgb(105, 116, 198)" }}>
                                    {tag.tagName}
                                </Link>
                            ))}{" "}
                            or
                            <Link to="/AskQuestion" className="all-links" style={{ color: "rgb(105, 116, 198)" }}>
                                {" "}
                                ask your own question
                            </Link>
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
};

export default QuestionDetails;
