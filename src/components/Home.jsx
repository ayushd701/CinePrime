import React from 'react'
import {Sidenav} from './partials/partial'

const Home = () => {
    document.title = "HomePage"
  return (
    <>
      <Sidenav />
      <div className='w-[80%] h-full'></div>
    </>
  )
}

export default Home
