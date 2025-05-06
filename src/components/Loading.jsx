import React from 'react';

const Loading = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-[#1F1E24]'>
      <div className="relative">
        <div className="flex space-x-2">
          <div className="w-3 h-6 bg-[#6556CD] rounded-full animate-wave"></div>
          <div className="w-3 h-6 bg-[#6556CD] rounded-full animate-wave animation-delay-100"></div>
          <div className="w-3 h-6 bg-[#6556CD] rounded-full animate-wave animation-delay-200"></div>
          <div className="w-3 h-6 bg-[#6556CD] rounded-full animate-wave animation-delay-300"></div>
          <div className="w-3 h-6 bg-[#6556CD] rounded-full animate-wave animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;