import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Quizpaper from './Quizpaper'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Quiz = () => {
  const User = useSelector((state) =>( state.currentUserReducer))
  console.log(User);
  const urlMyResultsUserId= "/MyResults/"+User?.result?._id;
  const urlQuizResultUserId= "/QuizResult/"+User?.result._id;

  const quizes = useSelector((state) => state.quizReducer?.data?.allQuiz);

  return (
    <div className='home-container-1'>
        <LeftSidebar></LeftSidebar>
        <div className='home-container-2'>
            <div className="main-bar">
                <div className="main-bar-header">
                    <h1>Quiz</h1>
                    <div className='result-btn-container'>
                      {
                        (User?.result?.role==='admin'||User?.result?.role==='instructor')&&<Link to='/AddQuiz' className='add-btn'>Add Quiz</Link>
                      }
                      {
                        (User?.result?.role==='admin'||User?.result?.role==='instructor')&&<Link to={urlQuizResultUserId} className='add-btn'>View all Results</Link>
                      }
                      {
                        User && <Link to={urlMyResultsUserId} className='add-btn'>View your results</Link>
                      }
                      
                    </div>
                    
                </div>
                <div className="quizes-container">
                  {
                      quizes?.map((quiz, index)=>(
                          <Quizpaper quizArray={quizes} quiz={quiz} index={index+1} key={quiz?._id}></Quizpaper>
                      ))
                  }
                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Quiz