import React from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import logo from "../../assets/logo.png";
import ganeshji from "../../assets/ganeshji.png"
import { NavLink } from "react-router-dom";

const Hero = () => {
  const [typeEffect] = useTypewriter({
      words: ['Campus', 'Conversations'],
      Cursor,
      loop: {},
      typeSpeed: 100,
      deleteSpeed: 80
  })
  return (
    <>
      <div className="hero">
        <div className="hero-one">
          <div className="hero-content">
            <div className="hero-heading">
              <div className="container-one">BIT</div>
              <div className="container-two">BRIDGE</div>
            </div>
            <div className="auto-type-text">Your <span className="animated-text">{typeEffect}</span><span className="cursor"><Cursor/></span></div>
            <div className="hero-desc">
              <div className="hero-content-three">
                The Ultimate Hub for sharing ideas, asking questions
              </div>
              <div className="hero-content-four">
                and fostering meaningful conversations
              </div>
            </div>
            <div className="hero-btns">
              <button className="hero-content-btn">Get Started</button>
              <button className="hero-content-btn">Why BitBridge?</button>
              <button className="hero-content-btn">View on Github</button>
            </div>
            <div className="hero-bottom"></div>
          </div>
          <div className="hero-logo">
            <img src={logo} alt="logo" />
            <div className="shadow"></div>
          </div>
        </div>
        <div className="hero-two">
          
          <NavLink to='/Questions' className='hero-two-btn' activeClass='active'>
            <p>Questions</p>
          </NavLink>
          <NavLink to='/Tags' className='hero-two-btn' activeClass='active'>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/Subjects' className='hero-two-btn' activeClass='active'>
            <p>Subjects</p>
          </NavLink>
          <NavLink to='/Users' className='hero-two-btn' activeClass='active'>
            <p>Users</p>
          </NavLink>
          <NavLink to='/Quiz' className='hero-two-btn' activeClass='active'>
            <p>Quiz</p>
          </NavLink>
        </div>
      </div>
      <div className="contentOne">
        <div className="contentOne-desc">
          <p>Have your doubts and queries regarding academics, career or college?</p>
          <p>Don't worry, we have your back. Ask your query <NavLink className="here" to='/AskQuestion'>here</NavLink> and someone will surely answer it.</p>
          <p>Get verified answers by our instructors and get your doubts resolved.</p>
        </div>
        <div className="contentOne-img">
          <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
        <div className="learning">Making learning easier</div>
        <div className="convenient">and more convenient for you</div>
        <div className="contentTwo-cards">
          <div className="card card-one"><p className="doubts-heading">Doubts & Discussions</p><hr className="doubts-hr"/><p className="doubts-desc">Engaging in discussions and posting doubts enables users to engage in real-time conversations, fostering a sense of community and knowledge exchange.</p></div>
          <div className="card card-two"><p className="subjects-heading">Departmentwise Subjects</p><hr className="subjects-hr"/><p className="subjects-desc">Department-wise subject resources brings a host of benefits to students and faculty alike. This feature streamlines access to targeted educational materials.</p></div>
          <div className="card card-three"><p>Subjectwise Quiz</p><hr className="quiz-hr"/></div>
        </div>
        <br />
        <div className="contentTwo-cards">
          <div className="card card-four"><p>Topicwise Tags</p><hr className="tags-hr"/></div>
          <div className="card card-five"></div>
          <div className="card card-six"></div>
        </div>
      </div>
      <div className="contentOne">
        <div className="contentOne-desc">
           <p>Find your subjects according to your field of study or disciple.</p>
           <p>Filter questions and quizzes as per your disciple/department</p>
        </div>
        <div className="contentOne-img">
          <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
        <div className="contentTwo-img">
              <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
        <div className="contentTwo-desc">
          <p>Take various assessment and practice quizzes.</p>
          <p>Check your results, increase knowledge and improve your performance.</p>
        </div>
      </div>
      <div className="footer">

      </div>
    </>
  );
};

export default Hero;
