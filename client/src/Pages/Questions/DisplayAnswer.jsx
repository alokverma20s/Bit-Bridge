import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../components/Avatar/Avatar'
import { Link, useLocation, useParams } from 'react-router-dom'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { toast } from 'react-hot-toast'
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import {BiUpvote, BiDownvote} from "react-icons/bi";
import { deleteAnswer } from '../../actions/question.js'
import { voteAnswer } from '../../actions/question.js'

const DisplayAns = ({ question }) => {
  const location = useLocation();
  const url = 'https://bitbridge.netlify.app' + location.pathname;
  const User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  }

  const [currentVotes, setCurrentVotes] = useState(Array(question.answer.length).fill(0));
  const [currentUpvote, setCurrentUpvote] = useState(Array(question.answer.length).fill(0));
  const [currentDownvote, setCurrentDownvote] = useState(Array(question.answer.length).fill(0));

  

  
  useEffect(()=>{
    question.answer.map((ans, index)=>{
      currentVotes[index]=(ans.upVote.length - ans.downVote.length);
      console.log(ans.upVote);
      console.log(User.result._id);
      if(ans.upVote.includes(User.result._id)){
        currentUpvote[index]=1;
      }
      if(ans.downVote.includes(User.result._id)){
        currentDownvote[index]=1;
      }
    })
  });

  console.log(currentVotes);

  const handleUpVote = (answerId, index) => {
    if(User==null){
      toast("Login to vote");
    }
    else {
      dispatch(voteAnswer(id, answerId, 'upVote', User.result?._id));
      if(currentDownvote[index]==1){
        currentDownvote[index]=0;
        currentUpvote[index]=1;
        currentVotes[index]=currentVotes[index]+2;
      }
      else if(currentUpvote[index]==0){
        currentVotes[index]++;
        currentUpvote[index]=1;
      }
      else{
        currentUpvote[index]=0;
        currentVotes[index]--;
      }
    }
      
  }
  const handleDownVote = (answerId, index, downVoteArray) => {
    if(User==null){
      toast("Login to vote");
    }
    else{
      dispatch(voteAnswer(id, answerId, 'downVote', User.result?._id))
      if(currentUpvote[index]==1){
        currentUpvote[index]=0;
        currentDownvote[index]=1;
        currentVotes[index]=currentVotes[index]-2;
      }
      else if(currentDownvote[index]==0){
        currentVotes[index]--;
        currentDownvote[index]=1;
      }
      else{
        currentDownvote[index]=0;
        currentVotes[index]++;
      }
    }
      
  }
  // console.log(question.answer);
  return (
    <div>
      {
        question.answer.map((ans, index) => (
          <div className="ans-outer-container">
            <div className='ans-voting'>
              <span onClick={()=>handleUpVote(ans._id, index, ans.upVote)}>
                {currentUpvote[index]==1?<BiSolidUpvote />: <BiUpvote/>}
              </span>
              <p>{currentVotes[index]}</p>
              <span onClick={()=>handleDownVote(ans._id, index, ans.downVote)}>
                {currentDownvote[index]==1?<BiSolidDownvote/>: <BiDownvote/>}
              </span>
              
            </div>
            <div className="display-ans" key={ans?._id}>
              <p>{ans.answerBody}</p>
              <div className='question-actions-user'>
                <div>
                  <CopyToClipboard text={url}>
                    <button type='button' onClick={() => { toast.success(`Copied url: ${url}`) }}>Share</button>
                  </CopyToClipboard>
                  {
                    (User?.result?._id === ans?.userId?._id || User?.result?.role === 'admin') && (
                      <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                    )
                  }
                </div>
                <div>
                  <p>answered {moment(ans.answeredOn).fromNow()}</p>
                  <Link to={`/Users/${ans.userId?._id}`} className='user-link' style={{ color: '#white' }}>
                    {
                      ans.userId?.role === "student" &&
                      <Avatar backgroundColor="white" px="2px" py="2px">{ans.userAnswered?.charAt(0).toUpperCase()}</Avatar>
                    }{
                      ans.userId?.role === "instructor" &&
                      <Avatar backgroundColor="green" px="2px" py="2px"><FaChalkboardTeacher /></Avatar>
                    }{
                      ans.userId?.role === "admin" &&
                      <Avatar backgroundColor="purple" px="2px" py="2px"><FaUserTie /></Avatar>
                    }

                    <div>
                      {ans.userId?.name}
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        ))
      }
    </div>
  )
}

export default DisplayAns