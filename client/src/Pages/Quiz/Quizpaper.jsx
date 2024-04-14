import toast from "react-hot-toast"
import {MdDelete} from "react-icons/md"

import './Quiz.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteQuiz } from '../../services/operations/QuizAPI';

const Quizpaper = ({quiz, index}) => {
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
                <p className="quiz-name-one">{index}</p> 
                <p className="quiz-name-one">{quiz?.quizName}</p>
            </div>
            <div>
                <p className="quiz-name-two">{quiz.type} Quiz </p>
                <p className="quiz-name-two">Created by {quiz?.authorName?.name}</p>
            </div> 
        </div> 
            <button className='quiz-name-btn w-24' onClick={redirect}>Take Quiz</button> 
        {
            
            (User?.result?.role==="instructor" || User?.result?.role==="admin")&&
            <MdDelete className='delete-quiz' onClick={()=>dispatch(deleteQuiz(quiz._id, navigate))}/>
        }  
        
    </div>
  )
}

export default Quizpaper;