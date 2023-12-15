import {BrowserRouter as Router} from 'react-router-dom';
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import AllRoutes from './AllRoutes';
import {fetchAllUsers} from './actions/users.js'
import { fetchAllQuiz } from './actions/quiz.js';
import { fetchAllQuestions } from './actions/question';
import { fetchAllSubjects } from './actions/subject.js';

function App() {

  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(fetchAllQuiz())
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllSubjects())
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <AllRoutes></AllRoutes>
      </Router>
    </div>
  );
}

export default App;
