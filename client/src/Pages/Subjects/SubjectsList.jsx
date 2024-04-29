import React, { useEffect, useState } from 'react'
import './Subject.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { getSubjects, addSubject } from '../../services/operations/subjectAPI';
import { useSelector } from 'react-redux';
import { getDepartments, getSubjectByDepartment } from '../../services/operations/departmentAPI';

const SubjectsList = () => {
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const User = useSelector((state) => (state.currentUserReducer));
  const [newSubject, setNewSubject] = useState(null);
  const [newSubjectDesc, setNewSubjectDesc] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [department, setDepartment] = useState(null);
  const [semester, setSemester] = useState(null);
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [currentDept, setCurrentDept] = useState("All");


  function handleDepartmentChange(departmentId){
    dispatch(getSubjectByDepartment(setLoading, setSubjects, departmentId, setCurrentDept));
  }

  useEffect(() => {
    dispatch(getSubjects(setLoading, setSubjects));
    dispatch(getDepartments(setLoading, setDepartments));
  }, [])

  function handleSubmit() {
    dispatch(addSubject(newSubject, newSubjectDesc, semester, department));
    dispatch(addSubject())
  }
  // console.log(subjects);

  return (
    <div>
      {
        loading ? <div className='loader-position'><Loader /></div> :
          <div className="main-bar">
            <div className="main-bar-header">
              <h1>Subjects</h1>
              <label htmlFor="ask-ques-subject">
                    <h4>Department</h4>
                    <select name="dept" id="dept" onChange={(e) => {handleDepartmentChange(document.getElementById("dept").value);}}>
                      <option value="none" selected disabled hidden>
                        {currentDept}
                      </option>
                      {departments?.map((department) => (
                        <option value={department._id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </select>
                  </label>
            </div>
            <div className="subjects-list-container">
              {loading && <div className='loader-position'><Loader /></div>}
              {subjects && subjects.map((subject) => (
                <div className='subject'>
                  <h3 className='text-sm font-bold mb-3 mt-2'>{subject.subjectName}</h3>
                  <div>
                    <div className='subject-btns'>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/questions`} className='subject-link'><p>Questions</p></Link>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/quizes`} className='subject-link'><p>Quizes</p></Link>
                      <Link key={subject._id} to={`/Subjects/${subject._id}/resources`} className='subject-link'><p>Resources</p></Link>
                    </div>
                    <p className='subject-desc'>{subject.subjectDescription}</p>
                  </div>

                </div>

              ))}
              {!loading && !subjects && <p>No subjects found.</p>}
            </div>

            {
              User?.result?.role === 'admin' &&
              <div>
                <h2>Add Subject</h2>
                <form action="" onSubmit={handleSubmit}>
                  <label htmlFor="">
                    <p>Subject Name: </p>
                    <input type="text" name="" id="" placeholder='Enter subject name' onChange={(e) => { setNewSubject(e.target.value) }} />
                  </label>
                  <label>  
                    <p>Subject Description: </p>
                    <textarea name="" id="" cols="100" rows="10" placeholder='Enter subject description' onChange={(e) => { setNewSubjectDesc(e.target.value) }}></textarea>
                  </label>
                  <label htmlFor="ask-ques-subject">
                    <h4>Department</h4>
                    <span>Select a department/disciple for the subject</span>
                    <select name="department" id="department" onChange={(e) => {setDepartment(document.getElementById("department").value);}}>
                      <option value="none" selected disabled hidden>
                        Select
                      </option>
                      {departments?.map((department) => (
                        <option value={department._id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="ask-ques-subject">
                    <h4>Semester</h4>
                    <span>Select semester</span>
                    <select name="semester" id="semester" onChange={(e) => {setSemester(document.getElementById("semester").value);}}>
                      <option value="none" selected disabled hidden>
                        Select
                      </option>
                      {semesters.map((sem) => (
                        <option value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button className='add-subject-btn'>Add Subject</button>
                </form>
              </div>
            }

          </div>
      }
    </div>

  )
}

export default SubjectsList