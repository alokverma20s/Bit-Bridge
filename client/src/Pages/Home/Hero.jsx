import React from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import logo from "../../assets/logo.png";
import ganeshji from "../../assets/ganeshji.png"
import { NavLink } from "react-router-dom";
import macbookImg from '../../assets/pngimg.com - macbook_PNG101760_out.png'
import quizImg from '../../assets/quiz-animation.gif'
import { IoMdMail } from "react-icons/io";

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
              <div className="container-one"><span className="gradient-text">BIT</span></div>
              <div className="container-two gradient-text"><span className="gradient-text2">BRIDGE</span></div>
            </div>
            <div className="auto-type-text">Your <span className="animated-text gradient-text3">{typeEffect}</span><span className="cursor"><Cursor/></span></div>
            <div className="hero-desc">
              <div className="hero-content-three">
                The Ultimate Hub for sharing ideas, asking questions
              </div>
              <div className="hero-content-four">
                and fostering meaningful conversations
              </div>
            </div>
            {/* <div className="hero-btns">
              <a className="hero-content-btn" href="#content-one" ><p>Why BitBridge?</p></a>
            </div> */}
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
      <div className="contentOne" id="content-one">
        <div className="contentOne-desc">
          <div className="contentOne-desc-first">Connect.Collaborate.Catalyze</div>
          <div className="contentOne-desc-second">Your Virtual Hub where campus academic discussions come to life! Ask your query <NavLink className="here" to='/AskQuestion'>here</NavLink> and someone will surely answer it.</div>
          <div className="contentOne-desc-three">Join BITBRIDGE today and express yourself in a dynamic digital space tailored just for you.</div>
        </div>
        <div className="contentOne-img">
          <img src={macbookImg} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
        <div className="learning-convenient">
          <p>Making learning easier <br />
          and more convenient for you</p>
        </div>
        
        <div className="contentTwo-cards">
          <div className="card card-one"><p className="doubts-heading">Doubts & Discussions</p><hr className="doubts-hr"/><p className="doubts-desc">Engaging in discussions and posting doubts enables users to engage in real-time conversations, fostering a sense of community and knowledge exchange.</p></div>
          <div className="card card-two"><p className="subjects-heading">Departmentwise Subjects</p><hr className="subjects-hr"/><p className="subjects-desc">Department-wise subject resources brings a host of benefits to students and faculty alike. This feature streamlines access to targeted educational materials.</p></div>
          <div className="card card-three"><p className="quiz-heading">Subjectwise Quiz</p><hr className="quiz-hr"/><p className="quiz-desc">Subject-wise quizzes set by instructors offers numerous advantages for both students and faculty members. This enhances the relevance and accuracy of evaluation.</p></div>
        </div>
        <br />
        <div className="contentTwo-cards">
          <div className="card card-four"><p className="tags-heading">Topicwise Tags</p><hr className="tags-hr"/><p className="tags-desc">Topic-wise tags for questions significantly enhances the user experience by facilitating efficient navigation and knowledge retrieval.</p></div>
          <div className="card card-five"><p className="resources-heading">Resources</p><hr className="resources-hr" /><p className="resources-desc">Coming Soon...</p></div>
          <div className="card card-six"><p className="code-editor-heading">Code Editor</p><hr className="code-editor-hr" /><p className="code-editor-desc">Coming Soon...</p></div>
        </div>
      </div>
      <div className="contentThree">
        <div className="contentThree-img">
          <img src={quizImg} alt="" />
        </div>
        <div className="contentThree-heading">
          <div>Your ultimate tool for mastering college subjects!</div>
          <div>Elevate your learning experience by diving into tailored quizzes for each subject, designed to reinforce your understanding and boost your confidence.</div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-left">
          <div className="footer-logo">
            <h1><span id="footer-logo-bit">BIT</span> <span id="footer-logo-bridge">BRIDGE</span></h1>
            <p>Join the Conversation, Shape the Future!</p>
          </div>
          <div className="footer-links">

            <h5 className="footer-heading">Quick Links</h5>
          
            <NavLink to='/Questions' className='footer-btn' activeClass='active'>
              <p>Questions</p>
            </NavLink>
            <NavLink to='/Tags' className='footer-btn' activeClass='active'>
              <p>Tags</p>
            </NavLink>
            <NavLink to='/Subjects' className='footer-btn' activeClass='active'>
              <p>Subjects</p>
            </NavLink>
            {/* <NavLink to='/Users' className='footer-btn' activeClass='active'>
              <p>Users</p>
            </NavLink> */}
            <NavLink to='/Quiz' className='footer-btn' activeClass='active'>
              <p>Quiz</p>
            </NavLink>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-developer">
          <h5 className="footer-heading">Developers</h5>
          <p className="footer-sub-heading">Alok Verma</p>
          <p className="footer-sub-heading">Abhay Khator</p>
          <p className="footer-sub-heading">Gaurav Ghidode</p>
          <p className="footer-sub-heading">Iris Sahu</p>
          </div>
          <div className="footer-touch">
            <h5 className="get-touch">GET IN TOUCH</h5>
            <a className="footer-mail" href="mailto:bitbridge4@gmail.com"><span className="mail-icon"><IoMdMail /></span> <p>bitbridge4@gmail.com</p></a>
          </div>
        </div>
        <p className="footer-copyright">Copyright © 2023 Bit Bridge.</p>
      </div>
    </>
  );
};

export default Hero;
