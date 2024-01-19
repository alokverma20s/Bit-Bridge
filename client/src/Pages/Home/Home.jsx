import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import HomeContent from './HomeContent';

import HomeMainbar from '../../components/HomeMainbar/HomeMainbar';
import '../../App.css';

const Home = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      
      <div className='home-container-2'>
        {/* <HomeContent></HomeContent> */}
        <HomeMainbar/>
      </div>
    </div>
    // <div>
    //   <HomeContent/>
    // </div>
  )
}

export default Home;
