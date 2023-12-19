import toast from "react-hot-toast"
import {MdDelete} from "react-icons/md"

import './Quiz.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteQuiz } from '../../services/operations/QuizAPI';

const Quizpaper = ({quizArray, quiz, index}) => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
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
            <button className='inner-grad-btn' onClick={redirect}><pre>Take Quiz</pre></button> 
        {
            
            (User?.result?.role==="instructor" || User?.result?.role==="admin")&&
            <MdDelete className='delete-quiz' onClick={()=>dispatch(deleteQuiz(quiz._id, navigate))}/>
        }  
        
    </div>
  )
}

export default Quizpaper;