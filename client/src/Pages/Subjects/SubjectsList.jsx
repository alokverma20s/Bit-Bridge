import React, { useEffect, useState } from 'react'
import './Subject.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { getSubjects } from '../../services/operations/subjectAPI';

const SubjectsList = () => {
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSubjects(setLoading, setSubjects));
  }, [])

  return (
    <div>
      {
        loading ?<div className='loader-position'><Loader/></div>:
          <div className="main-bar">
            <div className="main-bar-header">
              <h1>Subjects</h1>
            </div>
            <div className="subjects-list-container">
              {loading && <div className='loader-position'><Loader/></div>}
              {subjects && subjects.map((subject) => (
                  <div className='subject'>
                    <h3>{subject.subjectName}</h3>
                    <div>
                    <div className='subject-btns'>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/questions`} className='subject-link'>Questions</Link>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/quizes`} className='subject-link'>Quizes</Link>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/resourses`} className='subject-link'>Resourses</Link>
                      </div>
                      <p className='subject-desc'>{subject.subjectDescription}</p>
                    </div>
                    
                  </div>
                
              ))}
              {!loading && !subjects && <p>No subjects found.</p>}
            </div>
          </div>
      }
    </div>

  )
}

export default SubjectsList