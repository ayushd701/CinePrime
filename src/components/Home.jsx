import React from 'react'
import {Sidenav , Topnav} from './partials/partial'

const Home = () => {
    document.title = "HomePage"
  return (
    <>
      <Sidenav />
      <div className='w-[80%] h-full'>
        <Topnav />
      </div>
    </>
  )
}

export default Home
