import React from 'react';
import Nav from '../components/nav/Nav';
import SideBar from '../components/nav/SideBar'

const Home = () => {

  return (
    <div className='w-full h-screen relative bg-slate-100'>
      <Nav />
      <SideBar />
    </div>
  )
}

export default Home