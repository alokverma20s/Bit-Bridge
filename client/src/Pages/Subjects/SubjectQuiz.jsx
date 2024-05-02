import React, { useEffect } from 'react'
import Quizpaper from '../Quiz/Quizpaper'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getQuizBySubject } from '../../services/operations/subjectAPI'
import Loader from '../../components/Loader/Loader'


const SubjectQuiz = () => {
  const [quizes, setQuizes] = useState([]);
  const [subjectName, setSubjectName] = useState(undefined);
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  console.log(subjectId);
  // const subjectId = "6559b7667aad4a8fff67f68e"

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getQuizBySubject(setLoading, setQuizes, subjectId, setSubjectName));
  }, []);

  return (

    <div>
      <div className='home-container-1'>
        <LeftSidebar />
        <div className='home-container-2'>
          <div className='main-bar'>
            <div className='main-bar-header'>
              <h1>Quizzes</h1>
              {!loading && <h2>{subjectName}</h2>}
            </div>
            {loading ? <div className='loader-position'><Loader /></div> :
              <div className="quizes-container">
                {
                quizes.length===0 && <p>No quizzes</p>
                }
                {
                  quizes?.map((quiz, index) => (
                    <Quizpaper quiz={quiz} index={index + 1} key={quiz?._id}></Quizpaper>
                  ))
                }
              </div>
              
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectQuiz