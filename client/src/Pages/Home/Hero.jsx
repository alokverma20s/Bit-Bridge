import React from "react";
import {useTypewriter, Cursor} from 'react-simple-typewriter'
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import macbookImg from '../../assets/pngimg.com - macbook_PNG101760_out.png'
import quizImg from '../../assets/quiz-animation.gif'
import { IoMdMail } from "react-icons/io";
import './Hero.css'

const Hero = () => {
  const [typeEffect] = useTypewriter({
      words: ['Campus', 'Conversations'],
      Cursor,
      loop: {},
      typeSpeed: 100,
      deleteSpeed: 80
  })
  return (
    <div className="mt-16 w-screen bg-[rgb(247, 248,252)] flex flex-col justify-center items-center font-Inter">
      
      <div className="flex flex-col lg:flex-row w-10/12 lg:pt-20">
        {/* Brand symbol */}
        <div className="w-[90vw] lg:w-1/2 flex justify-center flex-col">
          <div className="flex flex-col text-[35px] lg:text-[52px] font-bold">
            <span className="gradient-text">BIT</span>
            <span className="gradient-text2">BRIDGE</span>
          </div>
          <div className="text-[35px] lg:text-[52px] font-bold text-[#343434]">
            Your <span className="text-[rgb(113,126,218)] gradient-text3 ">{typeEffect}</span><span className="cursor"><Cursor/></span>
          </div>
          <div className="text-xl font-bold ">
            <p className="text-[#343434]">The Ultimate Hub for sharing ideas, asking questions and fostering meaningful conversations</p>
          </div>
        </div>
        {/* Image Logo */}
        <div className="w-[80vw] lg:w-1/2 relative">
          <div className="w-full flex justify-center items-center relative">
            <img src={logo} alt="logo" className="w-[400px] animate-bounces " />
            <div className="absolute bottom-0 w-[80%] lg:w-[60%] h-3 rounded-[100%] bg-[rgb(100,100,100)] shadow"></div>
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="flex gap-3 flex-wrap justify-around w-[90vw] items-center mt-20">
          
          <NavLink to='/Questions' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Questions</p>
          </NavLink>
          <NavLink to='/Tags' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Tags</p>
          </NavLink>
          <NavLink to='/Subjects' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Subjects</p>
          </NavLink>
          <NavLink to='/Quiz' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Quiz</p>
          </NavLink>
          <NavLink to='/contest' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Contest</p>
          </NavLink>
          <NavLink to='/users' className='bg-primary-500 h-8 w-40 no-underline rounded-[1rem] flex justify-center items-center text-[1.25rem]' activeClass='active'>
            <p className="text-white text-[0.9rem] font-sans font-[700]">Users</p>
          </NavLink>
        </div>

      {/* connect */}
      <div className="w-screen mt-20 bg-primary-600 flex flex-col justify-center items-center py-20">
        <div className=" w-[90vw]  flex flex-col lg:flex-row justify-center items-center" id="content-one">
          <div className="flex flex-col gap-12 font-Rubik font-medium text-white py-12 w-full lg:w-1/2">
            <div className="w-full">
              <p className="text-2xl lg:text-[42px] font-semibold text-white leading-5">Connect.Collaborate.Catalyze</p>
            </div>
            <div className="text-xl lg:text-3xl">Your Virtual Hub where campus academic discussions come to life! Ask your query <NavLink className="text-black" to='/AskQuestion'>here</NavLink> and someone will surely answer it.</div>
            <div className="text-xl lg:text-3xl">Join BITBRIDGE today and express yourself in a dynamic digital space tailored just for you.</div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img src={macbookImg} className="w-[600px]" alt="" />
          </div>
        </div>
        
      </div>

      <div className="w-[90vw] flex flex-col justify-center items-center my-12">
          <div className="font-Inter text-[24px] lg:text-4xl font-semibold">
            <p>Making learning easier <br />
            and more convenient for you</p>
          </div>
          
          <div className="flex mt-5 justify-around flex-wrap gap-4">
            <div className="card w-[90vw] md:w-[400px] card-one"><p className="cards-heading">Doubts & Discussions</p><hr className="cards-hr"/><p className="cards-desc">Engaging in discussions and posting doubts enables users to engage in real-time conversations, fostering a sense of community and knowledge exchange.</p></div>
            <div className="card w-[90vw] md:w-[400px] card-two"><p className="cards-heading">Departmentwise Subjects</p><hr className="cards-hr"/><p className="cards-desc">Department-wise subject resources brings a host of benefits to students and faculty alike. This feature streamlines access to targeted educational materials.</p></div>
            <div className="card w-[90vw] md:w-[400px] card-three"><p className="cards-heading">Subjectwise Quiz</p><hr className="cards-hr"/><p className="cards-desc">Subject-wise quizzes set by instructors offers numerous advantages for both students and faculty members. This enhances the relevance and accuracy of evaluation.</p></div>
          
            <div className="card w-[90vw] md:w-[400px] card-four"><p className="cards-heading">Topicwise Tags</p><hr className="cards-hr"/><p className="cards-desc">Topic-wise tags for questions significantly enhances the user experience by facilitating efficient navigation and knowledge retrieval.</p></div>
            <div className="card w-[90vw] md:w-[400px] card-six"><p className="cards-heading">Contest</p><hr className="cards-hr" /><p className="cards-desc">The developer's contest platform is a flexible tool for arranging coding contests. It enables users to effortlessly create and oversee contests, giving participants the opportunity to demonstrate their coding abilities.</p></div>
            <div className="card w-[90vw] md:w-[400px] card-five"><p className="cards-heading">Resources</p><hr className="cards-hr" /><p className="cards-desc">Dive into subject-specific materials curated to enhance your learning experience. From textbooks to supplementary articles, find everything you need to excel in your studies</p></div>
          </div>
        </div>

      {/* Show Quiz section */}
      <div className="w-screen bg-primary-600 p-20">
        <div className="contentThree flex flex-col lg:flex-row justify-center items-center text-white">
          <div className="w-[90vw] lg:w-1/2 flex justify-center items-center">
            <img src={quizImg} alt=""  className="w-[70%]" />
          </div>
          <div className="contentThree-heading w-[90vw] lg:w-[45%] font-Rubik flex justify-center items-center flex-col gap-10">
            <div className="w-full text-4xl font-bold ">Your ultimate tool for mastering college subjects!</div>
            <div className="w-full text-2xl font-semibold text-justify">Elevate your learning experience by diving into tailored quizzes for each subject, designed to reinforce your understanding and boost your confidence.</div>
          </div>
        </div>
      </div>



      {/* Footer */}
      <div className="bg-[rgb(32,35,40)] w-screen  py-12 flex justify-center items-center">
        <div className="flex w-[90vw] justify-center items-center flex-col md:flex-row gap-4">
        <div className="w-[90vw] lg:w-1/2 flex justify-around ">
          <div className="flex flex-col w-1/2 justify-start items-start">
            <h1 className="font-semibold"><span className="text-primary-500 text-[1.6rem]">BIT</span> <span className="text-white text-[1.6rem]">BRIDGE</span></h1>
            <p className="text-white text-lg font-semibold">Join the Conversation, Shape the Future!</p>
          </div>
          <div className="flex flex-col w-1/2 ">

            <h5 className="text-white text-2xl mt-2 mb-4">Quick Links</h5>
          
            <NavLink to='/Questions' className='no-underline' activeClass='active'>
              <p className="text-sm text-[rgb(133,131,131)] mt-2 mb-[8px]">Questions</p>
            </NavLink>
            <NavLink to='/Tags' className='no-underline' activeClass='active'>
              <p className="text-sm text-[rgb(133,131,131)] mt-2 mb-[8px]">Tags</p>
            </NavLink>
            <NavLink to='/Subjects' className='no-underline' activeClass='active'>
              <p className="text-sm text-[rgb(133,131,131)] mt-2 mb-[8px]">Subjects</p>
            </NavLink>
            <NavLink to='/Quiz' className='no-underline' activeClass='active'>
              <p className="text-sm text-[rgb(133,131,131)] mt-2 mb-[8px]">Quiz</p>
            </NavLink>
          </div>
        </div>
        <div className=" w-[90vw] md:w-1/2 flex justify-start md:justify-center flex-col md:flex-row gap-5">
          <div className="w-1/2">
          <h5 className="text-white text-2xl mt-2 mb-4">Developers</h5>
          <a href="https://www.linkedin.com/in/alok-verma-20s/" target="_blank" className="  text-[16px] text-[rgb(133,131,131)] mt-4 mb-[10px] block">Alok Verma</a>
          <a href="https://www.linkedin.com/in/abhay-khator-a98724232/" target="_blank" className=" text-[16px] text-[rgb(133,131,131)] mt-4 mb-[10px] block">Abhay Khator</a>
          <a href="https://www.linkedin.com/in/gaurav-ghidode-2b1900221/" target="_blank" className=" text-[16px] text-[rgb(133,131,131)] mt-4 mb-[10px] block">Gaurav Ghidode</a>
          <a href="https://www.linkedin.com/in/iris-sahu-6a7144226/" target="_blank" className=" text-[16px] text-[rgb(133,131,131)] mt-4 mb-[10px] block">Iris Sahu</a>
          </div>
          <div className="">
            <h5 className="get-touch text-white text-2xl mt-[5px] mb-3">GET IN TOUCH</h5>
            <a className="no-underline text-sm flex gap-2" href="mailto:bitbridge4@gmail.com"><span className="text-[rgb(133,131,131)] text-2xl mt-2 "><IoMdMail className="relative -top-1" /></span> <p className="text-[rgb(133,131,131)] text-xl">bitbridge4@gmail.com</p></a>
          </div>
        </div>
      </div>
    </div>
        <p className="font-Inter w-screen text-center text-white text-lg bg-[rgb(32,35,40)] pb-5">Copyright © 2023 Bit Bridge.</p>
    </div>
  );
};

export default Hero;
// bg-[#717EDA] w-40 no-underline rounded-xl flex justify-center items-center text-lg text-white