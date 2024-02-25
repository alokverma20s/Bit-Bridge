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
         
        </div>
        <div className="contentOne-img">
          <img src={ganeshji} className="ganeshji-img" alt="" />
        </div>
      </div>
      <div className="contentTwo">
      </div>
      <div className="contentThree"></div>
      <div className="footer"></div>
    </>
  );
};

export default Hero;
