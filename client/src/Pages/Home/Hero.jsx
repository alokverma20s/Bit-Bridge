import React from "react";
// import {useTypewriter, Cursor} from 'react-simple-typewriter'
// import { TypeAnimation } from "react-type-animation";
import logo from "../../assets/logo.png";
import ganeshji from "../../assets/ganeshji.png"
import { NavLink } from "react-router-dom";

const Hero = () => {
  // const [typeEffect] = useTypewriter({
  //     words: ['Campus', 'Conversations'],
  //     loop: {},
  //     typeSpeed: 100,
  //     deleteSpeed: 40
  // })
  return (
    <>
      <div className="hero">
        <div className="hero-one">
          <div className="hero-content">
            <div className="hero-heading">
              <div className="container-one">BIT</div>
              <div className="container-two">BRIDGE</div>
            </div>

            <div className="auto-type-text">Your Campus</div>

            {<div className="auto-type-text">
            </div>}
                {/* { <TypeAnimation
              sequence={["Your Campus", 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{ whiteSpace: "pre-line", display: "block" }}
              omitDeletionAnimation={true}
              /> } */}

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
          <p>Don't worry, we have your back. Ask your query <NavLink to='/AskQuestion'>here</NavLink> and someone will surely answer it.</p>
          <p>Get verified answers by our instructors and get your doubts resolved.</p>
        </div>
        <div className="contentOne-img">
          <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
        <div className="contentTwo-img">
            <img src={ganeshji} alt="" className="ganeshji-img" />
        </div>
        <div className="contentTwo-desc">
              <p>Facing difficulty to search relevant questions?</p>
              <p>Just use tags as keywords to search relevant questions.</p>
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
