import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Home.css'

const About = () => {
    return (
        <div className='home-container-1'>
          <LeftSidebar/>
          
          <div className='home-container-2'>
                <div className="main-bar">
                    <div className="main-bar-header">
                        <h1>About</h1>
                    </div>
                    <div>
                        <p>Bit-Bridge is a discussion website developed by students of NITJ</p>
                        <p>The main purpose of developing this website is to provide a platform to students of NITJ to interact and discuss their ideas and doubts regarding academics and projects. Bit-Bridge aims at bridging the gap between students by forming a community and allowing it's users to share their thoughts and ideas to boost innovaion.</p>
                        
                        <h3>Authors</h3>
                        <ul>
                            <li>Gaurav Ghidode</li>
                            <li>Alok Verma</li>
                            <li>Iris Sahu</li>
                            <li>Abhay Khator</li>
                        </ul>
                    </div>
                </div>
          </div>
        </div>
      )
}

export default About