import React from 'react'
import loader from "/loading.gif"

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black ' >
      <img className='h-[63%] w-[63%] object-cover' src={loader} alt="" />
    </div>
  )
}

export default Loading
