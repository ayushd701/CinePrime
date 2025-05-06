import React, { useState, useEffect } from "react";
import { Header, Sidenav, Topnav, HorCards } from "./partials/partial";
import { FiMenu } from "react-icons/fi";

const Home = () => {
  document.title = "HomePage";
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-900 overflow-x-hidden">
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-sm">
        <div className="flex items-center justify-between p-2 border-b border-zinc-700">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-indigo-600 text-white"
          >
            <FiMenu size={20} />
          </button>
          <div className="flex-1 ml-2">
            <Topnav mobileVersion={true} />
          </div>
        </div>
      </div>

      <Sidenav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`pt-12 md:pt-0 transition-all duration-300 md:ml-[20%] ${sidebarOpen ? 'translate-x-[70%]' : 'translate-x-0'}`}>
        {!loading && <div className="hidden md:block"><Topnav /></div>}
        <Header setLoading={setLoading} loading={loading} />
        <HorCards setLoading={setLoading} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
