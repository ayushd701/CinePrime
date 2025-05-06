import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-[#1F1E24] p-4'>

      <div className="relative mb-8">
        <div className="text-[#6556CD] text-9xl font-bold tracking-tighter opacity-90">404</div>
        <div className="absolute inset-0 bg-[#6556CD] mix-blend-screen opacity-20 rounded-full blur-xl"></div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-zinc-200 mb-4 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-zinc-400 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-gradient-to-r from-[#6556CD] to-[#8B7AE4] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl hover:shadow-[#6556CD]/30 animate-pulse"
      >
        Return Home
      </button>

      <div className="mt-12 flex space-x-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-[#6556CD] rounded-full opacity-70"
            style={{
              animation: `bounce 1.5s infinite ${i * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Notfound;
