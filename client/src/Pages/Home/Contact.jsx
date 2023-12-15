import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Home.css'

const Contact = () => {
    return (
        <div className='home-container-1'>
          <LeftSidebar/>
          
          <div className='home-container-2'>
                <div className="main-bar">
                    <div className="main-bar-header">
                        <h1>Contact</h1>
                    </div>
                    <div>
                        <p>For any queries or suggestions, you can contact us at:</p>
                        <ul>
                            <li><a className='contact-links' href="mailto:gauravg.it.21@nitj.ac.in">gauravg.it.21@nitj.ac.in</a></li>
                            <li><a className='contact-links' href="mailto:alokv.it.21@nitj.ac.in">alokv.it.21@nitj.ac.in</a></li>
                        </ul>
                    </div>
                </div>
          </div>
        </div>
      )
}

export default Contact