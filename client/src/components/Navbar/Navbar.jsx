import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import Searchbar from './Searchbar';

import logo from '../../assets/logo.png';
import Avatar from '../Avatar/Avatar';
import './Navbar.css'
import { useEffect } from 'react';
import { setCurrentUser } from '../../actions/currentUser';

function Navbar(){
    var User = useSelector((state) => (state.currentUserReducer))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location= useLocation();


    const handleLogOut = ()=>{
        dispatch({type: 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }
    useEffect(()  =>{
        const token = User?.token
        if(token){
            const decodeToken = decode(token);
            if(decodeToken.exp * 1000 < new Date().getTime()){
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    },[])
    return(
        <nav className='main-nav'>
            
            <div className="navbar">
                <div>
                    <span className='nav-logo'>
                        <Link to='/' >
                                <img src={logo} alt="logo" id='bit-bridge-logo'></img>
                        </Link>
                    </span>
                    <Link to='/About' className='nav-item nav-btn'>About</Link>
                    <Link to='/Contact' className='nav-item nav-btn'>Contact</Link>
                    {/* <Link to='/' className='nav-item nav-btn'>Feedback</Link> */}
                    <Searchbar></Searchbar>
                </div>
                
                {
                    User===null?
                    <Link to='/Auth' className='nav-item nav-links'>Login</Link>:
                    <>
                        <Link to={`/Users/${User.result?._id}`} style={{color:"black", textDecoration:"none", borderRadius:"100%"}}><Avatar role={User?.result?.role} backgroundColor="white" px="2px" py="2px">{User?.result?.name.charAt(0).toUpperCase()}</Avatar></Link>

                        <button className="nav-item nav-links" onClick={handleLogOut}>Logout</button>
                    </>
                }
                
            </div>
        </nav>
    )
}

export default Navbar;