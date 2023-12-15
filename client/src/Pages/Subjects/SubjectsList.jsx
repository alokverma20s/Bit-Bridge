import React, { useEffect, useState } from 'react'
import './Subject.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backend_URL } from '../../api/url';

const SubjectsList = () => {
  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSubject(quizId){
    setLoading(true)
    const a = await axios.get(`${backend_URL}/subject/getSubjects`);
    const b = a?.data?.data;
    b?.sort((a, b) => {
      const nameA = a.subjectName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.subjectName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setSubjects(b);
    setLoading(false);
  }
  useEffect(() => {
    fetchSubject();
  }, [])

  return (
    <div>
      {
        loading ? "Loading..." :
          <div className="main-bar">
            <div className="main-bar-header">
              <h1>Subjects</h1>
            </div>
            <div className="subjects-list-container">
              {loading && <p>Loading...</p>}
              {subjects && subjects.map((subject) => (
                <Link key={subject._id} to={`/Subjects/${subject._id}`} className='subject-link'>
                  <div className='subject'>
                    <h3>{subject.subjectName}</h3>
                    <p>{subject.subjectDescription}</p>
                  </div>
                </Link>
              ))}
              {!loading && !subjects && <p>No subjects found.</p>}
            </div>
          </div>
      }
    </div>

  )
}

export default SubjectsList