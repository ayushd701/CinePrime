import React from 'react'
import notfound from "/notfound.gif"

const Notfound = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-black ' >
      <img className='h-[63%] w-[63%] object-cover' src={notfound} alt="" />
    </div>
  )
}

export default Notfound
