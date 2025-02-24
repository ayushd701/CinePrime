import React from 'react'
import {  useNavigate } from 'react-router-dom'

const About = () => {
  document.title= "About"
    const navigate = useNavigate()
  return (
    <div className='bg-[#1F1E24] w-full h-screen flex justify-center items-center'>
      <div className='w-[50%] h-auto rounded-lg p-[2%] hover:scale-105 duration-500 bg-gray-600 overflow-hidden'>
        <h1 className=' text-3xl font-extrabold text-blue-200'>About Me</h1>
        <p className='mt-[3%] text-lg text-white'>I’m a student at IIIT Ranchi with a passion for coding, web development, and DSA. I enjoy combining tech and creativity to build useful projects.</p>
        <p className='mt-[2%] text-lg text-white'>I’m always eager to learn new technologies and build innovative projects.</p>
        <button onClick={() => navigate("/contact")} className='mt-[3%] font-semibold text-white border border-none bg-blue-400 hover:bg-blue-600 p-2 rounded-xl'>Contact Me</button>
      </div>
    </div>
  )
}

export default About
