import React, { useEffect, useState } from 'react'
import './Subject.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { getSubjects, addSubject } from '../../services/operations/subjectAPI';
import { useSelector } from 'react-redux';

const SubjectsList = () => {
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const User = useSelector((state) => (state.currentUserReducer));
  const [newSubject, setNewSubject] = useState(null);
  const [newSubjectDesc, setNewSubjectDesc] = useState(null);

  useEffect(() => {
    dispatch(getSubjects(setLoading, setSubjects));
  }, [])

  function handleSubmit(){
    dispatch(addSubject(newSubject, newSubjectDesc));
  }

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

            {
              User.result.role==='admin'&&
              <div>
                <h2>Add Subject</h2>
                <form action="" onSubmit={handleSubmit}>
                  <label htmlFor="">
                    <p>Subject Name: </p>
                    <input type="text" name="" id="" placeholder='Enter subject name' onChange={(e)=>{setNewSubject(e.target.value)}}/>;
                    <p>Subject Description: </p>
                    <textarea name="" id="" cols="100" rows="10" placeholder='Enter subject description' onChange={(e)=>{setNewSubjectDesc(e.target.value)}}></textarea>
                  </label>
                  <button>Add Subject</button>
                </form>
              </div>
            }
            
          </div>
      }
    </div>

  )
}

export default SubjectsList