import React from 'react'
import './LeftSidebar.css';
import {NavLink} from 'react-router-dom'
import Globe from '../../assets/globe-png-9.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdAdminPanelSettings } from "react-icons/md";

const LeftSidebar = () => {
    const User = useSelector((state) => state.currentUserReducer);
  return (
    <label className='toggle-container'>
                <input id='toggle-checkbox' type="checkbox" name="" />
                <div className='toggle'>
                    <span className='top-line common-line'></span>
                    <span className='middle-line common-line'></span>
                    <span className='bottom-line common-line'></span>
                </div>
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeClass='active'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <NavLink to='/Questions' className='side-nav-links' activeClass='active'>
                        <img src={Globe} class='web-icon'alt="G" />
                        <p style={{paddingLeft: "10px"}}>Questions</p>
                    </NavLink>
                    <NavLink to='/Tags' className='side-nav-links' activeClass='active' style={{paddingLeft: "40px"}}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to='/Subjects' className='side-nav-links' activeClass='active' style={{paddingLeft: "40px"}}>
                        <p>Subjects</p>
                    </NavLink>
                    <NavLink to='/Users' className='side-nav-links' activeClass='active' style={{paddingLeft: "40px"}}>
                        <p>Users</p>
                    </NavLink>
                    <NavLink to='/Quiz' className='side-nav-links' activeClass='active' style={{paddingLeft: "40px"}}>
                        <p>Quiz</p>
                    </NavLink>
                    {
                        User?.result.role==='admin' &&
                        <NavLink to='/AdminDashboard' className='side-nav-links' activeClass='active' style={{paddingLeft: "10px"}}>
                            <MdAdminPanelSettings style={{fontSize: "25px"}}/>
                            <p style={{paddingLeft: "6px"}}>Admin Dashboard</p>
                        </NavLink>
                    }
                    
                    
                    
                </div>
                <div className="left-links side-nav-div">
                    <Link to='/About' className='side-nav-links' style={{paddingLeft: "40px", paddingTop: "20px"}}>About</Link>
                    <Link to='/Contact' className='side-nav-links' style={{paddingLeft: "40px", paddingTop: "20px"}}>Contact</Link>
                    {/* <Link to='/' className='side-nav-links' style={{paddingLeft: "40px", paddingTop: "20px"}}>Feedback</Link> */}
                </div>
            </nav>
        </div>
    </label>
  )
}

export default LeftSidebar